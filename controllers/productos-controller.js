import { productoServices } from "../servicios/productos-servicios.js";

const nuevoProducto = (name, price, imageUrl) => {

    const card = document.createElement("div");
    const contenido = `
        <img class="card-img" src="${imageUrl}"/>
        <h3>${name}</h3>
        <p>${price}</p>
        <a href="">Ver producto</a>`;

    card.innerHTML = contenido;
    card.classList.add("card");
    return card;
};


const render = async () => {
    try {
        const listaProductos = await productoServices.listaProductos();
        listaProductos.forEach(elemento => {
            const categoria = document.getElementById((elemento.section).toLowerCase());
            const divProductos = categoria.querySelector("[data-productos]");
            divProductos.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imageUrl));
        });
    } catch(erro){
        console.log(erro);
    }
};

render();