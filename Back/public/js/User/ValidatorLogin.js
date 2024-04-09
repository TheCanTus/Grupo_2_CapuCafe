window.onload = function () {

    let formulario = document.querySelector("form");

    let formEmail = document.querySelector("#email");
    let formPassword = document.querySelector("#password");

    let validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let errorEmail = document.querySelector(".email .text-danger");
    let errorPassword = document.querySelector(".password .text-danger");

    let errores = [];

    formEmail.addEventListener("blur", function () {
        if (validarEmail.test(formEmail.value)) {
            errorEmail.innerHTML = "";
            errores = errores.filter(error => error !== "errorEmail");
        } else {
            errorEmail.innerHTML = "El email ingresado tiene que ser válido";
            errores.push("errorEmail");
        }
    });

    formPassword.addEventListener("blur", function () {
        if (formPassword.value.length === 0) {
            errorPassword.innerHTML = "El campo contraseña es obligatorio";
            errores.push("errorPassword");
        } else {
            errorPassword.innerHTML = "";
            errores = errores.filter(error => error !== "errorPassword");
        }
    });

    formulario.addEventListener("submit", function (e) {
        if (errores.length > 0) {
            console.log(errores);
            e.preventDefault();
        }
    });

};
