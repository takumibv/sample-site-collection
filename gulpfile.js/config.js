const urlPrefix = process.env.URL_PREFIX ? "/" + process.env.URL_PREFIX : "";

const config = {
  path: {
    root: {
      src: "./src/",
      dest: "./public/",
    },
    copy: {
      src: "./src/**/*.+(html|pdf|ico)",
    },
    scss: {
      src: "./src/assets/scss/**/*.scss",
      dest: "./public/assets/css/",
      base: "./src/assets/scss/",
    },
    ejs: {
      src: ["./src/ejs/**/*.ejs", "!./src/ejs/**/_*.ejs"],
      output: "./public/",
      base: "./src/ejs/",
      root: urlPrefix,
    },
    script: {
      src: "./src/assets/js/**/*.js",
      dest: "./public/assets/js/",
    },
    imagemin: {
      src: "./src/**/*.+(jpg|jpeg|png|gif|svg)",
    },
  },
  scss: {
    options: {
      outputStyle: "expanded",
    },
  },
  browserSync: {
    server: {
      baseDir: "./public",
    },
    startPath: "/",
  },
  pngquant: { speed: 1 },
  mozjpeg: { quality: 65 },
  webpack: {
    prod: "../webpack.prod.js",
    common: "../webpack.common.js",
  },
};

module.exports = config;
