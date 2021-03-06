const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const   helmet = require('helmet')
const product = require("./models/product");
const user = require("./models/user");
//app.use('/', express.static(__dirname + '/CSFAPP'))
mongoose.connect('mongodb://localhost:27017/CSF',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.connection
.once("open",()=>console.log("connected"))
.on("error",error=>{
    console.log("your erreur",error);
});
const port = process.env.PORT | 80
app.use(express.json())
app.use(cors())
//app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(logger('dev'))
app.use(helmet())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
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
app.use('/formateur',require('./routes/Formateurroute'))

app.use('/', require('./routes/index'))
app.use('/utilis', require('./routes/users'))
app.use('/todo', require('./routes/todos'))
/******test login */




/** fin test*/


app.listen(port)


	/******test login */

