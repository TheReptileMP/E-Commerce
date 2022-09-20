const formulario = document.querySelector(".formulario");
const inputs = formulario.querySelectorAll(".input-base");
const textarea = formulario.querySelector("textarea");

const botonEnviar = document.querySelector(".btn-enviar");
botonEnviar.disabled = true;

inputs.forEach( input => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});

function valida(elemento){
    const tipoDeElemento = elemento.dataset.tipo;
    var textAreaEnError = 0;
    if(tipoDeElemento == "mensaje"){
        if(textarea.value.length > 120){
            elemento.parentElement.classList.add("input-container--invalid");
            elemento.parentElement.querySelector(".input-message-error").innerHTML = "El mensaje debe contener máximo 120 caractéres";
            textAreaEnError = 1;
            chequearFormCompleto();
        }
    }

    if(elemento.validity.valid && textAreaEnError == 0){
        elemento.parentElement.classList.remove("input-container--invalid");
        elemento.parentElement.querySelector(".input-message-error").innerHTML = "";
        chequearFormCompleto();
    } else if (!elemento.validity.valid && textAreaEnError == 0){
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
        if(textarea.validity.valid){
            botonEnviar.disabled = false;
            botonEnviar.classList.add("btn-azul");
        } else {
            botonEnviar.classList.remove("btn-azul");
            botonEnviar.disabled = true;
        }
    } else {
        botonEnviar.classList.remove("btn-azul");
        botonEnviar.disabled = true;
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El nombre debe contener entre 3 a 40 caractéres"
    },

    mensaje: {
        valueMissing: "Este campo no puede estar vacío"
    }

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