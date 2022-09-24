import { productoServices } from "../servicios/productos-servicios.js";

const mensajePagina = document.querySelector(".mensaje-pagina");

const resultadoBusqueda = async () => {
    const url = new URL(window.location);
    const palabraClave = url.searchParams.get("producto").toLowerCase();
    var encontrados = 0;
    try{
        const listaProductos = await productoServices.listaProductos();
        listaProductos.forEach(elemento => {
            const nombre = elemento.name.toLowerCase();
            if(nombre.includes(palabraClave)){
                const divProductos = document.querySelector("[data-productos]");
                divProductos.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imageUrl, elemento.id));
                encontrados++;
            }
        });
        if(encontrados==0){
            mensajePagina.innerHTML = "No se han encontrado resultados para su busqueda";
        }
    } catch(erro){
        console.log(erro);
    }
};

const nuevoProducto = (name, price, imageUrl, id) => {
    const card = document.createElement("div");
    const contenido = `
        <img class="card-img" src="${imageUrl}"/>
        <h3>${name}</h3>
        <p>${price}</p>
        <a href="">Ver producto</a>`;

        card.innerHTML = contenido;
        card.classList.add("card");
        return card;
}

resultadoBusqueda();