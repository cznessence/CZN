document.addEventListener("DOMContentLoaded", function () {
  const id = new URLSearchParams(window.location.search).get("produto");
  const catalogo = Array.isArray(window.CATALOGO) ? window.CATALOGO : [];
  const produto = catalogo.find(item => item.id === id);
  const $ = id => document.getElementById(id);
  const nome=$("nomeProduto"), descricao=$("descricaoProduto"), imagem=$("imagemProduto"), semFoto=$("imagemIndisponivel");
  const categoria=$("categoriaProduto"), marca=$("marcaProduto"), concentracao=$("concentracaoProduto"), volume=$("volumeProduto"), genero=$("generoProduto"), ocasiao=$("ocasiaoProduto"), whatsapp=$("whatsappProduto");
  const anterior=$("fotoAnterior"), proxima=$("fotoProxima"), indicadores=$("indicadoresFotos"), legenda=$("legendaFoto");
  if (!nome || !descricao || !imagem || !semFoto) return;
  if (!produto) { nome.textContent="Perfume não encontrado"; descricao.textContent="Não encontramos esse perfume no catálogo. Volte à página de produtos e escolha outro."; categoria.textContent="CZN ESSENCE"; imagem.hidden=true; semFoto.style.display="flex"; semFoto.textContent="PERFUME NÃO ENCONTRADO"; return; }
  document.title=produto.nome+" | CZN ESSENCE";
  nome.textContent=produto.nome; descricao.textContent=produto.descricao||"Descrição em breve."; categoria.textContent=produto.marca||"CZN ESSENCE";
  marca.textContent=produto.marca||"Não informado"; concentracao.textContent=produto.concentracao||"Não informado"; volume.textContent=produto.volume||"Não informado"; genero.textContent=produto.genero||"Não informado"; ocasiao.textContent=produto.ocasiao||"Não informado";
  // Cada produto pode receber uma galeria no catálogo: imagens: [{src:"arquivo.jpeg", legenda:"Essência e notas olfativas"}].
  const galeria = Array.isArray(produto.imagens) && produto.imagens.length ? produto.imagens : [{src: produto.imagem, legenda:"Foto do perfume"}];
  let atual=0;
  function mostrarFoto(indice) {
    atual=(indice+galeria.length)%galeria.length;
    const foto=galeria[atual]; const caminho=typeof foto === "string" ? foto : foto.src;
    imagem.hidden=true; semFoto.style.display="flex"; semFoto.textContent="CARREGANDO IMAGEM...";
    imagem.onload=()=>{ imagem.hidden=false; semFoto.style.display="none"; };
    imagem.onerror=()=>{ imagem.hidden=true; semFoto.style.display="flex"; semFoto.textContent="FOTO INDISPONÍVEL"; };
    imagem.alt=produto.nome+(galeria.length>1 ? " — "+(foto.legenda||`Foto ${atual+1}`) : "");
    imagem.src=caminho;
    if(legenda) legenda.textContent=(typeof foto === "string" ? (atual===0?"Foto do perfume":"Detalhe da fragrância") : (foto.legenda||`Foto ${atual+1} de ${galeria.length}`));
    if(indicadores){ indicadores.innerHTML=""; galeria.forEach((_,i)=>{const b=document.createElement("button");b.type="button";b.className="indicador-foto"+(i===atual?" ativo":"");b.setAttribute("aria-label","Mostrar foto "+(i+1));b.addEventListener("click",()=>mostrarFoto(i));indicadores.appendChild(b);}); }
    if(anterior) anterior.hidden=galeria.length<2; if(proxima) proxima.hidden=galeria.length<2; if(indicadores) indicadores.hidden=galeria.length<2;
  }
  anterior?.addEventListener("click",()=>mostrarFoto(atual-1)); proxima?.addEventListener("click",()=>mostrarFoto(atual+1));
  mostrarFoto(0);
  if(whatsapp){const mensagem="Olá! Gostei do "+produto.nome+" e gostaria de saber o preço e a disponibilidade."; whatsapp.href="https://wa.me/551999710375?text="+encodeURIComponent(mensagem);}
});
