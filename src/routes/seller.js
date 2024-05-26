const seller = require('express').Router()
const Seller = require('../model/Seller')
require('dotenv').config()
const cors = require('cors')
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const express = require('express')
const imgModel = require("../model/img");
const User = require('../model/User')
let alert = require('alert')
const nodemailer = require("nodemailer");

seller.use(cors())
seller.use(express.json());
seller.use(express.urlencoded());
//mongo connection

//mongo render
seller.get('/seller', (req, res) => {
        const isLoggedIn = req.session.isLoggedIn;
        const email = req.session.email;
        const seller = req.session.profile
        if (isLoggedIn && seller==='Seller') {
            // console.log(isLoggedIn)
            // console.log('not logged')
            // console.log(email)
          res.render('seller', { email });
        } else {
            // console.log(isLoggedIn)
            // console.log('not logged')
            // console.log(email)
          res.redirect('/login');
        }
    //     // res.render('home')
      });

      
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
   });

   transporter.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
   });



      seller.get('/interest/:id', (req, res) => {
        const isLoggedIn = req.session.isLoggedIn;
        const email = req.session.email;
        const id=req.params.id;
       
        if (isLoggedIn) {
            
           
                Seller.findOne({_id:id}, function(err,ins){
                    User.findOne({email:ins.email},function(err,items){
                    imgModel.findOne({email:ins.email},function(err,img){
                        global.em=items.email;
                          let mailOptions1 = {
                            from: "test@gmail.com",
                            to: ins.email,
                            subject: "A Buyer is Interested in You!",
                            text: "Buyer name: "+items.firstname+items.lastname+"\nBuyer Contact: "+items.mobile+"\nBuyer email: "+items.email,
                          };
                          
                          transporter.sendMail(mailOptions1, function (err, data) {
                            if (err) {
                              console.log("Error " + err);
                            } else {
                              console.log("Email 1sent successfully");
                              res.json({ status: "Email sent" });
                            }
                          });
                        res.render('interest', { items:items,
                            ins:ins,
                            img:img
                         });
                    })
                })
            })
            User.findOne({email:em},function(err,i){
                let mailOptions = {
                    from: "test@gmail.com",
                    to: em,
                    subject: "Here is your Interested Property Information",
                    text: "Seller name: "+i.firstname+i.lastname+"\nSeller Contact: "+i.mobile+"\nSeller email: "+i.email,
                  };
                  transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                      console.log("Error " + err);
                    } else {
                      console.log("Email sent successfully");
                      res.json({ status: "Email sent" });
                    }
                  });
            })
         
        } else {
            // console.log(isLoggedIn)
            // console.log('not logged')
            // console.log(email)
          res.redirect('/login');
        }
    //     // res.render('home')
      });
    
// seller.get('/seller',(req,res)=>{
//     res.render('seller');
//     // res.send('Hello login')
// })
// seller.get('/user',(req,res)=>{
//     const email= req.session.email;
//     console.log(email)
//     res.render('user')
// })
seller.get('/upload',(req,res)=>{
    res.render('upload')
})

//Image storage to local 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({ storage: storage });

seller.post(
    "/upload",
    upload.single("profile-file"),
    function (req, res, next) {
        const email=req.session.email;
        console.log(JSON.stringify(req.file));
        var obj = {
            img: {
                data: fs.readFileSync(
                    path.join("./uploads/" + req.file.filename)
                ),
                contentType: "image/png",
                email:email,
            },

        };
        imgModel.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Done!");
                res.redirect("/open");
            }
        });
    }
);

seller.get('/upvote/:id', function(req, res) {
    
    const id= req.params.id;
    console.log(id)
    Seller.updateOne({_id:id}, {$inc: {count: 1}}, {new:true}, function(err, count) {
        res.redirect('/open');
    });
});

seller.post("/seller", async(req,res)=>{
    // console.log(req.body.name)
    const email=req.session.email;
    console.log(email);
    const { 
        propname,
        address, 
        bedroom,
        bathroom,
        landmark,
        price,
        desc
}=req.body;
    // const data ={ 
    //     firstname:req.body.firstname, 
    //     lastname:req.body.lastnamename, 
    //     mobile:req.body.mobile,
    //     email:req.body.email,
    //     password : req.body.password}
   
    try {
       let count =0;
      
        const response = await Seller.create({
            propname,
        address, 
        bedroom,
        bathroom,
        landmark,
        price,
        desc,
        email,
        count
        });
        console.log("User created successfully!", response);
       
       
    } catch (error) {
        // if (error.code === 11000) {
        //     return res.json({
        //         status: "error",
        //         error: "Username already exists!",
        //     });
        // }
        throw error;
    }
    res.status(201).render('upload')
    
})

seller.get("/open", (req, res) => {
    
    Seller.find({}, function (err, sell) {
        imgModel.find({}, function (err, items) {
            // for(let i=0;i<sell.length;i++){
            //   console.log(sell[i]._id)
            // }
            res.render("openhouse", {
                sellList: sell,
                items: items,
            });
        });
    });

    // console.log()
});
module.exports = seller;