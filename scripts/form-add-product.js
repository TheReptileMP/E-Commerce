import { productoServices } from "../servicios/productos-servicios.js";

const formulario = document.querySelector(".form-producto");
const inputs = formulario.querySelectorAll(".input-base");
const botonAgregar = formulario.querySelector(".btn-agregar-producto");

inputs.forEach( input => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const urlImagen = formulario.querySelector('[data-tipo="imagen"]').value;
    const categoria = formulario.querySelector('[data-tipo="categoria"]').options[formulario.querySelector('[data-tipo="categoria"]').selectedIndex].text;
    const nombre = formulario.querySelector('[data-tipo="producto"]').value;
    const precio = formulario.querySelector('[data-tipo="precio"]').value;
    const descripcion = formulario.querySelector('[data-tipo="descripcion"]').value;
    productoServices.crearProducto(urlImagen, categoria, nombre, precio, descripcion).then(() => {}).catch((error) => console.log(error));  
});

function valida(elemento){
    const tipoDeElemento = elemento.dataset.tipo;
    if(elemento.validity.valid){
        elemento.parentElement.classList.remove("input-container--invalid");
        elemento.parentElement.querySelector(".input-message-error").innerHTML = "";
        chequearFormCompleto();
    } else if (!elemento.validity.valid){
        elemento.parentElement.classList.add("input-container--invalid");
        elemento.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeElemento, elemento);
        chequearFormCompleto();
    }
}

function chequearFormCompleto(){
    var inputsValidos = 0;
    inputs.forEach( input => {
        if(input.validity.valid){
            inputsValidos++;
        }
    });

    if(inputsValidos == inputs.length){
         
    } else {
        
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch"
];

const mensajesDeError = {
    imagen: {
        valueMissing: "Este campo no puede estar vacío"
    },

    categoria: {
        valueMissing: "Debe escoger una categoría"
    },

    producto: {
        valueMissing: "Este campo no puede estar vacío"
    },

    precio: {
        valueMissing: "Este campo no puede estar vacío"
    },

    descripcion: {
        valueMissing: "Este campo no puede estar vacío"
    },
};

function mostrarMensajeDeError(tipoDeElemento, elemento){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(elemento.validity[error]){
            mensaje = mensajesDeError[tipoDeElemento][error];
        }
    });
    return mensaje;
}
