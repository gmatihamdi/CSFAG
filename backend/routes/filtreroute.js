const express = require('express')


const Stag = require('../models/stagiaire')
const Note = require('../models/note')
const Modu = require('../models/module')
const Sect = require('../models/section')
const Competence = require('../models/competence')





const router = express.Router()

router.post('/filtrenote', (req, res) => {
    const codeSect = req.body.x;
    const codeMat = req.body.y;
    let sectionstag = " ";
    var listnotefiltre = [];
    var listnote = [];

    console.log(codeSect);
    console.log(codeMat);
    try {
        Note.find({
        })
            .populate([
                {
                    path: 'stagiaireNote',
                    model: 'Stagiaire'
                },
                {
                    path: 'moduleNote',
                    model: 'Matiere'
                }]).then(datanote => {
                    datanote.map((note) => {
                        listnote.push(note);
                    })
                    for (i = 0; i < listnote.length; i++) {
                        if ((listnote[i].moduleNote._id.equals(codeMat))&&((listnote[i].stagiaireNote.codeSection)===(codeSect)) ){
                            listnotefiltre.push(
                                
                                    listnote[i].toObject()
                                )

                        }
                        
                    /*    else {
                            listnotefiltre.push(
                                {

                                    
                                }
                            );
                        }*/
                    
                    }
                        console.log('--------');
                        for (i = 0; i < listnote.length; i++) {
                            console.log(listnote[i].stagiaireNote.codeSection)
                        
                        }
                       // console.log(listnotefiltre);


                        res.status(200).json({
                            message: 'ok',
                            data: listnotefiltre,

                        });
                    
                });
    }
    catch (e) {
        console.log(e);
    }
})


router.post('/filtrestagiare', (req, res) => {
    const codeSect = req.body.x;
    const etat='Accepter';
    const groupe = req.body.y;
    console.log(codeSect);
    console.log(groupe);
    try {
        Stag.find({codeSection: req.body.x , 
            groupeStagiaire: req.body.y  , etatdossier: etat })
            .populate([
             ]) .exec(function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('error returned');
                    res.send(500, { error: 'Failed ' });
                }
                if (!data) {
                    res.send(403, { error: 'chargement Failed' });
                }
                //res.send(200, data);
                console.log(data);
                res.json(data)
                console.log('success generate List');
            });
    }
    catch (e) {
        console.log(e);
    }
})

router.post('/filtrestagiaredip', (req, res) => {
    const codeSect = req.body.x;
    const etat='Diplômé';
    const groupe = req.body.y;
    console.log(codeSect);
    console.log(groupe);
    try {
        Stag.find({codeSection: req.body.x , 
            groupeStagiaire: req.body.y  , etatdossier: etat })
            .populate([
             ]) .exec(function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('error returned');
                    res.send(500, { error: 'Failed ' });
                }
                if (!data) {
                    res.send(403, { error: 'chargement Failed' });
                }
                //res.send(200, data);
                console.log(data);
                res.json(data)
                console.log('success generate List');
            });
    }
    catch (e) {
        console.log(e);
    }
})







router.post('/filtrestagiaretat', (req, res) => {
    const codeSect = req.body.x;
    const groupe = req.body.y;
    console.log(codeSect);
    console.log(groupe);
    try {
        Stag.find({codeSection: req.body.x , 
            etatdossier: req.body.y })
            .populate([
             ]) .exec(function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('error returned');
                    res.send(500, { error: 'Failed ' });
                }
                if (!data) {
                    res.send(403, { error: 'chargement Failed' });
                }
                //res.send(200, data);
                console.log(data);
                res.json(data)
                console.log('success generate List');
            });
    }
    catch (e) {
        console.log(e);
    }
})






module.exports = router