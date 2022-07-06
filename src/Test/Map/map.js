const e = require("express");

const array  = [
    { name: '#ManifestoDay1_OutNow', tweet_count: '171K' },
    { name: '#MANIFESTO_DAY1', tweet_count: '1250K' },
    { name: 'FUTURE PERFECT OUT NOW', tweet_count: '171K' },
    { name: '#ENHYPEN', tweet_count: '1176K' },
    { name: 'NIHILIST INSERT CUT', tweet_count: '11K' },
    { name: '#TXT_NIHILIST', tweet_count: '11K' },
    { name: 'KASIH AKU MIN', tweet_count: '' },
    { name: '#Rp6TriliunKreditMacetTitan', tweet_count: '' },
    { name: 'Babarsari', tweet_count: '10K' },
    { name: 'Shout Out', tweet_count: '118K' },
    { name: 'Visi Prabowo Subianto', tweet_count: '' },
    { name: 'Kita Harus Swasembada', tweet_count: '' },
    { name: 'OUR JAEYUNIUS LYRICIST', tweet_count: '46K' },
    { name: 'Walk The Line', tweet_count: '65K' },
    { name: 'Untuk Indonesia Kuat', tweet_count: '' },
    { name: 'Gabriel Jesus', tweet_count: '60K' },
    { name: 'ZETA', tweet_count: '' },
    { name: "Brightwin's Fans", tweet_count: '' },
    { name: 'Seturan', tweet_count: '' },
    { name: 'Aksi Cepat Tanggap', tweet_count: '11K' },
    { name: 'SCBD', tweet_count: '' },
    { name: 'Ultras', tweet_count: '' },
    { name: 'Menhan Prabowo', tweet_count: '' },
    { name: 'Pak Prabowo', tweet_count: '' },
    { name: 'Senin', tweet_count: '132K' },
    { name: 'Transformasi UPK Eks PNPM', tweet_count: '' },
    { name: 'apel pagi', tweet_count: '' },
    { name: 'Aksi Cepat Tilep', tweet_count: '' },
    { name: 'Solo Leveling', tweet_count: '66K' },
    { name: 'Miskin', tweet_count: '' },
    { name: '#PasstheMIC', tweet_count: '54K' },
    { name: '#EN_TFW', tweet_count: '65K' },
    { name: '#KuisAFFU19', tweet_count: '' },
    { name: '#FionyMail', tweet_count: '' },
    { name: '#ParadoXXXInvasion', tweet_count: '68K' },
    { name: '#LOLBrightWin', tweet_count: '28K' },
    { name: '#PengusahaNakal', tweet_count: '10K' },
    { name: '#JAKE', tweet_count: '155K' },
    { name: '#엔하이픈', tweet_count: '138K' },
    { name: '#Lyricist_제이크', tweet_count: '49K' },
    { name: '#nctdisband', tweet_count: '' },
    { name: '#ไบร์ทวิน', tweet_count: '46K' },
    { name: '#BuildJakapan', tweet_count: '65K' },
    { name: '#SambungJadiUntung', tweet_count: '' },
    { name: '#JuruDamaiGagal', tweet_count: '' },
    { name: '#CelineTerimaKasih', tweet_count: '' },
    { name: '#ClickxNCT127', tweet_count: '11K' },
    { name: '#JokowiBikinMalu', tweet_count: '' },
    { name: '#BangkitBersamaET', tweet_count: '' },
    { name: '#TPPJawaTimur', tweet_count: '' }
  ]

const labels = array.map(arr => arr['name'] );

const tweetCount = array.map( arr => {
    let tweetInt = [];
    tweetInt = parseInt(arr['tweet_count'].slice(0, -1))
    return tweetInt;
} );

const filtered = array.map(arr => parseInt(arr['tweet_count'].slice(0, -1)) );

// console.log(tweetCount)

const cleanNanNumber = tweetCount.map((count, index) => {
    if (isNaN(count)) {
       return 00
    } else {
        return count;
    }
})

// console.log(cleanNanNumber)


function toNumberCount(array = []) {
        
    const tweetCount = array.map( arr => {
        return parseInt(arr['tweet_count'].slice(0, -1))
    } );

    return tweetCount;

}


function replaceNaN(arrayNumber = [0], newValue = 0) {
    
    const cleaned = arrayNumber.map( (tweetCount) => {
        if (isNaN(tweetCount)) {
            return newValue;
        } else {
            return tweetCount;
        }
    })

    return cleaned;
}


function toConfigAble() {
    const tweetCountNumber = toNumberCount(array);
    const cleaned = replaceNaN(tweetCountNumber, 100/5);
    return {data: cleaned};
}



console.log(toConfigAble()['data']);
