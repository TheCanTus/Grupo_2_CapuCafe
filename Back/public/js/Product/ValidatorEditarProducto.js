window.onload = function () {
    let formulario = document.querySelector("form");
    let errores = [];

    formulario.addEventListener("submit", function (e) {
        if (errores.length > 0) {
            e.preventDefault();
            alert("Por favor, corrige los errores antes de enviar el formulario.");
        }
    });

    let formNombre = document.querySelector("#nombre");
    let formDescripcion = document.querySelector("[name='descripcion']");
    let formCategoria = document.querySelector("[name='categoriaId']");
    let formPrecio = document.querySelector("#precio");

    formNombre.focus();

    formNombre.addEventListener("blur", function () {
        validarCampo(formNombre, "errorNombre", "El campo nombre no puede estar vacío y debe tener al menos 5 caracteres");
    });
    formDescripcion.addEventListener("blur", function () {
        validarCampo(formDescripcion, "errorDescripcion", "El campo descripción no puede estar vacío y debe tener al menos 20 caracteres");
    });
    formCategoria.addEventListener("blur", function () {
        validarCategoria(formCategoria, "errorCategoria", "El campo categoría debe ser un número entre 1 y 5");
    });
    formPrecio.addEventListener("blur", function () {
        validarCampo(formPrecio, "errorPrecio", "El campo precio es obligatorio");
    });

    function validarCampo(input, errorId, mensajeError) {
        if (input.value.trim() === "") {
            mostrarError(input, errorId, mensajeError);
        } else {
            limpiarError(input, errorId);
        }
    }

    function validarCategoria(input, errorId, mensajeError) {
        let categoria = parseInt(input.value);
        if (isNaN(categoria) || categoria < 1 || categoria > 5) {
            mostrarError(input, errorId, mensajeError);
        } else {
            limpiarError(input, errorId);
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
