const express = require('express')
const Promotion = require('../models/promotion')
const router = express.Router()


router.get('/',(req,res)=>{
    Promotion.find({},(err,data)=>{
        res.json(data)
    })
})
router.route('/edit/:id').get((req, res) => {
    Promotion.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
router.delete('/:id',async(req,res)=>{
    await Promotion.findByIdAndDelete(req.params.id)
    res.json({'message':'deleted'})
})
router.post('/',async(req,res)=>{

  let  promexiste= await Promotion.findOne({codePromotion:req.body.codePromotion });

  // console.log(spcexiste)
   
   
   
   if (promexiste){
     return res.status(400).send('That user already exisits!');
    
   }
   else{

    promotion=new Promotion({
        codePromotion:req.body.codePromotion,
        libPromotionFr:req.body.libPromotionFr,
        libPromotionAr:req.body.libPromotionAr,
        debutPromotion:req.body.debutPromotion,
        finPromotion:req.body.finPromotion,
        capacitePromotion:req.body.capacitePromotion,
    })
    promotion.save(()=>{
        res.json(this.promotion)
    })
  }
})
router.put('/:id',async(req,res)=>{
    await Promotion.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})
module.exports=router