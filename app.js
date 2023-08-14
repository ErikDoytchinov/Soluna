const fetch = require('node-fetch');
const express = require('express');
const cache = require('memory-cache');

var cors = require('cors');


const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.use(cors());

// app.get('/api/*', function (req, res) {
//     res.sendFile(process.cwd()+"/src" + req.url);
// });
 
app.get('/api/world', async function (req, res) {
    res.send(await fetchWeatherInfo());
});

var server = app.listen(port, hostname, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log(`Example app listening at http://${host}:${port}`);
});

async function fetchWeatherInfo(latitude = 0, longitude = 0, measurement = "metric"){
    if(cache.get(`${latitude},${longitude} - (${measurement})`) != null){
        weather = cache.get(`${latitude},${longitude} - (${measurement})`);
        return weather;
    } else {
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=1e9a2252a81388fe3fff130f96a58827&units=${measurement}`);
        const data = await response.json();

        cache.put(`${latitude},${longitude} - (${measurement})`, data, 18000, (key, value) => {
            console.log(`File has expired: ${key}, ${value}`);
        }); 
        weather = cache.get(`${latitude},${longitude} - (${measurement})`);
        return weather;
    }
}
