const express = require('express');
var history = require('connect-history-api-fallback');
const path = require('path');

// const port = parseInt(process.argv.slice(2)[0]);
const port = 5000;
const app = express();

history({
  rewrites: [
    { from: '/', to: './dist/index.html' }, // 默认入口
  ],
});

app.use(history());

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, 'localhost', () =>
  console.log('Example app listening on port :' + port),
);
