const config = {
  path: {
    root: {
      src: "./src/",
      dest: "./public/",
    },
    copy: {
      src: "./src/**/*.+(html|pdf|jpg|png|gif|svg|ico)",
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
    },
    script: {
      src: "./src/assets/js/**/*.js",
      dest: "./public/assets/js/",
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
  webpack: {
    prod: "../webpack.prod.js",
    common: "../webpack.common.js",
  },
};

module.exports = config;
