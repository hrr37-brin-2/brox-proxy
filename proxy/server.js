const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
const asyncRequest = require('./async-request');


app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/:id', express.static(path.join(__dirname, 'public')));

app.get('/support/:id', async (req, res) => {
  const albumId = req.params.id;
  const supportData = await asyncRequest(`http://localhost:3003/support/${albumId}`);
  res.send(supportData);
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});