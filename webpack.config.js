const Path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: "/Frontend/Main.js",
    output: {
        path: Path.resolve(__dirname, "Public"), filename: "bundle.js"
    },

    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,

            use: {
                loader: ["babel-loader"],
                options: {
                    presets: ["@babel/env"]
                }
            }
        }]
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        }]
    },

    plugins: [new MiniCssExtractPlugin({
        filename: "bundle.css"
    })],

    devtool: "source-map"
}