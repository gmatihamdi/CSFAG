const express = require('express')
const Groupe = require('../models/groupe')
const router = express.Router()


router.get('/',(req,res)=>{
    Groupe.find({})
    .populate([         
/*{
      path: 'codePromotion',
      model: 'Promotion'
  },
  {
    path: 'codeSection',
    model: 'Section'
  }
*/
]) 
  .exec(function (err, data) {
      res.json(data)
    })
  })

router.route('/edit/:id').get((req, res) => {
    Groupe.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

router.delete('/:id',async(req,res)=>{
    await Groupe.findByIdAndDelete(req.params.id)
    res.json({'message':'deleted'})
})

router.post('/',(req,res)=>{
    groupe=new Groupe({
        codeGroupe:req.body.codeGroupe,
        codeSection:req.body.codeSection,
        codePromotion:req.body.codePromotion,
  

    })
    groupe.save(()=>{
        res.json(this.section)
    })
})
router.put('/:id',async(req,res)=>{
    await Groupe.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})
module.exports=router