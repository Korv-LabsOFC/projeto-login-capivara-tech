const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const DATA_DIR = process.env.VERCEL ? '/tmp' : '.';
const BANCO = path.join(DATA_DIR, 'usuarios.json');

app.use(express.json());
app.use(express.static('.'));

function lerUsuarios() {
  try {
    if (fs.existsSync(BANCO)) {
      return JSON.parse(fs.readFileSync(BANCO, 'utf-8'));
    }
  } catch (e) {
    console.error('Erro ao ler usuarios.json:', e);
  }
  return [];
}

function salvarUsuarios(usuarios) {
  fs.writeFileSync(BANCO, JSON.stringify(usuarios, null, 2));
}

app.post('/cadastrar', (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }
    const usuarios = lerUsuarios();
    if (usuarios.find(u => u.email === email)) {
      return res.status(400).json({ mensagem: "Usuário já cadastrado!" });
    }
    usuarios.push({ email, senha });
    salvarUsuarios(usuarios);
    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (e) {
    console.error('Erro no cadastro:', e);
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
});

app.post('/login', (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuarios = lerUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
      res.json({ mensagem: "Login bem-sucedido! Bem-vindo, " + email });
    } else {
      res.status(401).json({ mensagem: "Email ou senha incorretos!" });
    }
  } catch (e) {
    console.error('Erro no login:', e);
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
});

module.exports = app;
