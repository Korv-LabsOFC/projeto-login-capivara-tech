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