const express = require('express');
var cors = require('cors');


const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.use(cors());

app.get('/api/*', function (req, res) {
    res.sendFile(process.cwd()+"/src" + req.url);
});
 
var server = app.listen(port, hostname, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log(`Example app listening at http://${host}:${port}`);
});