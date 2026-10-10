let carrinho = JSON.parse(localStorage.getItem('carrinhoHarpia')) || [];

document.addEventListener("DOMContentLoaded", () => {
    verificarEstadoUsuario();
    atualizarContadorCarrinho();
    renderizarCarrinhoModal();
    configurarAcessibilidade();
});

function verificarEstadoUsuario() {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    const nomeSpan = document.getElementById('nomeUsuarioLogado');
    const btnEntrar = document.getElementById('btnEntrar');
    const btnDeslogar = document.getElementById('btnDeslogar');

    if (usuarioSalvo) {
        if (nomeSpan) nomeSpan.textContent = usuarioSalvo;
        if (btnEntrar) btnEntrar.classList.add('d-none');
        if (btnDeslogar) btnDeslogar.classList.remove('d-none');
    } else {
        if (nomeSpan) nomeSpan.textContent = "Visitante";
        if (btnEntrar) btnEntrar.classList.remove('d-none');
        if (btnDeslogar) btnDeslogar.classList.add('d-none');
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
    renderizarCarrinhoModal();

    const msg = document.getElementById('mensagemFeedback');
    if (msg) {
        msg.textContent = `"${nome}" foi adicionado ao seu carrinho!`;
        msg.style.display = 'block';
        setTimeout(() => {
            msg.style.display = 'none';
        }, 3000);
    }
}

function atualizarContadorCarrinho() {
    const contador = document.getElementById('contadorCarrinho');
    if (contador) {
        contador.textContent = carrinho.length;
    }
}

function renderizarCarrinhoModal() {
    const lista = document.getElementById('listaCarrinho');
    const totalSpan = document.getElementById('totalCarrinho');
    if (!lista || !totalSpan) return;

    lista.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = '<li class="list-group-item text-muted">Seu carrinho está vazio.</li>';
    } else {
        carrinho.forEach((item, index) => {
            total += item.preco;
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${item.nome}</span>
                <div>
                    <span class="fw-bold me-2">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                    <button class="btn btn-sm btn-outline-danger" onclick="removerDoCarrinho(${index})">✕</button>
                </div>
            `;
            lista.appendChild(li);
        });
    }

    totalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinhoHarpia', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    renderizarCarrinhoModal();
}

function processarCheckout() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione produtos antes de finalizar.");
        return;
    }

    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (!usuarioSalvo) {
        alert("Você precisa estar logado para finalizar a compra.");
        window.location.href = 'login.html';
    } else {
        alert("Compra finalizada com sucesso! Obrigado pelo pedido.");
        carrinho = [];
        localStorage.removeItem('carrinhoHarpia');
        atualizarContadorCarrinho();
        renderizarCarrinhoModal();
        window.location.reload();
    }
}

function filtrarCategoria(categoria) {
    const produtos = document.querySelectorAll('.col-produto');
    const tituloSecao = document.getElementById('tituloSecao');
    if (tituloSecao) {
        tituloSecao.textContent = categoria === 'Todos' ? 'Todos os Títulos' : categoria;
    }
    
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
    const campo = document.getElementById('campoPesquisa');
    if (!campo) return;
    const termo = campo.value.toLowerCase();
    const produtos = document.querySelectorAll('.col-produto');

    produtos.forEach(produto => {
        const titulo = produto.getAttribute('data-titulo') ? produto.getAttribute('data-titulo').toLowerCase() : '';
        if (titulo.includes(termo)) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
}

function configurarAcessibilidade() {
    let tamanhoFonte = 100;
    const btnAumentar = document.getElementById('btnAumentar');
    const btnDiminuir = document.getElementById('btnDiminuir');
    const btnContraste = document.getElementById('btnContraste');

    if (btnAumentar) {
        btnAumentar.addEventListener('click', () => {
            if (tamanhoFonte < 140) {
                tamanhoFonte += 10;
                document.body.style.fontSize = `${tamanhoFonte}%`;
            }
        });
    }

    if (btnDiminuir) {
        btnDiminuir.addEventListener('click', () => {
            if (tamanhoFonte > 80) {
                tamanhoFonte -= 10;
                document.body.style.fontSize = `${tamanhoFonte}%`;
            }
        });
    }

    if (btnContraste) {
        btnContraste.addEventListener('click', () => {
            document.body.classList.toggle('bg-dark');
            document.body.classList.toggle('text-white');
            document.body.classList.toggle('bg-light');
        });
    }
}
