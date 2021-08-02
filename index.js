const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index')
})

app.post('/settings', function(req, res){
    console.log(req.body);
    res.redirect('/')
});

app.post('/action', function(req, res){

});

app.get('/actions', function(req, res){

});

app.get('/actions/:type co', function(req, res){

});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
    console.log("App started:", PORT)
});