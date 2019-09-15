"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlo = require("gulp-html-minifier2");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var uglify = require("gulp-uglify");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/*.ttf",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build/"));
});

gulp.task("img", function () {
  return gulp.src([
      "source/img/*.png",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build/"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style-min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("js", function () {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(htmlo({collapseWhitespace: true}))
    .pipe(gulp.dest("build/"))
    .pipe(server.stream());
});

gulp.task("build", gulp.series("clean", "copy", "img", "css", "js", "html"));

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/*.html").on("change", gulp.series("html"), server.reload);
  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/js/*.js").on("change", gulp.series("js"));
});

gulp.task("start", gulp.series("build", "server"));
