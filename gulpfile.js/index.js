const gulp = require("gulp");
const cache = require("gulp-cached");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const rimraf = require("rimraf");
const browserSync = require("browser-sync");
const plumber = require("gulp-plumber");
const debug = require("gulp-debug"); // ログ表示
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");

const config = require("./config");

const isProduction = process.env.NODE_ENV === "production";

// ローカルサーバー
const server = () => browserSync.init(config.browserSync);

// 掃除
const clarn = (cb) => rimraf(config.path.root.dest, cb);

// コピー
const copy = async () =>
  await gulp
    .src(config.path.copy.src, { base: config.path.root.src })
    .pipe(cache("copy"))
    .pipe(plumber())
    .pipe(gulp.dest(config.path.root.dest))
    .pipe(browserSync.stream());

const ejsCompile = async () =>
  await gulp
    .src(config.path.ejs.src, {
      base: config.path.ejs.base,
    })
    .pipe(ejs({}, {}, { ext: ".html" }))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest(config.path.ejs.output))
    .pipe(browserSync.stream());

const sassCompile = async () =>
  await gulp
    .src(config.path.scss.src, { base: config.path.scss.base })
    .pipe(plumber())
    .pipe(sass(config.scss.options))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.path.scss.dest))
    .pipe(browserSync.stream());

const jsCompile = async () => {
  const name = isProduction ? "prod" : "common";

  return await gulp
    .src(config.path.script.src)
    .pipe(cache("webpack"))
    .pipe(plumber())
    .pipe(gulpWebpack(require(config.webpack[name]), webpack))
    .pipe(gulp.dest(config.path.script.dest))
    .pipe(debug({ title: "js dest:" }))
    .pipe(browserSync.stream());
};

const watch = () => {
  gulp.watch(config.path.root.src, gulp.series(copy, ejsCompile, sassCompile, jsCompile));
};

const build = gulp.series(clarn, copy, ejsCompile, sassCompile, jsCompile);

exports.build = build;
exports.default = gulp.series(
  clarn,
  copy,
  ejsCompile,
  sassCompile,
  jsCompile,
  gulp.parallel(server, watch)
);
