const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000;
const login = require('./src/routes/login')
const seller = require('./src/routes/seller')
const user = require('./src/routes/user')
const cors = require('cors');
const session = require('express-session')
const mongoose = require('mongoose')


//routing public folder
app.use(express.static(__dirname + '/public'));


// for ejs
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
// app.get('/',(req,res)=>{
//     res.send('Hello World to Rentify');
// })

// Mongoose Connection
mongoose.connect(process.env.MONGO_PROD_URI,{
    // userNewUrlParser: true,
   useUnifiedTopology: true
}).then(()=> console.log('DB Connected Successfully!'))
.catch((err)=> console.log(err))

// session-initialization
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    proxy: true,
    resave: true,
    cookie: { maxAge: 60*10000*200*10, secure: false, },
  }));


global.loggedin=false;

// routing
app.use('/',login)
app.use('/',seller)
app.use('/',user)



  
app.listen(PORT,()=>{
    console.log(`App is running at 8000`)
})
