const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const settingsBill = require('./settings-bill');


const app = express();
const settingBill = settingsBill();

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');



app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', function(req, res){
    
    res.render('index', {
        settings:settingBill.getSettings(),
        totals: settingBill.totals(),
        color: settingBill.colorSwitch()
    });
});

app.post('/settings', function(req, res){


    settingBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });

    console.log(settingBill.getSettings());

    res.redirect('/')
});

app.post('/action', function(req, res){
    settingBill.recordAction(req.body.actionType)
    
    console.log(req.body.actionType);

    res.redirect('/')
});

app.get('/actions', function(req, res){
    res.render('actions', {actions: settingBill.actions()});

});

app.get('/actions/:actionType', function(req, res){
    let actionType = req.params.actionType;
    var time = settingBill.actionsFor(actionType)
    res.render('actions', { actions: time });
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
    console.log("App started:", PORT)
})