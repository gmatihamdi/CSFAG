const express = require('express')
const Stagiaire = require('../models/stagiaire')
const router = express.Router()


router.get('/',(req,res)=>{
    Stagiaire.find({},(err,data)=>{
        res.json(data)
    })
})

router.route('/edit/:id').get((req, res) => {
    Stagiaire.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

router.delete('/:id',async(req,res)=>{
    await Stagiaire.findByIdAndDelete(req.params.id)
    res.json({'message':'deleted'})
})



router.post('/',(req,res)=>{
    stagiaire=new Stagiaire({
      cinStagiaire:req.body.cinStagiaire,
      nomStagiaireFr: req.body.nomStagiaireFr,
      nomStagiaireAr: req.body.nomStagiaireAr,
      etatdossier: req.body.etatdossier,
      datenaissanceStag:req.body.datenaissanceStag,
      adressStagiaire: req.body.adressStagiaire,
      telStagiaire: req.body.telStagiaire,
      niveauScolaire: req.body.niveauScolaire,
      emailstagiaire: req.body.emailstagiaire,
      specialiteStagiaire: req.body.specialiteStagiaire,
      groupeStagiaire: req.body.groupeStagiaire,
      codePromotion: req.body.codePromotion,
      codeSection: req.body.codeSection,


    })
    stagiaire.save().then(data => {
      return res.status(200).json(data);
  }).catch(err => {
      console.log(err);
      return res.status(500).json(err);
  })
})   
router.put('/:id',async(req,res)=>{
    await Stagiaire.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})
module.exports=router