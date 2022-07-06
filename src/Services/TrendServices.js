const { default: axios } = require("axios");

class TrendServices {
    constructor() {
        
    }
    
    async requset() {
        try {
            const response = await axios.get('https://api-twitter-trends.herokuapp.com/trends?location=indonesia');
            return response.data;
        } catch(e) {
            throw e;
        }
    }
}


module.exports = TrendServices;