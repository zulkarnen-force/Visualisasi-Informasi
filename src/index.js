const express = require('express')
const app = express();
const path = require('path');
const WeatherServices = require('./Services/WeatherService');
const Weather = require('./Classes/Weather');
const TwitterService = require('./Services/TwitterServices');
const Twitter = require('./Classes/Twitter');
const TrendServices = require('./Services/TrendServices');
const Trend = require('./Classes/Trend');


// app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    res.render('welcome')
})


app.get('/weather', async (req, res) => {
    const id = req.query.id 
    console.info("id", id)
    console.error(id === undefined)
    const weatherService = new WeatherServices();
   
    const cityName =  await weatherService.getCityName(id);
    console.log("CITY NAME", cityName)
    const areas = await weatherService.getAreasDiy()
    if (id === undefined) {
        res.render('./weather/index', {areas, config: undefined})
    } else {
        const city = await weatherService.getByCode(id)
        const weather = new Weather();
        weather.setData(city)
        weather.city = cityName
        res.render('./weather/index', {areas, cityName, config: weather.setConfig()})
    }
    
    
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

// app.get('/test', async(req, res) => {
//         const id = req.query.id 
//         if (id === undefined) {
//             const weatherService = new WeatherServices();
//             // const result = await weatherService.getByCity(city);
//             const areas = await weatherService.getAreas()
//             // const weather = new Weather(data.data);
//             let DIYogya = areas.filter( v => v.propinsi === "DIYogyakarta")
//         }  
        
        
//         // res.json(DIYogyakarta)
//         res.render('./weather/index', {DIYogya})
// })

// app.get('/trends', async (req, res) => {
//     const services = new TwitterService();
//     const datas = await services.sendRequest();
//     const twitter = new Twitter(datas);
//     const trendFresh = twitter.getNewTren()
//     res.render('trends', {'trends': twitter.getData(), 'config': JSON.stringify(twitter.getConfig())})
// })


// app.get('/trends/verbose', async (req, res) => {
//     const trendsService = new TrendServices();
//     const response = await trendsService.requset();
//     const trend = new Trend(response)
//     res.render('trends', {'trends':'', 'config': JSON.stringify(trend.getConfig())});
// })

// app.get('/trends/today', async (req, res) => {
//     console.log(process.env.BASE_URL)
//     const services = new TwitterService();
//     const datas = await services.sendRequest();
//     const twitter = new Twitter(datas);
//     const trendFresh = twitter.getNewTren();
//     const config = twitter.getConfigTrend(trendFresh.data);
//     res.render('trends', {'trends': twitter.getData(), 'config': JSON.stringify(config)})
// })

app.listen(process.env.PORT, () => console.log('listen on port ' + process.env.PORT))