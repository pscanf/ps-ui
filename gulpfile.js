var gulp		= require("gulp");
var concat		= require("gulp-concat");
var ngHtml2Js	= require("gulp-ng-html2js");
var uglify		= require("gulp-uglify");
var livereload	= require("gulp-livereload");
var tinyLr		= require("tiny-lr");
var static		= require("node-static");
var http		= require("http");

var lrServer = tinyLr();
var dvServer = http.createServer(function (req, res) {
	var stServer = new static.Server(".", {cache: false});
	req.on("end", function () {
		stServer.serve(req, res);
	});
	req.resume();
});

gulp.task("scripts", function () {
	gulp.src("src/**/*.js")
		.pipe(concat("ps-ui.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/"));
});

gulp.task("templates", function () {
	gulp.src("template/**/*.html")
		.pipe(ngHtml2Js({
			moduleName: "ps-ui.ps-template",
			prefix: "template/"
		}))
		.pipe(concat("ps-template.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/"));
});

gulp.task("final", function () {
	gulp.src(["dist/ps-ui.min.js", "dist/ps-template.js"])
		.pipe(concat("ps-ui-tpls.min.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(livereload(lrServer));
});

gulp.task("default", function () {
	dvServer.listen(8080);
	lrServer.listen(35729);
	gulp.watch("src/**/*.js", ["scripts"]);
	gulp.watch("template/**/*.html", ["templates"]);
	gulp.watch("dist/ps-ui.min.js", ["final"]);
	gulp.watch("dist/ps-template.min.js", ["final"]);
});
