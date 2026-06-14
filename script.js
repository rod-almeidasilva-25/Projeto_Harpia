// =========================================================
// LÓGICA DA TELA DE CADASTRO
// =========================================================
let formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault(); // Não recarrega a página

        let nome = document.getElementById('nome').value.trim();
        let dataNascimento = document.getElementById('dataNascimento').value;
        let sexo = document.getElementById('sexo').value;
        let nomeMaterno = document.getElementById('nomeMaterno').value.trim();
        let cpf = document.getElementById('cpf').value.trim();
        let telCelular = document.getElementById('telCelular').value.trim();
        let telFixo = document.getElementById('telFixo').value.trim();
        let endereco = document.getElementById('endereco').value.trim();
        let login = document.getElementById('login').value.trim();
        let senha = document.getElementById('senha').value;
        let confirmaSenha = document.getElementById('confirmaSenha').value;

        let formularioValido = true;

        // Esconde todos os textos vermelhos de erro
        let avisosErro = document.querySelectorAll('.text-danger');
        for(let i = 0; i < avisosErro.length; i++) {
            avisosErro[i].style.display = 'none';
        }

        // Validações
        const regexLetras = /^[A-Za-zÀ-ÿ ]+$/;
        if (nome.length < 15 || nome.length > 60 || !regexLetras.test(nome)) {
            document.getElementById('erro-nome').style.display = 'block';
            formularioValido = false;
        }

        if (dataNascimento === "") {
            document.getElementById('erro-dataNascimento').style.display = 'block';
            formularioValido = false;
        }

        if (sexo === "") {
            document.getElementById('erro-sexo').style.display = 'block';
            formularioValido = false;
        }

        if (nomeMaterno === "" || !regexLetras.test(nomeMaterno)) {
            document.getElementById('erro-nomeMaterno').style.display = 'block';
            formularioValido = false;
        }

        if (cpf === "") {
            document.getElementById('erro-cpf').style.display = 'block';
            formularioValido = false;
        }

        const regexTelefone = /^\(\+55\)\d{2}-\d{8,9}$/;
        if (!regexTelefone.test(telCelular)) {
            document.getElementById('erro-telCelular').style.display = 'block';
            formularioValido = false;
        }

        if (!regexTelefone.test(telFixo)) {
            document.getElementById('erro-telFixo').style.display = 'block';
            formularioValido = false;
        }

        if (endereco === "") {
            document.getElementById('erro-endereco').style.display = 'block';
            formularioValido = false;
        }

        const regexApenasLetras = /^[A-Za-z]+$/;
        if (login.length !== 6 || !regexApenasLetras.test(login)) {
            document.getElementById('erro-login').style.display = 'block';
            formularioValido = false;
        }

        if (senha.length !== 8 || !regexApenasLetras.test(senha)) {
            document.getElementById('erro-senha').style.display = 'block';
            formularioValido = false;
        }

        if (senha !== confirmaSenha || confirmaSenha === "") {
            document.getElementById('erro-confirmaSenha').style.display = 'block';
            formularioValido = false;
        }

        // Se deu tudo certo, salva no navegador e vai pro login
        if (formularioValido) {
            localStorage.setItem('harpia_login', login);
            localStorage.setItem('harpia_senha', senha);
            window.location.href = 'login.html';
        }
    });
}

// =========================================================
// LÓGICA DA TELA DE LOGIN E USUÁRIO LOGADO
// =========================================================
let formLogin = document.getElementById('formLogin');

if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();

        let loginDigitado = document.getElementById('loginUsuario').value.trim();
        let senhaDigitada = document.getElementById('senhaUsuario').value;
        let loginSalvo = localStorage.getItem('harpia_login');
        let senhaSalva = localStorage.getItem('harpia_senha');
        let loginValido = true;

        document.getElementById('erro-loginUsuario').style.display = 'none';
        document.getElementById('erro-senhaUsuario').style.display = 'none';

        if (loginDigitado === "" || loginDigitado !== loginSalvo) {
            document.getElementById('erro-loginUsuario').style.display = 'block';
            loginValido = false;
        }

        if (senhaDigitada === "" || senhaDigitada !== senhaSalva) {
            document.getElementById('erro-senhaUsuario').style.display = 'block';
            loginValido = false;
        }

        if (loginValido) {
            localStorage.setItem('usuario_logado', loginDigitado);
            window.location.href = 'index.html';
        }
    });
}

let nomeUsuarioLogado = document.getElementById('nomeUsuarioLogado');
if (nomeUsuarioLogado) {
    let usuarioLogado = localStorage.getItem('usuario_logado');
    if (usuarioLogado === null) {
        window.location.href = 'login.html'; // Bloqueia quem não fez login
    } else {
        nomeUsuarioLogado.innerText = usuarioLogado;
    }

    document.getElementById('btnDeslogar').addEventListener('click', function() {
        localStorage.removeItem('usuario_logado');
        window.location.href = 'login.html';
    });
}

// =========================================================
// BOTÕES DE ACESSIBILIDADE
// =========================================================
let btnContraste = document.getElementById('btnContraste');
if (btnContraste) {
    btnContraste.addEventListener('click', function() {
        document.body.classList.toggle('alto-contraste');
    });
}

let tamanhoFonteAtual = 16; 
let btnAumentar = document.getElementById('btnAumentar');
let btnDiminuir = document.getElementById('btnDiminuir');

