class Covid {
    constructor(datas = {}) {
        this.dataProv = []
        this.recovers = []
        this.cases = []
        this.dies = []
        this.treated = []
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
            this.cases.push(prov.jumlah_kasus)
            this.recovers.push(prov.jumlah_sembuh)
            this.dies.push(prov.jumlah_meninggal)
            this.treated.push(prov.jumlah_dirawat)
            this.cities.push(prov.key)
        }
        console.info(this.cases, this.cities)
    }


    setFilter(filter) {
        switch (filter) {
            case "sembuh":
                return this.recovers;
                break;
            case "meninggal":
                return this.dies
            case "dirawat":
                return this.treated;
            case "kasus":
                return this.cases;
            default:
                return this.cases;
        }
    }

    setDataConfig(filter = "kasus") {
        const filteredData = this.setFilter(filter);
        return  {
            labels: this.cities,
            datasets: [{
              label: 'My First Dataset',
              data: filteredData,
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

    
    setConfig(filter) {
        return {
            type: 'doughnut',
            data: this.setDataConfig(filter),
            options: {
                layout: {
                    padding: 20
                },
                responsive: true,
            }
        };
    }

}

module.exports = Covid;