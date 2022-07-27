const AREAS_ENUM = require("../Enums/AreasEnum");

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
            console.info("wilayah", wilayah)
            const DIYAreas = wilayah.filter( v => v.propinsi === "DIYogyakarta");
            return DIYAreas;
        } catch ( err) {
            console.error(err)
            throw err;
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


    async getWeatherByCode(code = "501186") {
        try {
            const datas = await axios.get(`${this.URL}${code}.json`);
            return datas.data
        } catch (err) {
            return err;
        }
    }


    getCityName(code) {
        try {
            const areas = AREAS_ENUM
            const codeData = areas.filter( v => v.id === code);
            return codeData[0].kota;
        } catch (err) {
            return err;
        }
    }

}


module.exports = WeatherServices;