const axios = require('axios').default;
require('dotenv').config()
class TwitterService {


    async sendRequest() {
        try {
            let result = await axios.get(process.env.TREND_INDONESIA)
            return result.data;
        } catch(why) {
            console.log(`[x_x Error] ${why.message}`)
            return why.message;
        }
    }

    
}

module.exports = TwitterService;