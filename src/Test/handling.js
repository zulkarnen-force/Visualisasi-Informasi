const axios = require('axios').default;
require('dotenv').config();


const getData = async (handler, e) => {
    try {
        const trendsIndonesia = await axios.get(`${process.env.TREND_INDONESIA}`);
        handler(trendsIndonesia.data.data.trends,  null);
    } catch (e) {
        handler('e');
    }
}

successHandler = (success, error) => {
    console.log(success)
    for (const key in success) {
        console.log(success[key]['data'])
    }
}


getData(successHandler)







