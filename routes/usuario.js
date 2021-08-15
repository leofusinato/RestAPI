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

routes.get('/usuarios/:username&:senha', (req, res) => {
    db.findOne({
        username: req.params.username, senha: req.params.senha
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

module.exports = routes;