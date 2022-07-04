const http = require('http');
const axios = require('axios').default;
const express = require('express')
const app = express();
const PORT = 3000;
const path = require('path');
const { send } = require('process');
const fs = require('fs');
const { verify } = require('crypto');
const { json } = require('express');
const { render } = require('ejs');
const WeatherServices = require('./WeatherService');



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


app.get('/covid', async function(req, res) {

    axios.get('https://wttr.in/Bantul?format=j1')
        .then(function (r) {
            let data = r.data; // arrays {current, }
            const {current_condition, nearest_area, request, weather} = data;
            const {hourly} = weather[0]; 
            // console.log(weather) // arrays 3 fase waktu
            let hourArr = []
            for (const hour of hourly) {

                hourArr.push({'hour': 1, 'c': hour['FeelsLikeC']})
                console.log(hour['FeelsLikeC'])
            }
            console.log(data)
            const newHour = hourArr.map(({hour, c}) => {
                return parseInt(c);
            })

            // console.log(newHour)
            res.render('index', {'data': newHour})
        })
        .catch(err => console.error(err.message))
  
});


app.get('/', async (req, res) => {
    const weatherService = new WeatherServices();
    const weathers = await weatherService.sendRequset();
    // Bulder
})



app.listen(PORT)

