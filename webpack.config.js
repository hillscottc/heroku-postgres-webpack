module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "bundle.js",
  },

  devServer: {
    // Set proxy to backend so /api/movies goes to https:[backend-url]/movies
    proxy: {
      "/api": {
        target: "https://calm-waters-80883.herokuapp.com",
        pathRewrite: { "^/api": "" },
        secure: false,
        changeOrigin: true,
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
    ],
  },
};
