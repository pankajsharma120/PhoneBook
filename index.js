require('./models');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const personController = require('./controllers/personController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));


app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/',helpers: require('./config/handlebars-helpers') }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/person', personController);
