const express = require('express')
const User = require('../models/client')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const auth = require('../middleware/auth');
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
    user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    user.save(()=>{
        res.json(this.user)
    })
})
router.put('/:id',async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})


router.post('/login',(req,res)=>{
console.log('formulaire login'),
console.log(req.body.name),
console.log(req.body.password),

User.find({ name: req.body.name ,
    password:req.body.password
})
.exec()
.then(User => {
    if(User.length != 0){
        
      const token = jwt.sign({
            name: User.name ,
            password:User.password,
            },
            'secret', {
                expiresIn: "18h"
            }
        );
         res.status(200).json({
            message: "successful",
            token: token   });
            console.log('token backend')
            console.log(token)  

  /*          
var token = jwt.sign({
    name: User.name,
}, config.JWT_SECRET, { expiresIn: '1h' });

res.cookie('token', token).sendStatus(200);       

*/

    }
    else {

        res.status(401).json({
            success: false,
            message: "Invalid Username/Password",
            result: {}
        })
    }
})

})


/* GET Current user token */
router.get('/verify', auth.isAuthenticated, (req, res) => {
	res.sendStatus(200);
    console.log('verif tokennnnnn' )
    console.log(req.headers['x-access-token'] )
})


router.get('/whoami', auth.isAuthenticated, (req, res) => {
	const token =
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token'] ||
		req.cookies.token;

	if (token) {
		let data = jwtdecode(token);
		res.status(200).json({
			success: true,
			message: "Successfully get user name",
			result: data.name
		});
	} else {
		res.status(401).json({
			success: false,
			message: "You are not logged in",
			result: null
		})
	}
})








module.exports=router