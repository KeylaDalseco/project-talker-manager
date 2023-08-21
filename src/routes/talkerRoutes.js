const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const { readFile, findById, insertTalker } = require('../utils/talker');
const auth = require('../middleware/authorization');
const {
  validName,
  validAge,
  validTalk,
  validWatchedAt,
  validRate } = require('../middleware/validation');

const talkerRouter = express.Router();

talkerRouter.get('/search', auth, async (req, res) => {
  const { q } = req.query;
  const allTalkers = await readFile();

  if (q) {
    const talkersFiltered = allTalkers.filter((talker) => talker.name.includes(q));
    console.log(talkersFiltered);
    return res.status(200).json(talkersFiltered);
  }
  if (q === '') {
    return res.status(200).json(allTalkers);
  }

  if (!q || q === undefined) return res.status(200).send([]);
});

talkerRouter.get('/', async (req, res) => {
  try {
    const allTalkers = await readFile();
    if (!allTalkers) {
      return res.status(200).end();
    }
    res.status(200).json(allTalkers);
  } catch (error) {
    res.status(404).send('pessoa palestrante não cadastrada');
  }
});

talkerRouter.post('/', auth,
  validName,
  validAge,
  validTalk,
  validRate,
  validWatchedAt, async (req, res) => {
  const newTalker = await insertTalker({ ...req.body });

  if (!newTalker) return res.status(400).send();
  res.status(201).json(newTalker);
});

talkerRouter.put('/:id', auth,
  validName,
  validAge,
  validTalk,
  validRate,
  validWatchedAt, async (req, res) => {
    const id = Number(req.params.id);
    const { name, age, talk: { watchedAt, rate } } = req.body;

    const allTalkers = await readFile();
    const updateTalker = allTalkers.find((talker) => talker.id === id);
    console.log(updateTalker);
    if (!updateTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    updateTalker.name = name;
    updateTalker.age = age;
    updateTalker.talk.rate = rate;
    updateTalker.talk.watchedAt = watchedAt;
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify([updateTalker]));
    res.status(200).json(updateTalker);
});

talkerRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = await findById(Number(id));
    console.log(talker);
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talker);
  } catch (error) {
    console.error('Pessoa palestrante não encontrada.');
  }
});

talkerRouter.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const allTalkers = await readFile();
    const deleteTalker = allTalkers.filter((talker) => talker.id !== id);
    if (!deleteTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify([deleteTalker]));
    res.status(204).json(deleteTalker);
});

module.exports = talkerRouter;