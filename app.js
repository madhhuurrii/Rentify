const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000;
const login = require('./src/routes/login')
const seller = require('./src/routes/seller')
const cors = require('cors');
const session = require('express-session')
const mongoose = require('mongoose')


//routing public folder
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// for ejs
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.get('/',(req,res)=>{
//     res.send('Hello World to Rentify');
// })
mongoose.connect(process.env.MONGO_PROD_URI,{
    // userNewUrlParser: true,
   useUnifiedTopology: true
}).then(()=> console.log('DB Connected Successfully!'))
.catch((err)=> console.log(err))
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    proxy: true,
    resave: true,
    cookie: { maxAge: 60*10000*200*10, secure: false, },
  }));


global.loggedin=false;
app.use('/',login)
app.use('/',seller)

app.get('/',(req,res)=>{
    res.render('home');
})



  
app.listen(PORT,()=>{
    console.log(`App is running at 8000`)
})
