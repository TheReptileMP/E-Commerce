const listaProductos = () => fetch("http://localhost:3000/producto").then(respuesta => respuesta.json());

const crearProducto = (imageUrl, section, name, price, description) => {
    return fetch("http://localhost:3000/producto", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({imageUrl, section, name, price, id: uuid.v4(), description})
    });
};

export const productoServices = {
    listaProductos,
    crearProducto,
}