import { produtoServices } from "../servicos/produto-servicos.js";
import { formatPrice } from "../formatterPrices.js";


const novoProduto = (name, price, imageUrl, id) => {
  const card = document.createElement("div");
  const conteudo = `
        <div class="produto">
            <img src="${imageUrl}" alt="img">
            <h1 class="product-name"> ${name} </h1>
            <p class="preco">${formatPrice(price)}</p>
            <a class="ver-produto" href="../views/edit-product.html?id=${id}&disabled=true">Ver Produto</a>
        </div>   
    `;
  card.innerHTML = conteudo;
  card.dataset.id = id;
  console.log(card);
  return card;
};



const produtos = document.querySelectorAll("[data-product]");

const render = async () => {
  try {
    const listaProdutos = await produtoServices.listaProdutos();
    listaProdutos.forEach((elemento) => {
      produtos.forEach(sessao => {
        if (sessao.dataset.product == elemento.section) {
          sessao.appendChild(novoProduto(
            elemento.name, 
            elemento.price, 
            elemento.imageUrl, 
            elemento.id,
          ));
        }
      });
    })
  }

  catch (erro) {
    console.log(erro);
  }
};

render();
