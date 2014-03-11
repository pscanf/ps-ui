var gulp	= require("gulp");
var tinyLr	= require("tiny-lr");
var static	= require("node-static");
var http	= require("http");
var plugins	= require("gulp-load-plugins")();

var lrServer = tinyLr();
var dvServer = http.createServer(function (req, res) {
	var stServer = new static.Server(".", {cache: false});
	req.on("end", function () {
		stServer.serve(req, res);
	});
	req.resume();
});

gulp.task("styles", function () {
	gulp.src("styles/ps-ui.scss")
		.pipe(plugins.sass())
		.pipe(plugins.autoprefixer("last 2 version"))
		.pipe(plugins.rename("ps-ui.css"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("ps-ui.min.css"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
	gulp.src("src/**/*.js")
		.pipe(plugins.ngmin())
		.pipe(plugins.concat("ps-ui.js"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("templates", function () {
	gulp.src("template/**/*.html")
		.pipe(plugins.ngHtml2js({
			moduleName: "ps-ui.ps-template-cache",
			prefix: "template/"
		}))
		.pipe(plugins.concat("ps-template-cache.js"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("final", function () {
	gulp.src(["dist/ps-template-cache.js", "dist/ps-ui.js"])
		.pipe(plugins.concat("ps-ui-tpls.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("ps-ui-tpls.min.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.livereload(lrServer));
});

gulp.task("default", function () {
	dvServer.listen(8080);
	lrServer.listen(35729);
	gulp.watch("styles/ps-ui.scss", ["styles"]);
	gulp.watch("src/**/*.js", ["scripts"]);
	gulp.watch("template/**/*.html", ["templates"]);
	gulp.watch(["dist/ps-template-cache.js", "dist/ps-ui.js"], ["final"]);
});
