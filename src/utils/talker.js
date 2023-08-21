const fs = require('fs/promises');
const path = require('path');

const readFile = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const response = JSON.parse(data);
    return response;
  } catch (error) {
    console.error('Não possui um talker!');
  }
};

const findById = async (id) => {
  const talkers = await readFile();
  const findTalker = talkers.find((talker) => talker.id === id);
  return findTalker;
};

const insertTalker = async (talker) => {
    const { name, age, talk: { watchedAt, rate } } = talker;
    const data = await readFile();
    const nextId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const newTalker = {
      name,
      age,
      id: nextId,
      talk: {
        watchedAt,
        rate,
      },
    };
    data.push(newTalker);
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(data));
    return newTalker;
};

module.exports = { readFile, findById, insertTalker };