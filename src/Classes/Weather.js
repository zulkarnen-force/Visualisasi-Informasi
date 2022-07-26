class Weather {
    constructor () {
        this.data = []
        this.celcius = []
        this.fahrenheit = []
        this.hours = []
        this.city = "Kab. Bantul"
        this.datetime = require('node-datetime')
    }


    setData(data) {
        console.info('data', data)
        this.data = data
        console.log(data)
        this.parseDatas()
    }

    parseDatas() {
        for (const weather of this.data) {
          let datetimeFormat = this.datetime.create(weather['jamCuaca'], 'd-n-Y H:M')
          let labelDateTime = datetimeFormat.format()
            this.celcius.push(`${weather['tempC']}`)
            this.hours.push(labelDateTime)
        }
    }



    setConfig() {
        return {
            type:'line',
            data: {
                labels : this.hours,
                // labels: this.getLabel(),
                datasets: [{
                label: this.city,
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

}


module.exports = Weather;