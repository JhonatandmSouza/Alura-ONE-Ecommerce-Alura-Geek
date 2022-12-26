import { produtoServices } from "../servicos/produto-servicos.js";

const getURL = new URL(window.location);

const id = getURL.searchParams.get("id");
const disabled = getURL.searchParams.get("disabled");

const inputImageUrl = document.querySelector("[data-url]");
const inputNome = document.querySelector("[data-nome]");
const inputPreco = document.querySelector("[data-preco]");
const inputDescricao = document.querySelector("[data-descricao]");
const botao = document.querySelector("[data-botao]");

if (disabled) {
  inputNome.disabled = true;
  inputPreco.disabled = true;
  inputDescricao.disabled = true;
  botao.style.display = "none";
}

produtoServices.listaUmProduto(id).then((dados) => {
  inputImageUrl.setAttribute("src", dados.imageUrl);
  inputNome.value = dados.name;
  inputPreco.value = dados.price;
  inputDescricao.value = dados.description;
});

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  produtoServices
    .alteraProduto(id, inputNome.value, inputPreco.value, inputDescricao.value)
    .then(() => {
      window.location.href = "../views/produto.html";
    });
});
