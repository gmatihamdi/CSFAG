const express = require('express')


const Stag = require('../models/stagiaire')
const Note = require('../models/note')
const Modu = require('../models/module')
const Sect = require('../models/section')
const Competence = require('../models/competence')
const Groupe = require('../models/groupe')




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
                        if ((listnote[i].moduleNote._id.equals(codeMat)) && ((listnote[i].stagiaireNote.codeSection) === (codeSect))) {
                            listnotefiltre.push(

                                listnote[i].toObject()
                            )

                        }

                    }
                    console.log('--------');
                    for (i = 0; i < listnote.length; i++) {
                        console.log(listnote[i].stagiaireNote.codeSection)

                    }
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
    const etat = 'Accepter';
    const groupe = req.body.y;
    console.log(codeSect);
    console.log(groupe);
    try {
        Stag.find({
            codeSection: req.body.x,
            groupeStagiaire: req.body.y, etatdossier: etat
        })
            .populate([
                {
                    path: 'codePromotion',
                    model: 'Promotion'
                },
                {
                    path: 'codeSection',
                    model: 'Section'
                }


            ]).exec(function (err, data) {
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
    const etat = 'Diplômé';
    const groupe = req.body.y;
    console.log(codeSect);
    console.log(groupe);
    try {
        Stag.find({
            codeSection: req.body.x,
            groupeStagiaire: req.body.y, etatdossier: etat
        })
            .populate([
            ]).exec(function (err, data) {
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
        Stag.find({
            codeSection: req.body.x,
            etatdossier: req.body.y
        })
            .populate([
            ]).exec(function (err, data) {
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


router.post('/filtresection', (req, res) => {
    const codeSect = req.body.x;

    try {
        Sect.find({ codePromotion: req.body.x })
            .populate([
                {
                    path: 'codePromotion',
                    model: 'Promotion'
                }
            ]).exec(function (err, data) {
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


router.post('/filtrecompetence', (req, res) => {
    const codeSect = req.body.x;

    try {
        Competence.find({ codeSection: req.body.x })
            .populate([
                {
                    path: 'codeSection',
                    model: 'Section'
                },
                {
                    path: 'codeMatiere',
                    model: 'Matiere'
                }
            ]).exec(function (err, data) {
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

router.post('/filtrepromotion', (req, res) => {
    const codeSect = req.body.x;

    try {
        Sect.find({ codeSection: req.body.x })
            .populate([
                {
                    path: 'codePromotion',
                    model: 'Promotion'
                }
            ]).exec(function (err, data) {
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


router.post('/filtregroup', (req, res) => {

    try {
        Groupe.find({ codePromotion: req.body.x })
            .populate([
                {
                    path: 'codeSection',
                    model: 'Section'
                }
            ]).exec(function (err, data) {
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




router.post('/filtrestatistique', (req, res) => {
    const codeSect = req.body.x;
    const liststag = [];
    var encours = 0;
    var diplomé = 0;
    var h = 0;
    var f = 0;
    var hp = 0;
    var fp = 0;
    var leng = 0;
    console.log(codeSect);

    try {
        Stag.find({ codeSection: req.body.x })
            .populate([
            ]).then(data => {
                data.map((stagiare) => {
                    liststag.push(stagiare);
                })
                console.log(liststag)
                for (i = 0; i < liststag.length; i++) {
                    if (liststag[i].etatdossier == 'Accepter') {
                        encours = i + 1;

                    }
                }
                for (i = 0; i < liststag.length; i++) {
                    if (liststag[i].etatdossier == 'Diplômé') {
                        diplomé = i + 1;

                    }
                }
                for (i = 0; i < liststag.length; i++) {
                    if (liststag[i].sexe == 'Homme') {
                        h = i + 1;

                    }
                }
                for (i = 0; i < liststag.length; i++) {
                    if (liststag[i].sexe == 'Femme') {
                        f = i + 1;

                    }
                }
                leng = liststag.length;
                console.log(encours)
                console.log(diplomé)
                console.log(liststag.length)
                hp = (parseFloat(h) / parseFloat(leng)) * 100
                //fp=(parseFloat(f)/parseFloat(leng))*100
                fp = (f / leng) * 100
                console.log(hp)
                console.log(fp)

                //res.send(200, data);

                res.status(200).json({
                    message: 'ok',
                    data: encours,
                    data1: diplomé,
                    data2: h,
                    data3: f,
                    data4: data,



                });

                //  console.log(data);
                // console.log(data1);
            })
    }
    catch (e) {
        console.log(e);
    }
})





module.exports = router