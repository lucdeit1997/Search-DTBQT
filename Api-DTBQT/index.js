const express = require('express');
const app = express();
const verbs = require('./index.json');
const mongoose = require('mongoose');
const verbsModel = require('./models/Verbs');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res)=>{
    res.redirect('/lay-tac-ca-dong-tu-bat-quy-tac');
})

app.get('/lay-tac-ca-dong-tu-bat-quy-tac',async(req, res)=>{
    const verbs = await verbsModel.find({});
    res.render('index', {data: verbs})
})

app.get('/tim-kiem', async(req, res) =>{

    const { search } = req.query;
    const dataSearch = await verbsModel.find({
       $or:[
            { name: new RegExp(search, 'i') },
            { past: new RegExp(search, 'i') },
            { participles: new RegExp(search, 'i') },            
       ] 
    })
    res.json({data: dataSearch});
})

app.get('/add-verbs',async (req, res) =>{

    for(var item in verbs)
    {
        const temp = new verbsModel({
            name: item,
            past: verbs[item].past,
            participles: verbs[item].participles,
            frequency: verbs[item].frequency
        })
        const dataSave = await temp.save();
    }
    
})

const port = process.env.PORT || 3000;
// const uri = 'mongodb://khanhney123:123@ds149934.mlab.com:49934/cnpm'
const uri = 'mongodb://localhost/DongTuBQT'
mongoose.connect(uri);
mongoose.connection.once('open', ()=>{
    app.listen(port, ()=> console.log('Server started at port 3000'));
})