if (btnAumentar && btnDiminuir) {
    btnAumentar.addEventListener('click', function() {
        tamanhoFonteAtual = tamanhoFonteAtual + 2; 
        document.body.style.fontSize = tamanhoFonteAtual + 'px';
    });
    btnDiminuir.addEventListener('click', function() {
        tamanhoFonteAtual = tamanhoFonteAtual - 2; 
        document.body.style.fontSize = tamanhoFonteAtual + 'px';
    });
}

// =========================================================
// LÓGICA DO CARRINHO DE COMPRAS E MODAL
// =========================================================
let quantidadeNoCarrinho = 0;
let valorTotalDoCarrinho = 0.0;

function adicionarCarrinho(nomeDoProduto, precoDoProduto) {
    // 1. Aumenta a conta de itens na bolinha vermelha
    quantidadeNoCarrinho = quantidadeNoCarrinho + 1;
    document.getElementById('contadorCarrinho').innerText = quantidadeNoCarrinho;

    // 2. Soma o valor do produto na conta total
    valorTotalDoCarrinho = valorTotalDoCarrinho + precoDoProduto;

    // 3. Tira a mensagem de "carrinho vazio" se ela estiver lá
    let mensagemVazio = document.getElementById('mensagemCarrinhoVazio');
    if (mensagemVazio) {
        mensagemVazio.style.display = 'none';
    }

    // 4. Cria a linha do produto no HTML do Modal
    let listaDoModal = document.getElementById('listaDeItensNoCarrinho');
    let textoPreco = precoDoProduto.toFixed(2).replace('.', ','); // Troca ponto por vírgula no preço
    
    // Adiciona o item na lista mantendo o que já estava lá
    listaDoModal.innerHTML = listaDoModal.innerHTML + '<li class="list-group-item d-flex justify-content-between"><span>' + nomeDoProduto + '</span><strong>R$ ' + textoPreco + '</strong></li>';

    // 5. Atualiza o preço final escrito no Modal
    document.getElementById('valorTotalCarrinho').innerText = valorTotalDoCarrinho.toFixed(2).replace('.', ',');

    // 6. Mostra a mensagem rápida verde na tela principal
    let divMensagem = document.getElementById('mensagemFeedback');
    divMensagem.innerText = nomeDoProduto + " foi adicionado ao carrinho!";
    divMensagem.style.display = 'block';
    
    setTimeout(function() {
        divMensagem.style.display = 'none';
    }, 3000);
}

function finalizarCompra() {
    if (quantidadeNoCarrinho === 0) {
        alert("O seu carrinho está vazio! Escolha um produto primeiro.");
    } else {
        // Limpa tudo como se tivesse comprado
        quantidadeNoCarrinho = 0;
        valorTotalDoCarrinho = 0.0;
        document.getElementById('contadorCarrinho').innerText = "0";
        document.getElementById('valorTotalCarrinho').innerText = "0,00";
        document.getElementById('listaDeItensNoCarrinho').innerHTML = '<li class="list-group-item text-muted text-center" id="mensagemCarrinhoVazio">Seu carrinho está vazio.</li>';
        
        // Esconde o modal usando comando do Bootstrap e mostra aviso
        let divMensagem = document.getElementById('mensagemFeedback');
        divMensagem.innerText = "Compra finalizada com sucesso! Verifique seu e-mail.";
        divMensagem.style.display = 'block';
        setTimeout(function() { divMensagem.style.display = 'none'; }, 4000);
    }
}

// =========================================================
// LÓGICA DO MENU DE CATEGORIAS (FILTRO CLICADO)
// =========================================================
function filtrarCategoria(nomeDaCategoriaClicada) {
    let todosOsCards = document.getElementsByClassName('col-produto');
    
    // Atualiza o título da página para mostrar o que o aluno filtrou
    document.getElementById('tituloSecao').innerText = nomeDaCategoriaClicada === 'Todos' ? 'Todos os Títulos' : 'Categoria: ' + nomeDaCategoriaClicada;

    for (let i = 0; i < todosOsCards.length; i++) {
        // Se clicou em "Todos" ou na "Home", mostra o card
        if (nomeDaCategoriaClicada === 'Todos') {
            todosOsCards[i].style.display = 'block';
        } else {
            // Pega o texto da etiqueta (ex: "Mangá") e compara
            let categoriaDoCard = todosOsCards[i].getElementsByClassName('badge-categoria')[0].innerText;
            if (categoriaDoCard === nomeDaCategoriaClicada) {
                todosOsCards[i].style.display = 'block';
            } else {
                todosOsCards[i].style.display = 'none';
            }
        }
    }
}

// =========================================================
// LÓGICA DA BARRA DE PESQUISA (FILTRO DIGITADO)
// =========================================================
function filtrarPesquisa() {
    let textoDigitado = document.getElementById('campoPesquisa').value.toLowerCase();
    let todosOsCards = document.getElementsByClassName('col-produto');

    for (let i = 0; i < todosOsCards.length; i++) {
        let tituloDoCard = todosOsCards[i].getElementsByClassName('card-title')[0].innerText.toLowerCase();
        
        if (tituloDoCard.includes(textoDigitado)) {
            todosOsCards[i].style.display = 'block';
        } else {
            todosOsCards[i].style.display = 'none';
        }
    }
}