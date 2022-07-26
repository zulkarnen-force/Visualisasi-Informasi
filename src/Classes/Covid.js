class Covid {
    constructor(datas = {}) {
        this.dataProv = []
        this.cases = []
        this.cities = []
        this.lastDate = ""
    }

    getLastDate() {
        return this.lastDate
    }

    setData(data = {}) {
        console.info(data)
        const {list_data, last_date} = data;
        this.dataProv = list_data;
        this.lastDate = last_date;
        console.info(this.dataProv)
        for (const prov of list_data) {
            this.cases.push(prov.jumlah_sembuh)
            this.cities.push(prov.key)
        }
        console.info(this.cases, this.cities)
    }

    setDataConfig() {
        return  {
            labels: this.cities,
            datasets: [{
              label: 'My First Dataset',
              data: this.cases,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(244, 205, 86)',
                'rgb(255, 244, 86)',
                'rgb(255, 205, 100)',
                'rgb(255, 100, 86)',
                'rgb(100, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
    }

    setConfig() {
        return {
            type: 'doughnut',
            data: this.setDataConfig(),
            options: {
                layout: {
                    padding: 20
                },
                responsive: true,
                aspectRatio: 2,
            }
        };
    }

}

module.exports = Covid;