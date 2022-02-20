const express = require('express')
const Specialite = require('../models/specialite')
const router = express.Router()


router.get('/',(req,res)=>{
    Specialite.find({},(err,data)=>{
        res.json(data)
    })
})

router.route('/edit/:id').get((req, res) => {
    Specialite.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

router.delete('/:id',async(req,res)=>{
    await Specialite.findByIdAndDelete(req.params.id)
    res.json({'message':'deleted'})
})

router.post('/',async (req,res)=>{

  let  spcexiste= await Specialite.findOne({codeSpecialite:req.body.codeSpecialite });

 // console.log(spcexiste)
  
  
  
  if (spcexiste){
    return res.status(400).send('That user already exisits!');
   
  }
  else{

    specialite=new Specialite({
        codeSpecialite:req.body.codeSpecialite,
        libSpecialite:req.body.libSpecialite,
        libSpecialiteAr:req.body.libSpecialiteAr,
        typeSpecialite:req.body.typeSpecialite,
        dureeSpecialite:req.body.dureeSpecialite,
        diplomeSpecialite:req.body.diplomeSpecialite,


    })
    specialite.save(()=>{
        res.json(this.specialite)
    })
  }
})
router.put('/:id',async(req,res)=>{
    await Specialite.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})
module.exports=router