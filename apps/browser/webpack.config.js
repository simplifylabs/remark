const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = function (_, env) {
  return {
    mode: env.mode == "production" ? "production" : "development",
    devtool: env.mode == "production" ? "source-map" : "inline-source-map",
    entry: {
      "render/popup": "apps/browser/src/render/popup.tsx",
      "render/injected": "apps/browser/src/render/injected.tsx",
      "scripts/background": "apps/browser/src/scripts/background.ts",
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
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
        },
        {
          test: /injected.css$/i,
          include: path.resolve(__dirname, "src", "styles"),
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  // sourceMap: false,
                  plugins: [
                    require("postcss-import"),
                    require("postcss-nesting"),
                    require("tailwindcss")(
                      `${__dirname}/src/tailwind/injected.config.js`
                    ),
                    // require("postcss-replace")({
                    //   pattern: ".dark ",
                    //   data: { replaceAll: "#remark-launcher.dark " },
                    // }),
                    // require("postcss-rem-to-pixel")({
                    //   propList: ["*"],
                    // }),
                    require("autoprefixer"),
                  ],
                },
              },
            },
          ],
        },
        {
          test: /popup.css/i,
          include: path.resolve(__dirname, "src", "styles"),
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    require("tailwindcss")(
                      `${__dirname}/src/tailwind/popup.config.js`
                    ),
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
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin({}),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      new HtmlWebpackPlugin({
        template: "apps/browser/src/html/popup.html",
        filename: "html/popup.html",
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
