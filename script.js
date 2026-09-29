document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // PESQUISA E FILTROS
    // ==============================

    const pesquisa = document.getElementById("pesquisa");
    const tipo = document.getElementById("tipo");
    const genero = document.getElementById("genero");
    const limparFiltros = document.getElementById("limparFiltros");
    const nenhumProduto = document.getElementById("nenhumProduto");

    const produtos = document.querySelectorAll(".card");


    function filtrarProdutos() {

        const texto = pesquisa.value.toLowerCase().trim();
        const tipoSelecionado = tipo.value;
        const generoSelecionado = genero.value;

        let quantidadeEncontrada = 0;


        produtos.forEach(function (produto) {

            const nome = produto.dataset.nome.toLowerCase();
            const tipoProduto = produto.dataset.tipo.toLowerCase();
            const generoProduto = produto.dataset.genero.toLowerCase();

            const categoria = produto
                .querySelector(".categoria")
                .textContent
                .toLowerCase();


            // Pesquisa pelo nome ou categoria
            const correspondePesquisa =
                nome.includes(texto) ||
                categoria.includes(texto) ||
                tipoProduto.includes(texto) ||
                generoProduto.includes(texto);


            // Filtro por categoria
            const correspondeTipo =
                tipoSelecionado === "todos" ||
                tipoProduto === tipoSelecionado;


            // Filtro por gênero
            const correspondeGenero =
                generoSelecionado === "todos" ||
                generoProduto === generoSelecionado;


            // Verifica se o produto deve aparecer
            if (
                correspondePesquisa &&
                correspondeTipo &&
                correspondeGenero
            ) {

                produto.classList.remove("escondido");

                quantidadeEncontrada++;

            } else {

                produto.classList.add("escondido");

            }

        });


        // Mostra mensagem se nenhum produto for encontrado
        if (quantidadeEncontrada === 0) {

            nenhumProduto.style.display = "block";

        } else {

            nenhumProduto.style.display = "none";

        }

    }


    // Pesquisa
    pesquisa.addEventListener("input", filtrarProdutos);


    // Filtro de categoria
    tipo.addEventListener("change", filtrarProdutos);


    // Filtro de gênero
    genero.addEventListener("change", filtrarProdutos);


    // Limpar filtros
    limparFiltros.addEventListener("click", function () {

        pesquisa.value = "";

        tipo.value = "todos";

        genero.value = "todos";

        filtrarProdutos();

    });


    // Executa quando a página carrega
    filtrarProdutos();


    // ==============================
    // TRANSIÇÃO ENTRE PÁGINAS
    // ==============================

    const links = document.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener("click", function (evento) {

            const destino = link.getAttribute("href");


            // Ignora links externos,
            // links internos e links que abrem nova aba
            if (
                !destino ||
                destino.startsWith("http") ||
                destino.startsWith("#") ||
                link.target === "_blank"
            ) {

                return;

            }


            evento.preventDefault();


            // Inicia o efeito de saída
            document.body.classList.add("saindo");


            // Troca de página depois da animação
            setTimeout(function () {

                window.location.href = destino;

            }, 350);

        });

    });

});