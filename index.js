const express = require('express');
const conectaBanco = require('./db');
const Livro = require('./Livro');
const app = express();
const port = 3000;

app.use(express.json());

conectaBanco();

// GET
app.get('/livros', async (req, res) => {
  const livros = await Livro.find();
  res.json(livros);
});

// POST
app.post('/livros', async (req, res) => {
  const novoLivro = new Livro(req.body);
  const livroSalvo = await novoLivro.save();
  res.status(201).json(livroSalvo);
});

// PUT
app.put('/livros/:id', async (req, res) => {
  const livroAtualizado = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(livroAtualizado);
});

// DELETE
app.delete('/livros/:id', async (req, res) => {
  await Livro.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});