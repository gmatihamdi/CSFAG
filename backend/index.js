const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const path = require('path');

//app.use('/', express.static(__dirname + '/CSFAPP'))
const DB_URL = process.env.DB_URL || 'mongodb+srv://admin:admin@cluster0.j3aqm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(DB_URL ,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.connection
.once("open",()=>console.log("connected"))
.on("error",error=>{
    console.log("your erreur",error);
});
const port = process.env.PORT | 80
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/api',require('./routes/clientrout'))
app.use('/spc',require('./routes/specialiterout'))
app.use('/md',require('./routes/moduleroute'))
app.use('/mat',require('./routes/matiereroute'))
app.use('/stag',require('./routes/stagiaireroute'))
app.use('/note',require('./routes/noteroute'))
app.use('/methode',require('./routes/methoderoute'))
app.use('/prom',require('./routes/promotionroute'))
app.use('/sect',require('./routes/sectionroute'))
app.use('/compet',require('./routes/competenceroute'))
app.use('/filtre',require('./routes/filtreroute'))
app.use('/groupe',require('./routes/grouperoute'))

app.listen(port)


	