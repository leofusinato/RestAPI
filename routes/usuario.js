let express = require('express');
let routes = express.Router();
let NeDB = require('nedb');

let db = new NeDB({
    filename: './bd/usuarios.db',
    autoload: true
});

routes.get('/usuarios', (req, res) => {
    db.find({}).sort({ username: 1 }).exec(
        (err, usuarios) => {
            if (err) {
                res.status(400).json({ error: err })
            } else {
                res.json({ usuarios });
            }
        }
    )
});

routes.get('/usuarios/:id', (req, res) => {
    db.findOne({
        _id: req.params.id
    }).sort({}).exec((err, usuario) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            if (usuario) {
                res.json({ usuario });
            } else {
                res.end('Usuário não encontrado');
            }
        }
    }
    )
})

routes.post('/usuarios', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    db.insert(req.body, (err, usuario) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.status(200).json(usuario);
        }
    })
})

routes.post('/login', (req, res) => {
    db.findOne({
        username: req.body.username, senha: req.body.senha
    }).sort({}).exec((err, usuario) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            if (usuario) {
                res.json({ usuario });
            } else {
                res.end('Usuário não encontrado');
            }
        }
    }
    )
})

routes.put('/usuarios/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    db.update({ _id: req.params.id }, req.body, (err, usuario) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.status(200).json(req.body);
        }
    })
})

routes.delete('/usuarios/:id', (req, res) => {
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