const http = require('http');
const axios = require('axios').default;
const express = require('express')
const app = express();
const PORT = 3000;
const path = require('path');
const { send } = require('process');
const fs = require('fs');
const { verify } = require('crypto');
const { json, query } = require('express');
const { render } = require('ejs');
const WeatherServices = require('./Services/WeatherService');
const Weather = require('./Classes/Weather');
const TwitterService = require('./Services/TwitterServices');
const Twitter = require('./Classes/Twitter');
const { resolveObjectURL } = require('buffer');



// app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


function readJSON(path, cb) {
    
    fs.readFile('./src/update.json', (err, data) => {
        if (err) {
            cb(err);
            return;
        }
        
        try {
            
            cb(null, JSON.parse(data))
        } catch(err) {
            
            cb(err);
        
        }

    })
  
}


// app.get('/covid', async function(req, res) {

//     axios.get('https://wttr.in/Bantul?format=j1')
//         .then(function (r) {
//             let data = r.data; // arrays {current, }
//             const {current_condition, nearest_area, request, weather} = data;
//             const {hourly} = weather[0]; 
//             // console.log(weather) // arrays 3 fase waktu
//             let hourArr = []
//             for (const hour of hourly) {

//                 hourArr.push({'hour': 1, 'c': hour['FeelsLikeC']})
//                 console.log(hour['FeelsLikeC'])
//             }
//             console.log(data)
//             const newHour = hourArr.map(({hour, c}) => {
//                 return parseInt(c);
//             })

//             // console.log(newHour)
//             res.render('index', {'data': newHour})
//         })
//         .catch(err => console.error(err.message))
  
// });


app.get('/', async (req, res) => {
    const weatherService = new WeatherServices();
    const result = await weatherService.getByCity('Bantul');
    const weather = new Weather(result);
    res.render('index', {'data': weather.getHourly(), 'config': weather.setConfig()})
})


app.get('/weather', async (req, res) => {
    const city = req.query.city 
    const weatherService = new WeatherServices();
    const result = await weatherService.getByCity(city);
    const weather = new Weather(result);
    res.render('index', {'data': weather.getHourly(), 'config': weather.setConfig()})
})

app.get('/current', async (req, res) => {
    const city = req.query.city
    const services = new WeatherServices();
    const current = await services.currentCondition(city);
    const weather = new Weather(current);
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    res.render('current', {'current': JSON.stringify(weather.getCurrent()), city, time});
})


app.get('/trends', async (req, res) => {
    const services = new TwitterService();
    const datas = await services.sendRequest();
    const twitter = new Twitter(datas);
    const trendFresh = twitter.getNewTren()
    // console.log(twitter.toConfigAble(trendFresh.data));
    res.render('trends', {'trends': twitter.getData(), 'config': JSON.stringify(twitter.getConfig())})
})


app.get('/trends/today', async (req, res) => {
    const services = new TwitterService();
    const datas = await services.sendRequest();
    const twitter = new Twitter(datas);
    const trendFresh = twitter.getNewTren();
    const config = twitter.getConfigTrend(trendFresh.data);
    console.log(`Config ${config}`)
    res.render('trends', {'trends': twitter.getData(), 'config': JSON.stringify(config)})
})

app.listen(PORT)

