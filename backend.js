// backend.js - Node.js + Express + MongoDB

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = 'dbAvalia';
const collectionName = 'colAvaliacao';

// Conecta uma vez ao iniciar
client.connect()
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// 🔐 Rota de login para autenticar usuário
// Nova rota para login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = client.db('dbAvalia');
    const col = db.collection('colLogin');

    const user = await col.findOne({ 
      'user.username': username, 
      'user.password': password 
    });

    if (user) {
      res.status(200).send({ ok: true, user: user.user });
    } else {
      res.status(401).send({ ok: false, message: 'Credenciais inválidas' });
    }
  } catch (err) {
    console.error('Erro ao validar login:', err);
    res.status(500).send({ ok: false, error: 'Erro no servidor' });
  }
});

app.post('/avaliar', async (req, res) => {
  const { nome, avaliacao, data } = req.body;

  if (!avaliacao || !data) return res.status(400).send('Campos obrigatórios ausentes.');

  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne({ nome: nome || 'Anônimo', avaliacao, data });
    res.status(201).send({ ok: true, id: result.insertedId });
  } catch (err) {
    console.error('Erro ao salvar no MongoDB:', err);
    res.status(500).send('Erro ao salvar no banco.');
  }
});

//GET PARA ENVIAR DADOS PARA DASHBOARD
app.get('/avaliacoes', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const data = await collection.find({}).sort({ data: -1 }).toArray();
  res.send(data);
});

//TESTE DA API
app.get('/', (req, res) => {
  res.send('API de Avaliações está rodando.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
