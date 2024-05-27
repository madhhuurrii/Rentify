const login = require('express').Router();
const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../model/User')
require('dotenv').config()
const Seller = require('../model/Seller')
const cors = require('cors')
// const session = require('express-session')
const imgModel = require("../model/img");

login.use(cors())
login.use(express.json());



global.isLoggedIn=false;

login.get('/register',(req,res)=>{
    res.render('register');
    // res.send('Hello login')
})
login.get('/login',(req,res)=>{
    loggedin=true;
    // console.log(req.body.email)
    res.render('login')
})



login.post('/login', async(req,res)=>{
        const {email , profile, password:plainTextPassword}= req.body;
        req.session.isLoggedIn = true;
        req.session.email = email;
        req.session.profile=profile;
        // console.log(email);
        isLoggedIn=true;
        const checking = await User.findOne({ email: email })
        //  console.log(checking.password)
        //  console.log(req.body.password)
         bcrypt.compare(req.body.password, checking.password, (err, result) => {
            if(result){
                // console.log(checking)
            
           
                res.status(201).render('home')
            }
            else{

                console.log('Incoorect')
                // res.redirect('/login');
                return;
            }
            
    
    })
   
        // console.log('Wrong Details')
        // res.send('worng details')
    
})


// login.get('/', (req, res) => {
//     const isLoggedIn = req.session.isLoggedIn;
//     const email = req.session.email;
    
//     if (isLoggedIn) {
//         // console.log(isLoggedIn)
//         // console.log('not logged')
//         // console.log(email)
//       res.render('home', { email });
//     } else {
//         // console.log(isLoggedIn)
//         // console.log('not logged')
//         // console.log(email)
//       res.redirect('/login');
//     }
//     // res.render('home')
//   });


login.get('/logout', (req, res) => {
    req.session.isLoggedIn=false;
    isLoggedIn=false;
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
  });

  

login.post('/up/:id',async(req,res)=>{
        const id=req.params.id;
        const email=req.session.email;
    console.log(id);
    const { 
        propname,
        address, 
        bedroom,
        bathroom,
        landmark,
        price,
        count,
        desc
}=req.body;
try {
    
   
     const response = await Seller.findOneAndUpdate({_id:id},{
         propname,
     address, 
     bedroom,
     bathroom,
     landmark,
     price,
     desc,
     count,
     email,
     count
     },{new:true});
     console.log("User updated successfully!", response);
    
    
 } catch (error) {
     // if (error.code === 11000) {
     //     return res.json({
     //         status: "error",
     //         error: "Username already exists!",
     //     });
     // }
     throw error;
 }
 res.status(201).render('home')  
})

login.post("/register",  async(req,res)=>{
     console.log(req.body.profile)
    const { 
        firstname,
        lastname, 
        mobile,
        email,
        profile,
        password :plainTextPassword}=req.body;
    // const data ={ 
    //     firstname:req.body.firstname, 
    //     lastname:req.body.lastnamename, 
    //     mobile:req.body.mobile,
    //     email:req.body.email,
    //     password : req.body.password}
        
    if (!email || typeof email !== "string") {
        return res.json({ status: "error", error: "Invalid Email" });
    }
    if (!plainTextPassword || typeof email !== "string") {
        return res.json({ status: "error", error: "Invalid Password" });
    }
    if (plainTextPassword.length < 5) {
        return res.json({ status: "error", error: "Passowrd too small" });
    }
    const checking =await User.findOne({email:req.body.email})
    const password = await bcrypt.hash(plainTextPassword, 10);
    try {
    //    if(checking.email!=NULL){
    //     if(checking.email === req.body.email){
    //         console.log('User details already exists')
    //        //  alert('user Exists!')
    //        return res.json({
    //            status: "error",
    //            error: "Username already exists!",
    //        });
    //       }
    //    }
    //    else{
        const response = await User.create({
            firstname,
            lastname, 
            mobile,
            email,
            profile,
            password   
        });
        console.log("User created successfully!", response);
    //    }
    } catch (error) {
        if (error.code === 11000) {
            return res.json({
                status: "error",
                error: "Username already exists!",
            });
        }
        throw error;
    }
    res.json({ status: "ok" });
})
module.exports = login;