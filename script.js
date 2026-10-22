document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("listaProdutos");
  const pesquisa = document.getElementById("pesquisa");
  const genero = document.getElementById("genero");
  const marca = document.getElementById("marca");
  const limpar = document.getElementById("limparFiltros");
  const nenhum = document.getElementById("nenhumProduto");
  const contador = document.getElementById("contadorProdutos");
  const catalogo = Array.isArray(window.CATALOGO) ? window.CATALOGO : [];

  if (!lista || !pesquisa || !genero || !marca || !limpar || !nenhum || !contador) {
    return;
  }

  const marcas = [...new Set(catalogo.map(p => p.marca).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  marcas.forEach(function (nomeMarca) {
    const option = document.createElement("option");
    option.value = nomeMarca.toLocaleLowerCase("pt-BR");
    option.textContent = nomeMarca;
    marca.appendChild(option);
  });

  function criarCard(produto) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.nome = produto.nome;
    card.dataset.genero = produto.genero;
    card.dataset.marca = produto.marca;

    const foto = document.createElement("div");
    foto.className = "foto";
    const img = document.createElement("img");
    img.src = produto.imagem;
    img.alt = produto.nome;
    img.loading = "lazy";
    img.onerror = function () {
      img.hidden = true;
      const placeholder = document.createElement("div");
      placeholder.className = "imagem-indisponivel";
      placeholder.textContent = "Foto em breve";
      foto.appendChild(placeholder);
    };
    foto.appendChild(img);

    const info = document.createElement("div");
    info.className = "info";
    const categoria = document.createElement("div");
    categoria.className = "categoria";
    categoria.textContent = produto.marca;
    const titulo = document.createElement("h2");
    titulo.textContent = produto.nome;
    const volume = document.createElement("p");
    volume.className = "volume-produto";
    volume.textContent = produto.volume;
    const botao = document.createElement("a");
    botao.className = "botao";
    botao.href = "produto.html?produto=" + encodeURIComponent(produto.id);
    botao.textContent = "VER DETALHES";

    info.append(categoria, titulo, volume, botao);
    card.append(foto, info);
    return card;
  }

  catalogo.forEach(produto => lista.appendChild(criarCard(produto)));

  function filtrarProdutos() {
    const termo = pesquisa.value.trim().toLocaleLowerCase("pt-BR");
    const generoSelecionado = genero.value;
    const marcaSelecionada = marca.value;
    let encontrados = 0;

    [...lista.children].forEach(function (card) {
      const nome = (card.dataset.nome || "").toLocaleLowerCase("pt-BR");
      const marcaTexto = (card.dataset.marca || "").toLocaleLowerCase("pt-BR");
      const generoTexto = (card.dataset.genero || "").toLocaleLowerCase("pt-BR");
      const correspondeTexto = nome.includes(termo) || marcaTexto.includes(termo);
      const correspondeGenero = generoSelecionado === "todos" || generoTexto === generoSelecionado;
      const correspondeMarca = marcaSelecionada === "todas" || marcaTexto === marcaSelecionada;
      const mostrar = correspondeTexto && correspondeGenero && correspondeMarca;
      card.classList.toggle("escondido", !mostrar);
      if (mostrar) encontrados++;
    });

    nenhum.style.display = encontrados === 0 ? "block" : "none";
    contador.textContent = encontrados + (encontrados === 1 ? " perfume encontrado" : " perfumes encontrados");
  }

  pesquisa.addEventListener("input", filtrarProdutos);
  genero.addEventListener("change", filtrarProdutos);
  marca.addEventListener("change", filtrarProdutos);
  limpar.addEventListener("click", function () {
    pesquisa.value = "";
    genero.value = "todos";
    marca.value = "todas";
    filtrarProdutos();
  });
  filtrarProdutos();

  document.querySelectorAll('a[href]').forEach(function (link) {
    link.addEventListener("click", function (evento) {
      const destino = link.getAttribute("href");
      if (!destino || destino.startsWith("http") || destino.startsWith("#") ||
          link.target === "_blank" || evento.ctrlKey || evento.metaKey || evento.shiftKey) return;
      if (destino.endsWith(".html") || destino.includes(".html?")) {
        evento.preventDefault();
        document.body.classList.add("saindo");
        window.setTimeout(() => { window.location.href = destino; }, 250);
      }
    });
  });
});

                window.location.href = destino;

            }, 350);

        });

    });

});
