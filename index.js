const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dados simulados (em memória)
let livros = [
  { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien" },
  { id: 2, titulo: "1984", autor: "George Orwell" }
];

// Rotas básicas
app.get('/livros', (req, res) => {
  res.json(livros);
});

app.post('/livros', (req, res) => {
  const novoLivro = req.body;
  novoLivro.id = livros.length + 1;
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = livros.findIndex(l => l.id === id);

  if (index !== -1) {
    livros[index] = { id, ...req.body };
    res.json(livros[index]);
  } else {
    res.status(404).json({ mensagem: "Livro não encontrado" });
  }
});

app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  livros = livros.filter(l => l.id !== id);
  res.status(204).send();
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
