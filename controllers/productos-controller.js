import { productoServices } from "../servicios/productos-servicios.js";

const nuevoProducto = (name, price, imageUrl, id) => {

    const card = document.createElement("div");

    if(window.location.href.includes("/index.html")){
        const contenido = `
        <img class="card-img" src="${imageUrl}"/>
        <h3>${name}</h3>
        <p>${price}</p>
        <a href="">Ver producto</a>`;

        card.innerHTML = contenido;
        card.classList.add("card");
        return card;
    } else {
        const contenido = `
        <img class="card-img" src="${imageUrl}"/>
        <button class="btn-delete btn-opc-producto" id=${id}><img class="btn-opc-img" src="img/delete.png" alt="Icono borrar"/></button>
        <button class="btn-edit btn-opc-producto"><img class="btn-opc-img" src="img/lapiz.png" alt="Icono editar"/></button>
        <h3>${name}</h3>
        <p>${price}</p>
        <a href="">Ver producto</a>`;
    

        card.innerHTML = contenido;
        card.classList.add("card");
        const btnDelete = card.querySelector(".btn-delete");
        btnDelete.addEventListener("click", () => {
            const id = btnDelete.id;
            productoServices.eliminarProducto(id).then(respuesta => { console.log(respuesta)}).catch(err => alert("Ocurrió un error!")); 
        });
        return card;
    }
};


const render = async () => {
    try {
        const listaProductos = await productoServices.listaProductos();
        listaProductos.forEach(elemento => {
            if(window.location.href.includes("/index.html")){
                const categoria = document.getElementById((elemento.section).toLowerCase());
                const divProductos = categoria.querySelector("[data-productos]");
                divProductos.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imageUrl, elemento.id));
            } else {
                const divProductos = document.querySelector("[data-productos]");
                divProductos.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imageUrl, elemento.id));
            }
        });
    } catch(erro){
        console.log(erro);
    }
};

render();