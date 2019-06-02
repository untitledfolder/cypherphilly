var app = require('express')();

var port = 7000;

app.get('/hello', (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("Server started:", port);
});
