const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // or production
  entry: {
    main: path.resolve(__dirname, "src/client/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
    publicPath: "/dist",
    clean: true,
  },

  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 4000, // default is 8080
    hot: true,
    compress: true,
  },

  //loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/,
        type: "asset/resource",
      },
    ],
  },

  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Friends_Fav",
      filename: "index.html",
      template: path.resolve(__dirname, "/src/template.html"),
    }),
  ],
};
