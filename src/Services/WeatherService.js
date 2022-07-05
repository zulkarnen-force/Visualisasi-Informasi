const axios = require("axios").default;
require('dotenv').config();

class WeatherServices {

    constructor () {

    }

    
    async getByCity(city) {
        try {
            const datas = await axios.get(`${process.env.BASE_URL}${city}?format=j1`);
            return datas.data;
        } catch (err) {
            return err;
        }
    }

    async currentCondition(city = 'Bantul') {
        try {
            const datas = await axios.get(`${process.env.BASE_URL}${city}?format=j1&lang=id`);
            return datas.data;
        } catch (err) {
            return err;
        }
    } 

}


module.exports = WeatherServices;