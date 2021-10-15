const express = require('express')
const Section = require('../models/section')
const router = express.Router()


router.get('/',(req,res)=>{
  Section.find({})
    .populate([
         
      {
      path: 'codePromotion',
      model: 'Promotion'
  },
   {
      path: 'codeSpecialite',
      model: 'Specialite'
  }])
    
    
  .exec(function (err, data) {
      res.json(data)
    })
  })

router.route('/edit/:id').get((req, res) => {
    Section.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

router.delete('/:id',async(req,res)=>{
    await Section.findByIdAndDelete(req.params.id)
    res.json({'message':'deleted'})
})

router.post('/',(req,res)=>{
    section=new Section({
        codeSection:req.body.codeSection,
        codePromotion:req.body.codePromotion,
        libSection:req.body.libSection,
        codeSpecialite:req.body.codeSpecialite,
        debutSection:req.body.debutSection,
        finSection:req.body.finSection,
        codeDiplome:req.body.codeDiplome,
        groupeSection:req.body.groupeSection,



    })
    section.save(()=>{
        res.json(this.section)
    })
})
router.put('/:id',async(req,res)=>{
    await Section.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})
module.exports=router