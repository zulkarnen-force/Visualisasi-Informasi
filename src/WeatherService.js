const axios = require("axios").default;

class WeatherServices {

    constructor () {

    }

    
    async sendRequset() {
        try {
            const datas = await axios.get('https://wttr.in/Bantul?format=j1');
            let realData = datas.data;
            let {current_condition, nearest_area, request, weather} = realData;
            this.currentCondition = current_condition;
            this.weather = weather;
            return datas.data;
        } catch (err) {
            return err;
        }

    }

    async getData() {
        const data = await this.sendRequset();
        return this.currentCondition;
    }

    async getCurrentCondition() {
        await this.sendRequset()
        return this.currentCondition;
    }

    async getWeather() {
        await this.sendRequset();
        console.log('get weather ' + this.weather)
        return this.weather;
    }

    setLabel()
    {
        const data = {
            labels: ['00', '02', '03', '04', '05', '06'],
            datasets: [{
              label: 'My First dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45],
            }]
          };
    }

    getWeather() {
        return this.weather;
    }



}


module.exports = WeatherServices;