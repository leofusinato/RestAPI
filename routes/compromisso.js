let express = require('express');
let routes = express.Router();
let NeDB = require('nedb');

let db = new NeDB({
    filename: './bd/compromissos.db',
    autoload: true
});

routes.post('/compromissos', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    db.insert(req.body, (err, compromisso) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.status(200).json(compromisso);
        }
    })
})

routes.get('/compromissos', (req, res) => {
    db.find({}).sort({ descricao: 1 }).exec(
        (err, compromissos) => {
            if (err) {
                res.status(400).json({ error: err })
            } else {
                res.json({ compromissos });
            }
        }
    )
});

routes.get('/compromissos/:idcontato', (req, res) => {
    db.findOne({ idcontato: req.params.idcontato }).sort({}).exec((err, compromisso) => {
        if (compromisso) {
            res.json({ compromisso });
        } else {
            res.end('Compromisso não encontrado');
        }
    }
    )
})    

routes.get('/compromissos/data/:data1&:data2', (req, res) => {    
    db.find({ $and: [{data: {$gte: req.params.data1}}, {data: {$lte: req.params.data2}}] }).sort({}).exec((err, compromisso) => {
        if (compromisso) {
            res.json({ compromisso });
        } else {
            res.end('Compromisso não encontrado');
        }
    }
    )
})

routes.delete('/compromissos/:id', (req, res) => {
    db.remove({ _id: req.params.id },
        (err, n) => {
            if (err) {
                res.status(500).json({ error: err })
            } else {
                res.status(200).json({ deleted: n });
            }
        }
    )
});

module.exports = routes;