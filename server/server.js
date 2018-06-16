const path = require('path');
const express = require('express');

const app = express();

const publicPath = path.join(__dirname, '..', 'public' );

app.use(express.static(publicPath));

// send html to every route of the app, otherwise routes except '/' like '/create' will not be loaded when refreshing app.
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log('server is up on port', port);
});