const axios = require('axios').default;

class TwitterService {


    async sendRequest() {
        try {
            let result = await axios.get('https://api-twitter-trends.herokuapp.com/trends?location=indonesia')
            return result.data;
        } catch(why) {
            return why.message
        }
    }

    
}

module.exports = TwitterService;