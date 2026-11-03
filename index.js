// The file is also the Render start entrypoint (node index.js).
// In Node, start Express; in the browser, run the existing UI handlers.
if (typeof document === "undefined") {
  const app = require("./server");
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Capivara Tech login listening on port ${port}`);
  });
} else {
  const btnCadastro = document.getElementById('btn-cadastro');
const inpCadEmail = document.getElementById('email-cad');
const inpCadSenha = document.getElementById('senha-cad');
const linkCadastro = document.getElementById('link-cad');
const btnLogin = document.getElementById('btn-login');
const inpLogEmail = document.getElementById('email');
const inpLogSenha = document.getElementById('senha');

document.getElementById('area-cad').style.display = 'none';

linkCadastro.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('area-cad').style.display = 'flex';
    document.getElementById('area-login').style.display = 'none';
    linkCadastro.style.display = 'none';
});

btnCadastro.addEventListener('click', () => {
    const email = inpCadEmail.value;
    const senha = inpCadSenha.value;
    if (!email || !senha) { alert("Preencha os campos!"); return; }
    fetch('/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    })
        .then(res => res.json())
        .then(confirmacao => {
            alert(confirmacao.mensagem);
            inpCadEmail.value = ''; inpCadSenha.value = '';
        })
        .catch(err => alert("Erro ao cadastrar: " + err.message));
});

btnLogin.addEventListener('click', () => {
    const email = inpLogEmail.value;
    const senha = inpLogSenha.value;
    if (!email || !senha) { alert("Preencha o login!"); return; }
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    })
        .then(res => res.json())
        .then(confirmacao => {
            alert(confirmacao.mensagem);
            inpLogEmail.value = ''; inpLogSenha.value = '';
        });
});
}
