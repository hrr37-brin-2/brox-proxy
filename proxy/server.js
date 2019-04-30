require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 1337;
const request = require('request');
const asyncRequest = require('./async-request');
const parser = require('body-parser');


app.use(morgan('dev'));
app.use(parser());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/:id', express.static(path.join(__dirname, 'public')));

app.get('/support/:id', async (req, res) => {
  const albumId = req.params.id;
  const supportData = await asyncRequest.get(`http://ec2-54-202-150-213.us-west-2.compute.amazonaws.com:3000/support/${albumId}`);
  res.send(supportData);
})

app.post('/support', async (req, res) => {
  const commentsData = req.body;
  const supportData = await asyncRequest.post({
    headers: {'content-type': 'application/json'},
    url: 'http://ec2-54-202-150-213.us-west-2.compute.amazonaws.com:3000/support',
    form: commentsData
});
  res.send(supportData);
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
