const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/routingApp'));


app.all('*', (req, res) => {
  res.status(200).sendFile(__dirname + '/dist/routingApp/index.html');
});
/* eslint-disable no-process-env*/
app.listen(process.env.PORT || 8080);
