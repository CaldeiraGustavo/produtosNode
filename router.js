const express = require('express');
const router = express.Router();
const db = require('./db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { checkToken, isAdmin } = require('./middlewares.js');

router.use(express.json());

router.get('/', (_req, res) => {
  res.redirect('/produtos');
});
//rotas livres para qualquer usuário
router.get('/produtos', checkToken, async (_req, res) => {
  res.json(await db('produtos'));
});

router.get('/produtos/:id', checkToken, async (req, res) => {
  res.json(await db('produtos').where({ id: Number(req.params.id) }));
});

//rotas protegidas para administrador
router.post('/produtos', checkToken, isAdmin, async (req, res) => {
  res.status(201).json(
    await db('produtos')
      .insert(req.body)
      .then((ids) => ({ id: ids[0] }))
  );
});

router.put('/produtos/:id', checkToken, isAdmin, async (req, res) => {
  res
    .status(200)
    .json(
      await db('produtos').where('id', Number(req.params.id)).update(req.body)
    );
});

router.delete('/produtos/:id', checkToken, isAdmin, async (req, res) => {
  await db('produtos').where('id', Number(req.params.id)).del();
  res.status(204).send();
});

router.post('/register', (req, res) => {
  db('usuarios')
    .insert({
      nome: req.body.nome,
      login: req.body.login,
      senha: bcrypt.hashSync(req.body.senha, 8),
      email: req.body.email,
      roles: req.body.roles
    }, ['id'])
    .then((result) => {
      let usuario = result[0];
      res.status(200).json({ "id": usuario.id });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Erro ao registrar usuario - ' + err.message
      });
    })
});

router.post('/login', (req, res) => {
  const {login, senha} = req.body;

  db('usuarios')
    .where({'login': login})
    .then(usuarios => {
      if(!usuarios.length) {
        res.status(401).json({message: 'Usuário ou senha incorretos'});
      } else {
        let usuario = usuarios[0];
        bcrypt.compare(senha, usuario.senha, (err, result) => {
          if (err) {
            res.status(500).json({message: `Erro ao gerar token: ${err.message}`})
          } else if (result) {
            jwt.sign(
              {id: usuario.id, roles: usuario.roles},
              process.env.SECRET_KEY,
              {algorithm: 'HS256', expiresIn: '1h'},
              (err, token) => {
              if(err) {
                res.status(500).json({message: `Erro ao gerar token: ${err.message}`});
              } else {
                res.status(200).json({token: token});
              }
            });
          } else {
            res.status(401).json({message: 'Usuário ou senha incorretos'});
          }
        })
      }
    });
});

module.exports = router;