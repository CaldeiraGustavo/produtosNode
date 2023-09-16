const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.use(express.json());

router.get('/', (_req, res) => {
  res.redirect('/produtos');
});

router.get('/produtos', async (_req, res) => {
  res.json(await db('produtos'));
});

router.get('/produtos/:id', async (req, res) => {
  res.json(await db('produtos').where({ id: Number(req.params.id) }));
});

router.post('/produtos', async (req, res) => {
  res.status(201).json(
    await db('produtos')
      .insert(req.body)
      .then((ids) => ({ id: ids[0] }))
  );
});

router.put('/produtos/:id', async (req, res) => {
  res
    .status(200)
    .json(
      await db('produtos').where('id', Number(req.params.id)).update(req.body)
    );
});

router.delete('/produtos/:id', async (req, res) => {
  await db('produtos').where('id', Number(req.params.id)).del();
  res.status(204).send();
});

module.exports = router;