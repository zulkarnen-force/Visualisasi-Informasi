const axios = require("axios").default;

class WeatherServices {

    constructor () {

    }

    
    async getByCity(city) {
        try {
            const datas = await axios.get(`https://wttr.in/${city}?format=j1`);
            return datas.data;
        } catch (err) {
            return err;
        }
    }

    async currentCondition(city) {
        try {
            const datas = await axios.get(`https://wttr.in/${city}?format=j1&lang=id`);
            return datas.data;
        } catch (err) {
            return err;
        }
    } 

}


module.exports = WeatherServices;