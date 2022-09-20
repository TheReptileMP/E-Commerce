const formulario2 = document.querySelector(".form-login");
const inputs2 = formulario2.querySelectorAll(".input-base");
const botonEntrar = formulario2.querySelector(".btn-entrar");
const labelBtn = formulario2.querySelector("#label-btn");
const emailIngresado = formulario2.querySelector("#email");
const passIngresado = formulario2.querySelector("#password");

botonEntrar.disabled = true;

const emailAdm = "thereptile@github.com";
const passAdm = "a1b2c3d4";

var camposEnError = 0;

inputs2.forEach( input => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
        if(camposEnError == 1){
            labelBtn.style.display = "none";
            camposEnError = 0;
        }
    });
});

botonEntrar.addEventListener("click", (evento) => {
    evento.preventDefault();
    validarLogin();
})

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
    inputs2.forEach( input => {
        if(input.validity.valid){
            inputsValidos++;
        }
    });

    if(inputsValidos == inputs2.length){
            botonEntrar.disabled = false;
            botonEntrar.classList.add("btn-azul");
    } else {
        botonEntrar.classList.remove("btn-azul");
        botonEntrar.disabled = true;
    }
}

const tipoDeErrores2 = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch"
];

const mensajesDeError2 = {
    email: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },

    password: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Se requiere mínimo 4 caractéres alfanuméricos"
    }

};

function mostrarMensajeDeError(tipoDeElemento, elemento){
    let mensaje = "";
    tipoDeErrores2.forEach((error) => {
        if(elemento.validity[error]){
            mensaje = mensajesDeError2[tipoDeElemento][error];
        }
    });
    return mensaje;
}

function validarLogin(){
    if(emailIngresado.value == emailAdm && passIngresado.value == passAdm){
        window.location.href = "./menu-admin.html";
    } else {
        labelBtn.style.display = "flex";
        camposEnError = 1;
    }
}