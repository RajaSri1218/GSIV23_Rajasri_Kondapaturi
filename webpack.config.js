const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const deps = require("./package.json").dependencies;
const webpack  = require("webpack");

const paths = {
  "uiPaths":{
    "dev": "http://localhost:3000/",
    "qa": "http://localhost:3000/",
    "local": "http://localhost:3000/" 
  },
  "apiPaths":{
    "dev": "https://api.themoviedb.org/3",
   
  }
};

const environment=process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
const publicPath = paths["uiPaths"][environment];
const apiPath=paths["apiPaths"][environment];

console.log(publicPath,apiPath,environment,"PATHS")

module.exports = (env) => {
  let mode='production';
  let devtool=false;
  if(process.env.NODE_ENV=='development' || process.env.NODE_ENV =='local') {
    devtool= 'source-map';
    mode='development'
  }
  console.log('env', env, mode,devtool,publicPath,apiPath)
  return {
    mode: mode,
    devServer: {
      port: 3000,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.inline.svg$/,
          use: "svgr/webpack",
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(woff|woff2|ttf|eot|png|jpg|svg|gif|pdf)$/i,
          use: ["file-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        }
      ],

    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        src: path.resolve(__dirname, 'src/')
      }
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      clean:true,
      publicPath
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV' : JSON.stringify(mode),
        'process.env.REACT_APP_API_END_POINT':JSON.stringify(apiPath)
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new ModuleFederationPlugin({
        // For remotes (please adjust)
        name: "assignment",
        filename: "remoteEntry.js",
        exposes: {
          "./Assignment": "./src/bootstrap",
        },
        shared: {
          ...deps,
          "react-dom": {
            singleton: true,
            //   eager: true,
            requiredVersion: "18.2.0",
            strictVersion: false,
          },
          "react-router-dom": {
            singleton: true,
            //   eager: true,
            requiredVersion: "6.4.2",
            strictVersion: false,
          },
          react: {
            singleton: true,
            //   eager: true,
            requiredVersion: "18.2.0",
            strictVersion: false,
          },
        },
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),

    ],
    devtool
  };
};
