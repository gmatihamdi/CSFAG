const express = require('express')
const Note = require('../models/note')
const router = express.Router()
const mongoose = require('mongoose')

_id: new mongoose.Types.ObjectId(),

router.get('/', (req, res) => {
  Note.find({})
  .populate([
       
    {
    path: 'stagiaireNote',
    model: 'Stagiaire'
},
 {
    path: 'moduleNote',
    model: 'Matiere'
}])
  
  
.exec(function (err, data) {
    res.json(data)
  })
})



router.route('/edit/:id').get((req, res,next) => {
  Note.findById({_id:req.params.id}) .populate([
       
    {
    path: 'stagiaireNote',
    model: 'Stagiaire'
},
 {
    path: 'moduleNote',
    model: 'Matiere'
}])
  
  
.exec(function (err, data) {
    res.json(data)
  })
})




router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.json({ 'message': 'deleted' })
})

router.post('/', (req, res) => {
  console.log('testooo');
  console.log(req.body);


  req.body.listenotestag.forEach(x => {
    notte = new Note({
      noteexam:x.note,
      stagiaireNote: x.cin,
      moduleNote: req.body.moduleNote,
      FormateurNote: req.body.FormateurNote,
    })

    notte.save(() => {
      console.log('inserted');
    })
  })

  res.json({'status':'ok'})
  
})
router.put('/:id', async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, req.body)
  res.json({ 'message': 'updated' })
})
module.exports = router