const express = require('express')
const app = express();
const path = require('path');
const WeatherServices = require('./Services/WeatherService');
const Weather = require('./Classes/Weather');
const TwitterService = require('./Services/TwitterServices');
const Twitter = require('./Classes/Twitter');


// app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


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
    console.log(`Datas ${datas}`)
    const twitter = new Twitter(datas);
    const trendFresh = twitter.getNewTren();
    const config = twitter.getConfigTrend(trendFresh.data);
    console.log(`Config ${config}`)
    res.render('trends', {'trends': twitter.getData(), 'config': JSON.stringify(config)})
})

app.listen(process.env.PORT)