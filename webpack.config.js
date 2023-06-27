const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env, argv) {
	console.log(env);

	const isEnvDevelopment = env?.NODE_ENV === "development";
	const isEnvProduction = env?.NODE_ENV === "production";

	const babelLoaderRegExp = /\.(js|jsx)$/;
	const cssRegExp = /\.(css|scss)$/i;
	const cssModuleRegExp = /\.module\.(css|scss)$/;

	const cssLoaderOptions = {
		importLoaders: 1,
		sourceMap: isEnvDevelopment,
	};
	const cssLoaderOptionsForModule = {
		importLoaders: 1,
		sourceMap: isEnvDevelopment,
		modules: true,
	};
	const sassLoaderOptions = {
		sassOptions: {
			indentWidth: 4,
			sourceMap: isEnvDevelopment,
			outputStyle: "compressed",
		},
	};

	return {
		mode: isEnvProduction ? "production" : "development",
		entry: path.resolve(__dirname, "src/index.js"),
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "bundle.js",
			publicPath: "/",
		},
		module: {
			rules: [
				{
					test: babelLoaderRegExp,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					},
				},
				{
					test: cssRegExp,
					exclude: cssModuleRegExp,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: cssLoaderOptions,
						},
						{
							loader: "sass-loader",
							options: sassLoaderOptions,
						},
					],
				},
				{
					test: cssRegExp,
					include: cssModuleRegExp,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: cssLoaderOptionsForModule,
						},
						{
							loader: "sass-loader",
							options: sassLoaderOptions,
						},
					],
				},
			],
		},
		devServer: {
			port: 3000,
			liveReload: true,
		},
		devtool: isEnvProduction ? "source-map" : "eval",
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				filename: "index.html",
				template: "./public/index.html",
			}),
			new MiniCssExtractPlugin({
				filename: "static/css/[name].[contenthash:8].css",
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, "public/static"),
						to: path.resolve(__dirname, "dist/static"),
						noErrorOnMissing: true,
					},
				],
			}),
		],
	};
};
