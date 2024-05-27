const user = require('express').Router()
const Seller =require('../model/Seller')
const User = require('../model/User')
const imgModel = require('../model/img')

user.get('/',(req,res)=>{
    res.render('home')
})

user.get('/user',(req,res)=>{
    const isLoggedIn = req.session.isLoggedIn;
    const email = req.session.email;
    console.log(isLoggedIn)
    if (isLoggedIn) {
        // console.log(isLoggedIn)
        // console.log('not logged')
        console.log(email)
        
        User.find({email:email},function(err,use){
          Seller.find({email:email}, function (err, sell) {
            imgModel.find({}, function (err, items) {
                // for(let i=0;i<sell.length;i++){
                //   console.log(sell[i])
                // }
                // console.log(items)
                res.render("user", {
                   useList:use,
                    sellList: sell,
                    items: items,
                });
            });
            // console.log(use[0].firstname)
            //  res.render("user",{useList:use});
        })
      // res.render('user', { email });
        })} else {
        // console.log(isLoggedIn)
        // console.log('not logged')
        // console.log(email)
      res.redirect('/login');
    }
})



user.get('/delete/:id/:idf', async(req,res)=>{
    const id=req.params.id;
    const idf=req.params.idf;
    Seller.findOneAndDelete({_id:idf},function(err,ek){
     imgModel.findOneAndDelete({_id:id},function(err,ek1){
         res.redirect('/user')
     })
    })
    
})
user.get('/update/:id', async(req,res)=>{
 const id=req.params.id;
 const email=req.session.email;

 Seller.findOne({_id:id},function(err,ek){
     console.log(ek);
   
  res.render('up',{ek:ek,id:id})
 })
})

module.exports=user;