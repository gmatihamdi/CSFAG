const express = require('express')


const Stag = require('../models/stagiaire')
const Note = require('../models/note')
const Modu = require('../models/module')
const Sect = require('../models/section')
const Competence = require('../models/competence')
const note = require('../models/note')
const groupe=require('../models/groupe')



const router = express.Router()
router.post('/', (req, res) => {
    Stag.find({
        specialiteStagiaire: req.body.x, groupeStagiaire: req.body.y
    })
        .exec(function (err, data) {
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
})



router.post('/getlist', (req, res) => {


    Note.find({
        stagiaireNote: req.body.x
    })

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
})





router.post('/getrelevnote', (req, res) => {
    const z = req.body.x;
    let sectionstag = " ";
    var listecompetence = [];
    var listnote = [];
    let lib = " ";
    var moyenne = 0;
    var somme = 0;
    let resultat = " ";
    try {
        Stag.findById({ _id:req.body.x }).populate([
            {
                path: 'codePromotion',
                model: 'Promotion'
            },
            {
                path: 'codeSection',
                model: 'Section'
            }])
            .then(dataStag => {
                [dataStag].map(function (stagiare) {
                    sectionstag = stagiare.codeSection._id
                    return sectionstag;
                });
                console.log('code section')
                Competence.find({ codeSection: sectionstag })
                    .populate([
                        {
                            path: 'codePromotion',
                            model: 'Promotion'
                        },
                        {
                            path: 'codeSection',
                            model: 'Section'
                        },
                        {
                            path: 'codeMatiere',
                            model: 'Matiere'
                        }]).then(dataComp => {
                            dataComp.map((competence) => {
                                lib = competence.codeMatiere.libMatiere;
                                listecompetence.push(competence.codeMatiere);
                            })
                            Note.find({
                                stagiaireNote: req.body.x
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
                                        let listFinalNotes = [];
                                        for (j = 0; j < listnote.length; j++) {
                                            for (i = 0; i < listecompetence.length; i++) {
                                                if (listnote[j].moduleNote._id.equals(listecompetence[i]._id)) {
                                                    listFinalNotes.push(
                                                        {
                                                            notefinale: listnote[j].noteexam,
                                                            ...listecompetence[i].toObject()
                                                        })
                                                    somme = parseFloat(somme) + parseFloat(listnote[j].noteexam);
                                                } else {
                                                    listFinalNotes.push(
                                                        {
                                                            notefinale: 0,
                                                            ...listecompetence[i].toObject()
                                                        }
                                                    );
                                                }

                                            }
                                        }
                                        /*   listecompetence.forEach((element, index)=>{
                                           const existanceIdx = listnote.findIndex(x =>x.moduleNote._id .equals(element._id));
                                           if (existanceIdx>-1){
                                               //listFinalNotes.push(listnote[existanceIdx]);     
                                                    
                                               listFinalNotes.push(
                                                   {
                                                       notefinale:listnote.noteexam, 
                                                   ...element
                                                   }
                                               );
                                           }else{
                                              listFinalNotes.push(
                                                   {
                                                       notefinale:0, 
                                                   ...element.toObject()
                                                   }
                                               );              
                                           }
                                           })*/
                                           for (j = 0; j < listnote.length; j++) {
                                            for (i = 0; i < listecompetence.length; i++) {
                                                if ((listnote[j].moduleNote._id.equals(listecompetence[i]._id)) && (listnote[j].noteexam < dataComp[i].codeMatiere.seuilMatiere)) {
                                                
                                                    resultat = " Réussite";
                                                } else {
                                                 
                                                    resultat = " Refusé";
                                                }

                                            }
                                        }

                                           /****** */
                                        var lengthcmp = listecompetence.length;
                                        moyenne = parseFloat(somme) / parseFloat(lengthcmp);
                                        console.log("listFinalNotes")
                                        console.log(moyenne)
                                        console.log(somme)
                                        console.log(resultat)

                                        res.status(200).json({
                                            message: 'ok',
                                            data: listFinalNotes,
                                            data1: dataStag.toObject(),
                                            data2: moyenne,
                                            data3:resultat
                                        })
                                    });
                        })
            })
    }
    catch (e) {
        console.log(e);
    }
})
router.post('/getgroup', (req, res) => {
    groupe.find({
        codeSection: req.body.x
    })
        .exec(function (err, data) {
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
            console.log(req.body.x);
            console.log('success generate List des groupes');
        });
        
})

module.exports = router