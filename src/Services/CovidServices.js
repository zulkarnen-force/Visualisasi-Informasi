const axios = require("axios").default;
require('dotenv').config();

class CovidServices {

    constructor() {
        this.URL = "https://data.covid19.go.id/public/api/prov.json";
        this.data = []

    }


    async getData() {
        const covidProv = await axios.get(this.URL);
        return covidProv.data
    }

}


module.exports = CovidServices;