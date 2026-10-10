let carrinho = JSON.parse(localStorage.getItem('carrinhoHarpia')) || [];

document.addEventListener("DOMContentLoaded", () => {
    verificarEstadoUsuario();
    atualizarContadorCarrinho();
});

function verificarEstadoUsuario() {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    const nomeSpan = document.getElementById('nomeUsuarioLogado');
    const btnEntrar = document.getElementById('btnEntrar');
    const btnDeslogar = document.getElementById('btnDeslogar');

    if (usuarioSalvo) {
        nomeSpan.textContent = usuarioSalvo;
        btnEntrar.classList.add('d-none');
        btnDeslogar.classList.remove('d-none');
    } else {
        nomeSpan.textContent = "Visitante";
        btnEntrar.classList.remove('d-none');
        btnDeslogar.classList.add('d-none');
    }
}

function realizarLogout() {
    localStorage.removeItem('usuarioLogado');
    verificarEstadoUsuario();
    window.location.reload();
}

function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    localStorage.setItem('carrinhoHarpia', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
    const contador = document.getElementById('contadorCarrinho');
    if (contador) {
        contador.textContent = carrinho.length;
    }
}

function processarCheckout() {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (!usuarioSalvo) {
        alert("Você precisa estar logado para finalizar a compra.");
        window.location.href = 'login.html';
    } else {
        alert("Compra finalizada com sucesso!");
        carrinho = [];
        localStorage.removeItem('carrinhoHarpia');
        atualizarContadorCarrinho();
        window.location.reload();
    }
}

function filtrarCategoria(categoria) {
    const produtos = document.querySelectorAll('.col-produto');
    document.getElementById('tituloSecao').textContent = categoria === 'Todos' ? 'Todos os Títulos' : categoria;
    
    produtos.forEach(produto => {
        const cat = produto.getAttribute('data-categoria');
        if (categoria === 'Todos' || cat === categoria) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
}

function filtrarPesquisa() {
    const termo = document.getElementById('campoPesquisa').value.toLowerCase();
    const produtos = document.querySelectorAll('.col-produto');

    produtos.forEach(produto => {
        const titulo = produto.getAttribute('data-titulo').toLowerCase();
        if (titulo.includes(termo)) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
}
