const mongoose = require('mongoose');

async function conectaBanco() {
  try {
    await mongoose.connect('SUA-URL-MONGO-AQUI');
    console.log("✅ Conectado ao MongoDB com sucesso!");
  } catch (erro) {
    console.error("❌ Erro ao conectar ao MongoDB:", erro);
  }
}

module.exports = conectaBanco;
