const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = 'eightCluster';
const collectionName = 'avaliacoes';

app.post('/avaliar', async (req, res) => {
  const { nome, avaliacao, data } = req.body;

  if (!avaliacao || !data) return res.status(400).send('Campos obrigatórios ausentes.');

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne({ nome: nome || 'Anônimo', avaliacao, data });
    res.status(201).send({ ok: true, id: result.insertedId });
  } catch (err) {
    console.error('Erro ao salvar no MongoDB:', err);
    res.status(500).send('Erro ao salvar no banco.');
  } finally {
    await client.close();
  }
});

app.get('/', (req, res) => {
  res.send('API de Avaliações está rodando.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));