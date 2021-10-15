const express = require('express')
const User = require('../models/client')
const router = express.Router()


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

module.exports=router