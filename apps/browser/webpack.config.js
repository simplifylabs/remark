const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = function (_, env) {
  return {
    mode: env.mode == "production" ? "production" : "development",
    devtool: env.mode == "production" ? "source-map" : "inline-source-map",
    entry: {
      "entry/injected": "apps/browser/src/entry/injected.tsx",
      "entry/background": "apps/browser/src/entry/background.ts",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [
        new TsconfigPathsPlugin({ configFile: "apps/browser/tsconfig.json" }),
      ],
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: ["ts-loader"],
          include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "..", "..", "libs", "db", "src"),
            path.resolve(__dirname, "..", "..", "libs", "util", "src"),
          ],
          exclude: /node_modules/,
        },
        {
          test: /app.css$/i,
          include: path.resolve(__dirname, "src", "styles"),
          sideEffects: true,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  // sourceMap: false,
                  plugins: [
                    require("postcss-import"),
                    require("tailwindcss")("apps/browser/tailwind.config.js"),
                    require("autoprefixer"),
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "build"),
    },
    plugins: [
      new CleanWebpackPlugin({}),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      new MiniCssExtractPlugin({
        filename: "css/app.css",
        insert: () => null,
        runtime: true,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, "/src/manifest.json"),
            to: "manifest.json",
          },
          { from: path.join(__dirname, "assets"), to: "assets" },
        ],
      }),
      // env.mode == "production" && new BundleAnalyzerPlugin(),
    ].filter((p) => p !== false),
  };
};
