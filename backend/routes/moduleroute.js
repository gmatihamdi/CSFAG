const express = require('express')
const Modu = require('../models/module')
const router = express.Router()


router.get('/',(req,res)=>{
    Modu.find({},(err,data)=>{
        res.json(data)
    })
})

router.route('/edit/:id').get((req, res) => {
    Modu.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

router.delete('/:id',async(req,res)=>{
    await Modu.findByIdAndDelete(req.params.id)
    res.json({'message':'deleted'})
})

router.post('/',(req,res)=>{
    Modu=new Modu({
      codeModule:req.body.codeModule,
      libModule:req.body.libModule,
      coifModule:req.body.coifModule,
      seuilModule:req.body.seuilModule,
      niveauModule:req.body.niveauModule,

    })
    Modu.save(()=>{
        res.json(this.Modu)
    })
})
router.put('/:id',async(req,res)=>{
    await Modu.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})

module.exports=router