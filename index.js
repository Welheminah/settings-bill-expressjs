const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const settingsBill = require('./settings-bill');
const moment = require('moment');
moment().format();



const app = express();
const settingBill = settingsBill();

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts',
    // helpers : {
    //     moment : function(){}
    // }
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
        color: settingBill.totalClassName1()
    });
    
});

app.post('/settings', function(req, res){


    settingBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });

    

    res.redirect('/')
});

app.post('/action', function(req, res){
    settingBill.recordAction(req.body.actionType)
    
    res.redirect('/')
});

app.get('/actions', function(req, res){
    let actionsList = settingBill.actions();
    actionsList.forEach(element => {
        element.currentTime = moment(element.timestamp).fromNow()
    });
    res.render('actions', {actions: actionsList});

});

app.get('/actions/:actionType', function(req, res){
    
    let actionType = req.params.actionType;
    let actionsList = settingBill.actionsFor(actionType);
    actionsList.forEach(element => {
        element.currentTime = moment(element.timestamp).fromNow()
    });
    res.render('actions', { actions: actionsList });
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
    console.log("App started:", PORT)
})