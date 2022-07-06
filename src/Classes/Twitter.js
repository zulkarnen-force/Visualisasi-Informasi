class Twitter {

    constructor (properties = Twitter) {
        const { status, data } = properties;
       
        this.status = status;
        this.data = data; 

    }

    getData() {
        return this.data;
    }


    getTrends() {
        console.log(this.data.trends)
        return this.data.trends;
    }

    getTrendData() {
        const trends = this.getTrends();

        let trendsData = []
        for (let index = 0; index < trends.length; index++) {
            trendsData.push(trends[index].data) 
        }

        return trendsData;
    }

    getNewTren() {
        const newTren = this.getTrends()[0];
        return newTren;
    }

    setConfigTren(config) {
        const {data, labels} = config;
        return  {
            labels: labels,
            datasets: [{
                label: 'Trends Tweet Today',
                data: data,
                backgroundColor: [ 
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(234, 205, 86)',
                    'rgb(255, 123, 86)',
                    'rgb(255, 205, 23)',
                    'rgb(255, 123, 86)',
                ],
                hoverOffset: 4
            }]
          };
    }

    setDataConfig(data){
        return  {
            type: 'doughnut', data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false
                
            }
        };
    }

    getConfigTrend(trends = []) {
        let labels = [];

        for (const trend of trends) {
            labels.push({labels: trend.name, data: (trend.tweet_count.length !== 0) ? parseInt(trend.tweet_count.slice(0, -1)) : 0});
        }

        let a = 0; 
        for (const count of labels) {
            a += count.data; 
        }

        const labelAndData = this.cleanNullNumber(labels, a/trends.length);
        const dataConfig = this.setConfigTren(labelAndData)
        return this.setDataConfig(dataConfig);
    }

    cleanNullNumber(datas = [], number) {
        const labels = [];
        const data = [];

        for (const d of datas) {
            labels.push(d.labels);
            data.push((d.data) === 0 ? number : d.data);
        }

        return {labels, data};
    }
    onlyHasTweetCount() {
        const trendsData = this.getTrendData();
        let filtered = [];
        for (let index = 0; index < trendsData.length; index++) {
            let trendMap = trendsData[index].filter((value) => value.tweet_count.length !== 0);
            filtered.push(trendMap);
        }
        return filtered;
    }


    getDataAndLabels() {
        const datas = this.onlyHasTweetCount();
        let data;
        let labels;
        for (let index = 0; index < datas.length; index++) {
            data = datas[index].map( (item) => parseInt(item['tweet_count'].slice(0, -1)) );
            labels = datas[index].map( (item) => item['name'] );
        }
        return {data, labels};
    }

    getDataConfig(){
        const {data, labels} = this.getDataAndLabels();
        return  {
            labels: labels,
            datasets: [{
                label: 'Trends Tweet Today',
                data: data,
                backgroundColor: [ 
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
          };
    }


    setConfig() {
        return  {
            type: 'doughnut', data: this.getDataConfig(), 
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    }

    getConfig(){
        return this.setConfig();
    }


    toNumberCount(array = []) {
        
        const to = array.map( arr => {
            return parseInt(arr['tweet_count'].slice(0, -1))
        } );

        return to;
    }


    /**
     * 
     * @param {*} trends trends aray with inside of {name, tweet_count}
     */
    toConfigAble(trends = Array()){

    }


}


module.exports = Twitter;