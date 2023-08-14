const express = require('express');
var cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://erikdoytchinov:plovdiv2004@cluster0.t0iqfq5.mongodb.net/?retryWrites=true&w=majority";

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.use(cors());

const message = {
    "lat": 52.3676,
    "lon": 4.9041,
    "timezone": "Europe/Amsterdam",
    "timezone_offset": 7200,
    "current": {
        "dt": 1691846244,
        "sunrise": 1691813868,
        "sunset": 1691867602,
        "temp": 22.35,
        "feels_like": 22.49,
        "pressure": 1014,
        "humidity": 71,
        "dew_point": 16.84,
        "uvi": 5.05,
        "clouds": 20,
        "visibility": 10000,
        "wind_speed": 8.05,
        "wind_deg": 231,
        "wind_gust": 9.83,
        "weather": [
            {
                "id": 801,
                "main": "Clouds",
                "description": "few clouds",
                "icon": "02d"
            }
        ]
    },
    "minutely": [
        {
            "dt": 1691846280,
            "precipitation": 0
        },
        {
            "dt": 1691846340,
            "precipitation": 0
        },
        {
            "dt": 1691846400,
            "precipitation": 0
        },
        {
            "dt": 1691846460,
            "precipitation": 0
        },
        {
            "dt": 1691846520,
            "precipitation": 0
        },
        {
            "dt": 1691846580,
            "precipitation": 0
        },
        {
            "dt": 1691846640,
            "precipitation": 0
        },
        {
            "dt": 1691846700,
            "precipitation": 0
        },
        {
            "dt": 1691846760,
            "precipitation": 0
        },
        {
            "dt": 1691846820,
            "precipitation": 0
        },
        {
            "dt": 1691846880,
            "precipitation": 0
        },
        {
            "dt": 1691846940,
            "precipitation": 0
        },
        {
            "dt": 1691847000,
            "precipitation": 0
        },
        {
            "dt": 1691847060,
            "precipitation": 0
        },
        {
            "dt": 1691847120,
            "precipitation": 0
        },
        {
            "dt": 1691847180,
            "precipitation": 0
        },
        {
            "dt": 1691847240,
            "precipitation": 0
        }
    ],
    "hourly": [
        {
            "dt": 1691845200,
            "temp": 22.35,
            "feels_like": 22.49,
            "pressure": 1014,
            "humidity": 71,
            "dew_point": 16.84,
            "uvi": 5.05,
            "clouds": 20,
            "visibility": 10000,
            "wind_speed": 6.61,
            "wind_deg": 252,
            "wind_gust": 9.13,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1691848800,
            "temp": 22.17,
            "feels_like": 22.19,
            "pressure": 1014,
            "humidity": 67,
            "dew_point": 15.76,
            "uvi": 3.96,
            "clouds": 16,
            "visibility": 10000,
            "wind_speed": 6.51,
            "wind_deg": 244,
            "wind_gust": 9.51,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1691852400,
            "temp": 21.95,
            "feels_like": 21.85,
            "pressure": 1014,
            "humidity": 63,
            "dew_point": 14.59,
            "uvi": 2.65,
            "clouds": 12,
            "visibility": 10000,
            "wind_speed": 6.36,
            "wind_deg": 241,
            "wind_gust": 10.29,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1691856000,
            "temp": 21.53,
            "feels_like": 21.36,
            "pressure": 1014,
            "humidity": 62,
            "dew_point": 13.95,
            "uvi": 1.53,
            "clouds": 8,
            "visibility": 10000,
            "wind_speed": 5.86,
            "wind_deg": 240,
            "wind_gust": 10.23,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1691859600,
            "temp": 20.57,
            "feels_like": 20.35,
            "pressure": 1015,
            "humidity": 64,
            "dew_point": 13.53,
            "uvi": 0.66,
            "clouds": 4,
            "visibility": 10000,
            "wind_speed": 5.37,
            "wind_deg": 237,
            "wind_gust": 9.82,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1691863200,
            "temp": 19.02,
            "feels_like": 18.73,
            "pressure": 1015,
            "humidity": 67,
            "dew_point": 12.82,
            "uvi": 0.2,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 5.26,
            "wind_deg": 235,
            "wind_gust": 10.33,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1691866800,
            "temp": 17.86,
            "feels_like": 17.56,
            "pressure": 1015,
            "humidity": 71,
            "dew_point": 12.52,
            "uvi": 0,
            "clouds": 15,
            "visibility": 10000,
            "wind_speed": 4.98,
            "wind_deg": 232,
            "wind_gust": 11.56,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1691870400,
            "temp": 17.65,
            "feels_like": 17.35,
            "pressure": 1015,
            "humidity": 72,
            "dew_point": 12.43,
            "uvi": 0,
            "clouds": 58,
            "visibility": 10000,
            "wind_speed": 4.92,
            "wind_deg": 230,
            "wind_gust": 11.62,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1691874000,
            "temp": 17.44,
            "feels_like": 17.17,
            "pressure": 1015,
            "humidity": 74,
            "dew_point": 12.94,
            "uvi": 0,
            "clouds": 72,
            "visibility": 10000,
            "wind_speed": 4.79,
            "wind_deg": 227,
            "wind_gust": 10.98,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        }
    ],
    "daily": [
        {
            "dt": 1691838000,
            "sunrise": 1691813868,
            "sunset": 1691867602,
            "moonrise": 1691796540,
            "moonset": 1691862720,
            "moon_phase": 0.88,
            "summary": "Expect a day of partly cloudy with rain",
            "temp": {
                "day": 21.19,
                "min": 16.88,
                "max": 22.35,
                "night": 17.44,
                "eve": 20.57,
                "morn": 18.34
            },
            "feels_like": {
                "day": 21.27,
                "night": 17.17,
                "eve": 20.35,
                "morn": 18.79
            },
            "pressure": 1014,
            "humidity": 73,
            "dew_point": 16.16,
            "wind_speed": 6.61,
            "wind_deg": 252,
            "wind_gust": 11.62,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 50,
            "pop": 0.94,
            "rain": 10.07,
            "uvi": 5.05
        },
        {
            "dt": 1691924400,
            "sunrise": 1691900367,
            "sunset": 1691953884,
            "moonrise": 1691886180,
            "moonset": 1691951520,
            "moon_phase": 0.91,
            "summary": "Expect a day of partly cloudy with rain",
            "temp": {
                "day": 21.19,
                "min": 15.3,
                "max": 21.65,
                "night": 16.06,
                "eve": 20.34,
                "morn": 15.43
            },
            "feels_like": {
                "day": 20.96,
                "night": 15.86,
                "eve": 20.21,
                "morn": 15.35
            },
            "pressure": 1016,
            "humidity": 61,
            "dew_point": 13.34,
            "wind_speed": 6.12,
            "wind_deg": 232,
            "wind_gust": 10.74,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 77,
            "pop": 0.34,
            "rain": 0.12,
            "uvi": 4.69
        },
        {
            "dt": 1692010800,
            "sunrise": 1691986866,
            "sunset": 1692040164,
            "moonrise": 1691976600,
            "moonset": 1692039600,
            "moon_phase": 0.94,
            "summary": "There will be partly cloudy today",
            "temp": {
                "day": 22.78,
                "min": 14.05,
                "max": 23.93,
                "night": 19.25,
                "eve": 23.08,
                "morn": 14.23
            },
            "feels_like": {
                "day": 22.58,
                "night": 19.27,
                "eve": 23.09,
                "morn": 14.06
            },
            "pressure": 1015,
            "humidity": 56,
            "dew_point": 13.68,
            "wind_speed": 4.29,
            "wind_deg": 150,
            "wind_gust": 6.65,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 100,
            "pop": 0,
            "uvi": 5.93
        },
        {
            "dt": 1692097200,
            "sunrise": 1692073365,
            "sunset": 1692126444,
            "moonrise": 1692067320,
            "moonset": 1692127260,
            "moon_phase": 0.97,
            "summary": "Expect a day of partly cloudy with rain",
            "temp": {
                "day": 22.06,
                "min": 15.59,
                "max": 22.06,
                "night": 15.59,
                "eve": 19.24,
                "morn": 17.02
            },
            "feels_like": {
                "day": 21.94,
                "night": 15.45,
                "eve": 19.07,
                "morn": 17.15
            },
            "pressure": 1016,
            "humidity": 62,
            "dew_point": 14.57,
            "wind_speed": 4.95,
            "wind_deg": 257,
            "wind_gust": 7.46,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 19,
            "pop": 0.91,
            "rain": 1.85,
            "uvi": 5.58
        },
        {
            "dt": 1692183600,
            "sunrise": 1692159865,
            "sunset": 1692212722,
            "moonrise": 1692158160,
            "moonset": 1692214560,
            "moon_phase": 0,
            "summary": "There will be clear sky until morning, then partly cloudy",
            "temp": {
                "day": 23.36,
                "min": 14.12,
                "max": 23.36,
                "night": 15.42,
                "eve": 19.06,
                "morn": 15.62
            },
            "feels_like": {
                "day": 23.11,
                "night": 15.24,
                "eve": 18.9,
                "morn": 15.38
            },
            "pressure": 1019,
            "humidity": 52,
            "dew_point": 12.88,
            "wind_speed": 3.57,
            "wind_deg": 342,
            "wind_gust": 5.36,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 86,
            "pop": 0,
            "uvi": 5.36
        },
        {
            "dt": 1692270000,
            "sunrise": 1692246365,
            "sunset": 1692298998,
            "moonrise": 1692248940,
            "moonset": 1692301680,
            "moon_phase": 0.03,
            "summary": "There will be partly cloudy until morning, then clearing",
            "temp": {
                "day": 22.18,
                "min": 13.53,
                "max": 22.18,
                "night": 15.74,
                "eve": 18.58,
                "morn": 14.96
            },
            "feels_like": {
                "day": 21.71,
                "night": 15.56,
                "eve": 18.27,
                "morn": 14.7
            },
            "pressure": 1021,
            "humidity": 48,
            "dew_point": 10.69,
            "wind_speed": 3.5,
            "wind_deg": 33,
            "wind_gust": 7.64,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": 5,
            "pop": 0,
            "uvi": 6
        },
        {
            "dt": 1692356400,
            "sunrise": 1692332864,
            "sunset": 1692385274,
            "moonrise": 1692339600,
            "moonset": 1692388680,
            "moon_phase": 0.06,
            "summary": "The day will start with clear sky through the late morning hours, transitioning to partly cloudy",
            "temp": {
                "day": 24.16,
                "min": 14.03,
                "max": 25.06,
                "night": 18.79,
                "eve": 22.15,
                "morn": 15.32
            },
            "feels_like": {
                "day": 23.88,
                "night": 18.74,
                "eve": 22.09,
                "morn": 15.26
            },
            "pressure": 1018,
            "humidity": 48,
            "dew_point": 12.39,
            "wind_speed": 4.54,
            "wind_deg": 87,
            "wind_gust": 9.42,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": 12,
            "pop": 0,
            "uvi": 6
        },
        {
            "dt": 1692442800,
            "sunrise": 1692419364,
            "sunset": 1692471549,
            "moonrise": 1692430320,
            "moonset": 1692475620,
            "moon_phase": 0.09,
            "summary": "You can expect partly cloudy in the morning, with rain in the afternoon",
            "temp": {
                "day": 29.07,
                "min": 16.79,
                "max": 30.01,
                "night": 21.57,
                "eve": 26.54,
                "morn": 17.89
            },
            "feels_like": {
                "day": 30.41,
                "night": 22.18,
                "eve": 26.54,
                "morn": 17.98
            },
            "pressure": 1013,
            "humidity": 55,
            "dew_point": 19.05,
            "wind_speed": 4.27,
            "wind_deg": 116,
            "wind_gust": 9.29,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 84,
            "pop": 0.99,
            "rain": 4.93,
            "uvi": 6
        }
    ]
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run() {
    try {
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

app.get('/', function (req, res) {
    res.send(message);
});
 
var server = app.listen(port, hostname, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log(`Example app listening at http://${host}:${port}`);
});