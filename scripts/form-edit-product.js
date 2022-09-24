import { productoServices } from "../servicios/productos-servicios.js";

const formulario = document.querySelector(".form-producto");

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if( id == null){
        alert("Se ha producido un error al obtener el producto! intente nuevamente en unos minutos");
    }

    const urlImagen = formulario.querySelector('[data-tipo="imagen"]');
    const categoria = formulario.querySelector('[data-tipo="categoria"]');
    const nombre = formulario.querySelector('[data-tipo="producto"]');
    const precio = formulario.querySelector('[data-tipo="precio"]');
    const descripcion = formulario.querySelector('[data-tipo="descripcion"]');

    try{
        const producto = await productoServices.detalleProducto(id);
        if(producto.name && producto.price && producto.description && producto.imageUrl && producto.section){
            nombre.value = producto.name;
            if(producto.section == "Star Wars"){
                categoria.value = "item-1";
            } else if (producto.section == "Consolas"){
                categoria.value = "item-2";
            } else {
                categoria.value = "item-3";
            }
            console.log(categoria.value);
            console.log(producto.section);
            urlImagen.value = producto.imageUrl;
            precio.value = producto.price;
            descripcion.value = producto.description;
        } else {
            throw new Error();
        }
    } catch (error){
        alert("Se ha producido un error! intente nuevamente en unos minutos");
    }
};

obtenerInformacion();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const urlImagen = formulario.querySelector('[data-tipo="imagen"]').value;
    const categoria = formulario.querySelector('[data-tipo="categoria"]').options[formulario.querySelector('[data-tipo="categoria"]').selectedIndex].text;
    const nombre = formulario.querySelector('[data-tipo="producto"]').value;
    const precio = formulario.querySelector('[data-tipo="precio"]').value;
    const descripcion = formulario.querySelector('[data-tipo="descripcion"]').value;

    productoServices.actualizarProducto(urlImagen, categoria, nombre, precio, descripcion, id).then(() => alert("Producto actualizado!"));
});