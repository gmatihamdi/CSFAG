const express = require('express')
const Format = require('../models/formateur')
const router = express.Router()


router.get('/',(req,res)=>{
    Format.find({},(err,data)=>{
        res.json(data)
    })
})

router.route('/edit/:id').get((req, res) => {
    Format.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

router.delete('/:id',async(req,res)=>{
    await Format.findByIdAndDelete(req.params.id)
    res.json({'message':'deleted'})
})



router.post('/',(req,res)=>{
    Formateur=new Format({
      cinFormateur:req.body.cinFormateur,
      nomFormateurFr: req.body.nomFormateurFr,
      nomFormateurAr: req.body.nomFormateurAr,
      sexe: req.body.sexe,
      Lieunaissance: req.body.Lieunaissance,
      etatFormateur: req.body.etatFormateur,
      datenaiFormateur:req.body.datenaiFormateur,
      adressFormateur: req.body.adressFormateur,
      telFormateur: req.body.telFormateur,
      emailFormateur: req.body.emailFormateur,



    })
    Formateur.save().then(data => {
      return res.status(200).json(data);
  }).catch(err => {
      console.log(err);
      return res.status(500).json(err);
  })
})   
router.put('/:id',async(req,res)=>{
    await Format.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})
module.exports=router