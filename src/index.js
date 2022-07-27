const express = require('express')
const app = express();
const path = require('path');
const route = require('./controllers/route');

// app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', route); 

app.listen(process.env.PORT, () => console.log('listen on port ' + process.env.PORT))