const app = require('express')();
const static = require('express').static;
const http = require('http');
var path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

app.set('port', process.env.PORT || 9873);
app.set('env', process.env.NODE_ENV || 'development');
const compiler = webpack(webpackConfig);
if (app.get('env') === 'development') {
  console.log('111');
  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, '/src'),
      hot: true,
      lazy: false,
      stats: 'normal',
      logLevel: 'error',
    }),
  );
  console.log('222');
  app.use(
    require('webpack-hot-middleware')(compiler, {
      path: '/__webpack_hmr',
    }),
  );

  app.use(static(path.join(__dirname, 'public')));

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err,
    });
  });
}
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('error');
  });
}

app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Server listening on port: ${app.get('port')}. Env is: ${app.get('env')}`);
});
