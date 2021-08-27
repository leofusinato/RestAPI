let express = require('express');
let routes = express.Router();
let NeDB = require('nedb');

let db = new NeDB({
    filename: './bd/contatos.db',
    autoload: true
});

routes.get('/contatos/:nome', (req, res) => {
    db.findOne({ nome: req.params.nome }).sort({}).exec((err, contato) => {
        if (contato) {
            res.json({ contato });
        } else {
            res.end('Contato não encontrado');
        }
    }
    )
})

routes.get('/contatos/user/:id', (req, res) => {
    db.find({ usuario: req.params.id }).sort({}).exec((err, contatos) => {
        if (contatos) {
            res.json({ contatos });
        } else {
            res.end('Contato não encontrado');
        }
    }
    )
})

routes.get('/contatos/id/:id', (req, res) => {
    db.findOne({ _id: req.params.id }).sort({}).exec((err, contato) => {
        if (contato) {
            res.json({ contato });
        } else {
            res.end('Contato não encontrado');
        }
    }
    )
})

routes.get('/contatos', (req, res) => {
    db.find({}).sort({ nome: 1 }).exec(
        (err, contatos) => {
            if (err) {
                res.status(400).json({ error: err })
            } else {
                res.json({ contatos });
            }
        }
    )
});

routes.delete('/contatos/:id', (req, res) => {
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

routes.post('/contatos', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    db.insert(req.body, (err, contato) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.status(200).json(contato);
        }
    })
})

routes.put('/contatos/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    db.update({ _id: req.params.id }, req.body, (err, contato) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.status(200).json(req.body);
        }
    })
})

module.exports = routes;