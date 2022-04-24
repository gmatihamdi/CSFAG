const express = require('express')
const User = require('../models/client')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const auth = require('../middleware/auth');
const { token } = require('morgan');
config = require('../config');
router.get('/',(req,res)=>{
    User.find({},(err,data)=>{
        res.json(data)
      
    })
})

router.route('/edit/:id').get((req, res) => {
    User.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }

    })
  })

router.delete('/:id',async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.json({'message':'deleted'})
})

router.post('/',(req,res)=>{
    console.log(req.body.role)
    user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    })
    user.save(()=>{
        res.json(this.user)
    })
})
router.put('/:id',async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})


router.post('/login',async(req,res)=>{
    let roleuser='';

    const datauser = await User.find({ name: req.body.name ,password:req.body.password });   
    
    console.log(datauser.role)

    if(datauser.length != 0){       
      const token = jwt.sign({         
            name: datauser.name ,
            password:datauser.password,         
            },
            'secret', {
                expiresIn: "18h"
            }
        );

for(i=0;i<datauser.length;i++){

 roleuser=datauser[i].role
}
console.log('roleuser')
console.log(roleuser)


         res.status(200).json({
            message: "successful",
            token: token ,
            data:roleuser,
          });
          console.log(token)

    }
    else {
        res.status(401).json({
            success: false,
            message: "Invalid Username/Password",
            result: {}
        })
    }

  

})


/* GET Current user token */

module.exports=router