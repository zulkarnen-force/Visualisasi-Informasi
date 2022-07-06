const { default: axios } = require("axios");

class TrendServices {
    constructor() {
        
    }
    
    async requset() {
        try {
            const response = await axios.get(process.env.TREND_INDONESIA);
            return response.data;
        } catch(e) {
            throw e;
        }
    }
}


module.exports = TrendServices;