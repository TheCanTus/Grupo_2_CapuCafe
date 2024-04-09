window.onload = function () {
    let formulario = document.querySelector("form");
    let errores = [];

    formulario.addEventListener("submit", function (e) {
        if (errores.length > 0) {
            e.preventDefault();
            alert("Por favor, corrige los errores antes de enviar el formulario.");
        }
    });

    let formNombre = document.querySelector("[name='nombre']");
    let formApellido = document.querySelector("[name='apellido']");
    let formEmail = document.querySelector("[name='email']");
    let formPassword = document.querySelector("[name='password']");
    let formConfirmPassword = document.querySelector("[name='confirm_password']");

    formNombre.addEventListener("blur", function () {
        validarCampo(formNombre, "errorNombre", "El campo nombre no puede estar vacío y debe tener más de 4 caracteres");
    });
    formApellido.addEventListener("blur", function () {
        validarCampo(formApellido, "errorApellido", "El campo apellido no puede estar vacío y debe tener más de 4 caracteres");
    });
    formEmail.addEventListener("blur", function () {
        validarEmail(formEmail, "errorEmail", "El email ingresado es inválido");
    });
    formPassword.addEventListener("blur", function () {
        validarCampo(formPassword, "errorPassword", "El campo contraseña no puede estar vacío y debe tener más de 6 caracteres");
    });
    formConfirmPassword.addEventListener("blur", function () {
        validarConfirmPassword(formPassword, formConfirmPassword, "errorConfirmPassword", "Las contraseñas no coinciden");
    });

    function validarCampo(input, errorId, mensajeError) {
        if (input.value.trim() === "") {
            mostrarError(input, errorId, mensajeError);
        } else if (input.value.length < 4) {
            mostrarError(input, errorId, mensajeError);
        } else {
            limpiarError(input, errorId);
        }
    }

    function validarEmail(input, errorId, mensajeError) {
        let validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validarEmail.test(input.value)) {
            mostrarError(input, errorId, mensajeError);
        } else {
            limpiarError(input, errorId);
        }
    }

    function validarConfirmPassword(passwordInput, confirmPasswordInput, errorId, mensajeError) {
        if (passwordInput.value !== confirmPasswordInput.value) {
            mostrarError(confirmPasswordInput, errorId, mensajeError);
        } else {
            limpiarError(confirmPasswordInput, errorId);
        }
    }

    function mostrarError(input, errorId, mensajeError) {
        let errorElement = document.querySelector(`#${errorId}`);
        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.id = errorId;
            errorElement.classList.add("error-front");
            input.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = mensajeError;
        errores.push(errorId);
    }

    function limpiarError(input, errorId) {
        let errorElement = document.querySelector(`#${errorId}`);
        if (errorElement) {
            errorElement.remove();
            errores = errores.filter(error => error !== errorId);
        }
    }
};
