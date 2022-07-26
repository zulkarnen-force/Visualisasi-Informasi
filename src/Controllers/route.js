const { Router } = require("express");
const route = Router();

const WeatherServices = require('../Services/WeatherService');
const Weather = require('../Classes/Weather');
const Covid = require('../Classes/Covid');
const CovidServices = require('../Services/CovidServices');
const { AxiosError } = require("axios");
const AREAS_ENUM = require("../Enums/AreasEnum");

route.get('/', async (req, res) => {
    res.render('welcome')
})


route.get('/weather', async (req, res) => {
    let id = "501186"
    req.query.id !== undefined ? id = req.query.id : null
    const weatherService = new WeatherServices();
    const weather = new Weather();

    try {
        const cityName =  weatherService.getCityName(id);
        const weatherData = await weatherService.getWeatherByCode(id)
        weather.setData(weatherData)
        weather.city = cityName;
        res.render('./weather/index', {areas: AREAS_ENUM, cityName, config: weather.setConfig()})

    } catch(err) {
        
        if (err instanceof AxiosError) {
            res.render('./layouts/sorry', {'message': `Error Code: ${err.code} | ${err.message}`})
        } else {
            res.render('./layouts/sorry', {'message': `${err.message}`})
        }
    }    
})



route.get('/covid', async (req, res) => {
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


route.get('/sorry', (req, res) => {
    res.render('./layouts/sorry', {message: "message"});
})



module.exports = route;