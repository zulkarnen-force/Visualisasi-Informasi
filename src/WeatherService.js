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

    async getDatas() {
        const data = await this.sendRequest();
        return data;
    }

    
}


module.exports = WeatherServices;