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

const eliminarProducto = (id) => {
    return fetch(`http://localhost:3000/producto/${id}`, {
        method: "DELETE",
    });
};

const detalleProducto = (id) => {
    return fetch(`http://localhost:3000/producto/${id}`).then(respuesta => respuesta.json());
};

const actualizarProducto = (imageUrl, section, name, price, description, id) => {
    return fetch(`http://localhost:3000/producto/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({ imageUrl, section, name, price, description})
    }).then(respuesta => respuesta).catch(err => console.log(err));
};

export const productoServices = {
    listaProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
}