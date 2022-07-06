const TrendServices = require("../Services/TrendServices");

class Trend {
    trends;
    constructor(response = {}) {
        const { status, data } = response;
        this.status = status;
        this.data = data;
        this.trends = this.data.trends;   
    }

    _getTrends() {
        return this.trends;
    }

    _toNumber(stringValue = ''){
        if (stringValue.length === 0) {
            return 0;
        }
       
        return parseInt(stringValue.slice(0, -1));
    }

    _getTrendingAndCount() {
        const trends = this._getTrends();
        const tweets = [];
        const counts = [];

        for (const trend of trends) {
            let trendData = trend.data;
        
            trendData.map(function (value) {
                tweets.push(value['name']);
                counts.push( this.toNumber(value['tweet_count']));
            }, this)
          
        }

        return {tweets, counts}
    }


    _getConfigData() {
       
        const { tweets, counts: countTweets } = this._getTrendingAndCount();
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
            data: this._getConfigData(),
        }

    };



}

module.exports = Trend;