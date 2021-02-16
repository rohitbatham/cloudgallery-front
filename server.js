const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/test', function (req, res) {
    res.write('Server is running');
    res.end();
});

app.listen(9000, function(){
    console.log("server runinng on port 9000")
});