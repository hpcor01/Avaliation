// backend.js - Node.js + Express + MongoDB

const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

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

// Lista (apenas ativos)
app.get('/usuarios', async (_req, res) => {
  try {
    const db = client.db(dbName);
    const docs = await db.collection(collectionLogin)
      .find({ ativo: { $ne: false } })
      .project({ 'user.password': 0 })
      .toArray();

    const users = docs.map(d => ({
      id: d._id,
      username: d.user.username,
      nome: d.user.nome,
      email: d.user.email
    }));
    res.json(users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
});


// Criação
app.post('/usuarios', async (req, res) => {
  const { username, password, nome, email } = req.body || {};
  if (!username || !password || !nome || !email) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const db = client.db(dbName);
    const col = db.collection(collectionLogin);

    const jaExiste = await col.findOne({ 'user.username': username });
    if (jaExiste) {
      return res.status(409).json({ error: 'Nome de usuário já existe.' });
    }

    await col.insertOne({
      user: { username, password, nome, email },
      ativo: true,
      createdAt: new Date()
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});


// Desativar
app.patch('/usuarios/:id/desativar', async (req, res) => {
  try {
    const db = client.db(dbName);
    await db.collection(collectionLogin).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ativo: false, desativadoEm: new Date() } }
    );
    res.json({ ok: true });
  } catch (err) {
    console.error('Erro ao desativar usuário:', err);
    res.status(500).json({ error: 'Erro ao desativar usuário.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
