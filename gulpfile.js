var gulp		= require("gulp");
var concat		= require("gulp-concat");
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
		.pipe(concat("ps-ui.js"))
		.pipe(gulp.dest("."))
		.pipe(livereload(lrServer));
});

gulp.task("default", function () {
	dvServer.listen(8080);
	lrServer.listen(35729);
	gulp.watch("src/**/*.js", ["scripts"]);
});
