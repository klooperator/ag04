const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const inProject = path.resolve.bind(path, __dirname);
const inProjectSrc = file => inProject('src', file);

const config = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'index.js'),
  ] /* {    main: ["react-hot-loader/patch", path.resolve(__dirname, "index.js")]  } */,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  devtool: 'source-map',
  /* devServer: { contentBase: './dist', open: false, port: 3456 }, */
  resolve: {
    symlinks: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ag04-react',
      template: 'index.html',
    }),
    new ExtractTextPlugin({
      // define where to save the file
      filename: 'ag04.bundle.css',
      allChunks: true,
    }),
  ],
  module: {
    rules: [],
  },
};

config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['babel-preset-env', 'babel-preset-react'],
      plugins: [
        'react-hot-loader/babel',
        'babel-plugin-syntax-dynamic-import',
        'babel-plugin-transform-class-properties',
        [
          'babel-plugin-transform-object-rest-spread',
          {
            useBuiltIns: true,
          },
        ],
        /*         "lodash" */
      ],
    },
  },
});

const extractStyles = new ExtractTextPlugin({
  filename: 'style/[name].css',
  allChunks: true,
});
config.module.rules.push({
  test: /\.scss$/,
  exclude: /node_modules/,
  include: __dirname,
  /* use: ['style-loader', 'css-loader', 'sass-loader'], */
  loader: extractStyles.extract({
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: false, // project.sourcemaps,
          includePaths: [inProjectSrc('style')],
        },
      },
    ],
  }),
});

config.entry.push(`webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`);
config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin());

module.exports = config;
