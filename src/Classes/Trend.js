const TrendServices = require("../Services/TrendServices");

class Trend {
    trends;
    constructor(response = {}) {
        const { status, data } = response;
        this.status = status;
        this.data = data;
        this.trends = this.data.trends;   
    }

    #getTrends() {
        return this.trends;
    }

    #toNumber(stringValue = ''){
        if (stringValue.length === 0) {
            return 0;
        }
       
        return parseInt(stringValue.slice(0, -1));
    }

    #getTrendingAndCount() {
        const trends = this.#getTrends();
        const tweets = [];
        const counts = [];

        for (const trend of trends) {
            let trendData = trend.data;
        
            trendData.map(function (value) {
                tweets.push(value['name']);
                counts.push( this.#toNumber(value['tweet_count']));
            }, this)
          
        }

        return {tweets, counts}
    }


    #getConfigData() {
       
        const { tweets, counts: countTweets } = this.#getTrendingAndCount();
        return  {
            labels: tweets,
            datasets: [{
              label: 'My First Dataset',
              data: countTweets,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
    }


    getConfig()  {
        
        return {
            type: 'doughnut',
            data: this.#getConfigData(),
        }

    };



}

module.exports = Trend;