const express = require('express')
const app = express();
const path = require('path');
const WeatherServices = require('./Services/WeatherService');
const Weather = require('./Classes/Weather');
const Covid = require('./Classes/Covid');
const CovidServices = require('./Services/CovidServices');
const { json } = require('express');



// app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    res.render('welcome')
})


app.get('/weather', async (req, res) => {
    let id = "501186"
    req.query.id !== undefined ? id =  req.query.id : null
    try {
        const weatherService = new WeatherServices();
        const cityName =  await weatherService.getCityName(id);
        const areas = await weatherService.getAreasDiy()
        const city = await weatherService.getByCode(id)
        const weather = new Weather();
        weather.setData(city)
        weather.city = cityName;
        res.render('./weather/index', {areas, cityName, config: weather.setConfig()})
    } catch(err) {
        res.render('./layouts/sorry')
    }


    
})


app.get('/covid', async (req, res) => {
    const filter = req.query.filter
    const covidServices =  new CovidServices();
    const data = await covidServices.getData();
    const covid = new Covid()
    covid.setData(data)
    if (filter) {
        res.render('./covid/index', {config: covid.setConfig(filter), lastDate:covid.getLastDate()})
    }
    res.render('./covid/index', {config: covid.setConfig(), lastDate:covid.getLastDate()})
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

app.get('/sorry', (req, res) => {
    res.render('./layouts/sorry');
})

app.listen(process.env.PORT, () => console.log('listen on port ' + process.env.PORT))