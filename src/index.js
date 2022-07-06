const express = require('express')
const app = express();
const path = require('path');
const WeatherServices = require('./Services/WeatherService');
const Weather = require('./Classes/Weather');
const TwitterService = require('./Services/TwitterServices');
const Twitter = require('./Classes/Twitter');
const { json } = require('express');
const TrendServices = require('./Services/TrendServices');
const { rmSync } = require('fs');
const Trend = require('./Classes/Trend');


// app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    // const weatherService = new WeatherServices();
    // const result = await weatherService.getByCity('Bantul');
    // const weather = new Weather(result);
    // res.render('index', {'data': weather.getHourly(), 'config': weather.setConfig()})
    res.render('welcome')
    // return res.json({"json":"json"})
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
    res.render('trends', {'trends': twitter.getData(), 'config': JSON.stringify(twitter.getConfig())})
})


app.get('/trends/verbose', async (req, res) => {
    const trendsService = new TrendServices();
    const response = await trendsService.requset();
    const trend = new Trend(response)
    res.render('trends', {'trends':'', 'config': JSON.stringify(trend.getConfig())});
})

app.get('/trends/today', async (req, res) => {
    console.log(process.env.BASE_URL)
    const services = new TwitterService();
    const datas = await services.sendRequest();
    const twitter = new Twitter(datas);
    const trendFresh = twitter.getNewTren();
    const config = twitter.getConfigTrend(trendFresh.data);
    res.render('trends', {'trends': twitter.getData(), 'config': JSON.stringify(config)})
})

app.listen(process.env.PORT, () => console.log('listen on port ' + process.env.PORT))