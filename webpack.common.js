const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob");

const entries = ["top"];

module.exports = {
  mode: "production",
  entry: {
    ...entries.reduce((acc, entry) => {
      acc[entry] = `./src/assets/js/${entry}.js`;
      return acc;
    }, {}),
  },
  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            compact: false,
          },
        },
      },
    ],
  },
  plugins: [
    // ファイルを分割しない
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  optimization: {
    minimize: true, // ファイル圧縮機能を有効にする
    minimizer: [
      new TerserPlugin({
        extractComments: false, // コメントを外部ファイルにしない
        terserOptions: {
          compress: {
            drop_console: false, // console.logを残す
          },
        },
      }),
    ],
  },
  performance: {
    // hints: false, // パフォーマンス警告を表示しない
  },
  externals: {
    // jquery: 'jQuery',
  },
  resolve: {
    extensions: [".js"],
  },
};
