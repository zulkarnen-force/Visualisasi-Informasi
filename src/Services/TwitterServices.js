const axios = require('axios').default;
require('dotenv').config()
class TwitterService {


    async sendRequest() {
        try {
            let result = await axios.get(process.env.TREND_INDONESIA)
            console.log(result)
            return result.data;
        } catch(why) {
            console.log(`[x_x Error] ${process.env.TREND_INDONESIA}`)
            return process.env.TREND_INDONESIA
        }
    }

    
}

module.exports = TwitterService;