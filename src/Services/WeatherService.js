const axios = require("axios").default;
require('dotenv').config();

class WeatherServices {

    constructor () {
        this.URL = "https://ibnux.github.io/BMKG-importer/cuaca/"
    }

    async getAreasDiy() {
        try {
            const datas = await axios.get(`${this.URL}wilayah.json`);
            const wilayah = datas.data;
            const DIYAreas = wilayah.filter( v => v.propinsi === "DIYogyakarta");
            return DIYAreas;
        } catch (err) {
            return err;
        }
    }    

    async getDefault() {
        try {
            const datas = await axios.get("https://ibnux.github.io/BMKG-importer/cuaca/501186.json");
            return datas.data
        } catch (err) {
            return err;
        }
    }


    async getAreas() {
        try {
            const areas = await axios.get("https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json");
            return areas.data;
        } catch (err) {
            return err;
        }
    }


    async getByCode(code) {
        try {
            const datas = await axios.get(`${this.URL}${code}.json`);
            return datas.data
        } catch (err) {
            return err;
        }
    }


    async getByCity(city) {
        try {
            const datas = await axios.get(`${URL}`);
            return datas.data;
        } catch (err) {
            return err;
        }
    }

    async currentCondition(city = 'Bantul') {
        try {
            const datas = await axios.get(`https://wttr.in/${city}?format=j1&lang=id`);
            return datas.data;
        } catch (err) {
            return err;
        }
    } 

}


module.exports = WeatherServices;