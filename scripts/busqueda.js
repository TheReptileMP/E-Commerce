const inputBusqueda = document.querySelector(".input-search");
const btnBuscar = document.querySelector(".btn-search");
const btnBuscarMobile = document.querySelector(".btn-lupa");
const divSearch = document.querySelector(".div-search");

btnBuscar.addEventListener("click", () => {
    window.location.href = `./search-product.html?producto=${inputBusqueda.value}`;
});

btnBuscarMobile.addEventListener("click", () => {
    divSearch.style.display = "inline";
    btnBuscar.style.display = "inline";
});