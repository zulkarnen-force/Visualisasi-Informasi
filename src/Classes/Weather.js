class Weather {
    constructor () {
        this.data = []
        this.celcius = []
        this.fahrenheit = []
        this.hours = []

    }


    setData(data) {
        console.info('data', data)
        this.data = data
        this.parseDatas()
    }

    parseDatas(datas = []) {
        for (const iterator of this.data) {
            this.celcius.push(iterator['tempC'])
            this.hours.push(iterator['jamCuaca'])
        }
    }






    getWeather() {
        return this.weather;
    }

    getCurrent() {
        return this.currentCondition;
    }


    getCelciusHours () {
        const stages = this.getHourly();;
        let celciusPerDay = [];
        for (const stage of stages) {
            for (const s of stage) {
                celciusPerDay.push(parseInt(s['tempC']))
            }
        }
        return celciusPerDay;   
    }

    setConfig() {
        return {
            type:'line',
            data: {
                labels : this.hours,
                // labels: this.getLabel(),
                datasets: [{
                label: 'Suhu Udara Sleman',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: this.celcius
                // data: this.getCelciusHours(),
            }]},
            options: {
                scales: {
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, ticks) {
                                return '$' + value;
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        align: 'left',
                        fullSize: true,
                    }
                },
                devicePixelRatio: 10,
                responsive: true,
                layout: {
                    padding: 1,
                    autoPadding: false
                },
                animations: {
                    onProgress: function(animation) {
                        progress.value = animation.currentStep / animation.numSteps;
                    }
                },
                transitions: {
                  show: {
                    animations: {
                      x: {
                        from: 0
                      },
                      y: {
                        from: 0
                      }
                    }
                  },
                  hide: {
                    animations: {
                      x: {
                        to: 0
                      },
                      y: {
                        to: 0
                      }
                    }
                  }
                }
              }
          };
    }

    getHourly() {
        let hourly = []; 
        const weathers = this.getWeather();
        for (const weather of weathers) {
            hourly.push(weather['hourly'])
        }
        return hourly;
    }

    getLabel() {
        let start = 0;
        let labelHours = [];
        for (let i = 0; i < 24; i++) {
            labelHours.push((start+i).toString());
        }

        return labelHours;
    }
}


module.exports = Weather;