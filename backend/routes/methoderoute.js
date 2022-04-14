const express = require('express')


const Stag = require('../models/stagiaire')
const Note = require('../models/note')
const Modu = require('../models/module')
const Sect = require('../models/section')
const Competence = require('../models/competence')
const note = require('../models/note')
const groupe = require('../models/groupe')
const competence = require('../models/competence')
const Mat = require('../models/matiere')


const router = express.Router()
router.post('/', (req, res) => {
    Stag.find({
        codeSection: req.body.x, groupeStagiaire: req.body.y
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
        Stag.findById({ _id: req.body.x }).populate([
            {
                path: 'codePromotion',
                model: 'Promotion'
            },
            {
                path: 'codeSection',
                model: 'Section'
            }


        ])
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
                                        console.log('listnote noteexam')
                                        listnote.forEach((element, index) => {
                                            console.log(element.noteexam)
                                        })
                                        let listFinalNotes = [];
                                        for (i = 0; i < listecompetence.length; i++) {
                                            //   for (j = 0; j < listnote.length; j++) {  

                                            const existanceIdx = listnote.find(x => x.moduleNote._id.equals(listecompetence[i]._id));
                                            console.log('existanceIdx')
                                            console.log(existanceIdx)
                                            if (existanceIdx) {
                                                listnote.forEach((element, index) => {
                                                    if (element.moduleNote._id.equals(listecompetence[i]._id)) {
                                                        listFinalNotes.push(
                                                            {
                                                                notefinale: element.noteexam,
                                                                ...listecompetence[i].toObject()
                                                            })
                                                        somme = parseFloat(somme) + parseFloat(element.noteexam);
                                                    }
                                                })
                                            }

                                            else {
                                                listFinalNotes.push(
                                                    {
                                                        notefinale: 0,
                                                        ...listecompetence[i].toObject()
                                                    }
                                                );
                                            }

                                        }

                                        for (i = 0; i < listnote.length; i++) {

                                            if (listnote[i].noteresult === 'non acquise') {
                                                resultat = "Refusé";


                                            }
                                            else {

                                                resultat = "Réussite";

                                            }

                                        }


                                        /****** */
                                        var lengthcmp = listecompetence.length;
                                        moyenne = parseFloat(somme) / parseFloat(lengthcmp);
                                        console.log("listFinalNotes")
                                        console.log(listFinalNotes)
                                        /*   console.log("listFinalNotes")
                                        console.log(moyenne)
                                        console.log(somme)
                                        console.log(resultat)*/

                                        res.status(200).json({
                                            message: 'ok',
                                            data: listFinalNotes,
                                            data1: dataStag.toObject(),
                                            data2: moyenne,
                                            data3: resultat
                                        })
                                    });
                        })

            })
    }
    catch (e) {
        console.log(e);
    }
})






router.post('/getdetails', (req, res) => {

    let sectionstag = " ";
    Stag.findById({ _id: req.body.x }).populate([
        {
            path: 'codePromotion',
            model: 'Promotion'
        },
        {
            path: 'codeSection',
            model: 'Section'
        }
    ])
        .then(dataStag => {
            [dataStag].map(function (stagiare) {
                sectionstag = stagiare.codeSection._id
                return sectionstag;
            });


            Sect.findById({ _id: sectionstag }).populate([
                {
                    path: 'codeSpecialite',
                    model: 'Specialite'
                }
            ])
                .exec(function (err, data) {
                    res.json(data)
                    console.log("code section details")
                    console.log(sectionstag)
                    console.log("details")
                    console.log(data)
                })



        })





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

router.post('/getsection', (req, res) => {
    Sect.find({
        codePromotion: req.body.x
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
            console.log('success generate List des section');
        });

})

router.post('/getmatieres', (req, res) => {
    console.log('recherce matiere');
    console.log(req.body.x)
    Mat.find({ specialiteMatiere: req.body.x })
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
            console.log('success generate List des section');
        });

})







router.post('/getcompetence', (req, res) => {
    competence.find({
        codeSection: req.body.x
    }).populate([{
        path: 'codeMatiere',
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
            console.log(req.body.x);
            console.log('success generate List des groupes');
        });

})

router.post('/printstag/:id', (req, res) => {

    let sectionstag = " ";
    Stag.findById({ _id: req.params.id }).populate([
        {
            path: 'codePromotion',
            model: 'Promotion'
        },
        {
            path: 'codeSection',
            model: 'Section'
        }
    ])
        .exec(function (err, data) {
            res.json(data)



        })





})


router.post('/getresultat',async (req, res) => {
    var listnote = [];
    var lnote = [];
    let listresultstag = [];
    var moyenne = 0;
    let idstag = " ";
    let resultat = " ";
    let echec='non acquise'
    try {
        
        const dataStag=await Stag.find({ codeSection: req.body.x }).populate([
            {
                path: 'codePromotion',
                model: 'Promotion'
            },
            {
                path: 'codeSection',
                model: 'Section'
            }
        ]);


        const datacompt= await  Competence.find({ codeSection: req.body.x  })   

        console.log('datacompt.length')
console.log(datacompt.length)



if (dataStag ){
            for (i = 0; i < dataStag.length; i++) {
                idstag = dataStag[i]._id
             console.log(idstag)


             datanote=await Note.find({ stagiaireNote: idstag })
             .populate([
                 {
                     path: 'stagiaireNote',
                     model: 'Stagiaire'
                 },
                 {
                     path: 'moduleNote',
                     model: 'Matiere'
                 }])



                 if (datanote.length === datacompt.length ){
//arry.some--- condition



                                if (datanote.some(e => e.noteresult === 'non acquise')) {
                                    resultat = "Refusé";
                                }
                                else {
                                    resultat = "Réussite";
                                }
                            
                        }
                        else{
                            resultat = "Refusé";

                        }
                            listresultstag.push(
                                {
                                    res: resultat,
                                    ...dataStag[i].toObject()
                                }
                            );
                            // console.log(resultat)
                            console.log('resultat')
                            console.log(resultat)
            }
        }
           // console.log('resultat')
           // console.log(listresultstag);
            res.json({
                message: 'ok',
                data1: listresultstag,
                data2: moyenne,
                data3: resultat
            })


        
    }
    catch (e) {
        console.log(e);
    }
})




router.post('/getresult', (req, res) => {


    Stag.find({ codeSection: req.body.x }).populate([
        {
            path: 'codePromotion',
            model: 'Promotion'
        },
        {
            path: 'codeSection',
            model: 'Section'
        }
    ]).then(dataStag => {
        [dataStag].map(function (stagiare) {
            /*  sectionstag = stagiare.codeSection._id
              return sectionstag;*/
        });

    })


})

router.post('/getSeuilMatiere', (req, res) => {
    console.log('req.body.x')
    console.log(req.body.x)
    Mat.findById({ _id: req.body.x })
        .exec(function (err, data) {
            res.json(data)
            console.log('getSeuilMatiere')
            console.log(data)

        })



})




module.exports = router