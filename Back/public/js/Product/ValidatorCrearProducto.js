window.onload = function () {
    let formulario = document.querySelector(".form-editar");
    let errores = 0;

    formulario.addEventListener("submit", function (e) {
        if (errores > 0) {
            e.preventDefault();
            alert("Por favor, corrige los errores antes de enviar el formulario.");
        }
    });

    let formNombre = document.querySelector("#nombre");
    let formDescripcion = document.querySelector("#descripcion");
    let formCategoria = document.querySelector("#categoriaId");
    let formPrecio = document.querySelector("#precio");

    formNombre.addEventListener("blur", validarNombre);
    formDescripcion.addEventListener("blur", validarDescripcion);
    formCategoria.addEventListener("change", validarCategoria);
    formPrecio.addEventListener("blur", validarPrecio);

    function validarNombre() {
        if (formNombre.value.length === 0 || formNombre.value.length < 5) {
            setError(formNombre, "El campo nombre no puede estar vacío y debe tener al menos 5 caracteres.");
        } else {
            clearError(formNombre);
        }
    }

    function validarDescripcion() {
        if (formDescripcion.value.length === 0 || formDescripcion.value.length < 20) {
            setError(formDescripcion, "El campo descripción no puede estar vacío y debe tener al menos 20 caracteres.");
        } else {
            clearError(formDescripcion);
        }
    }

    function validarCategoria() {
        if (!formCategoria.value || formCategoria.value < 1 || formCategoria.value > 5) {
            setError(formCategoria, "Por favor, selecciona una categoría válida.");
        } else {
            clearError(formCategoria);
        }
    }

    function validarPrecio() {
        if (!formPrecio.value) {
            setError(formPrecio, "El campo precio es obligatorio.");
        } else {
            clearError(formPrecio);
        }
    }

    function setError(input, message) {
        let errorId = "error" + input.id.charAt(0).toUpperCase() + input.id.slice(1);
        let errorElement = document.querySelector("#" + errorId);
        if (errorElement) {
            errorElement.textContent = message;
        } else {
            errorElement = document.createElement("div");
            errorElement.id = errorId;
            errorElement.classList.add("error-front");
            errorElement.textContent = message;
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        errores++;
    }

    function clearError(input) {
        let errorId = "error" + input.id.charAt(0).toUpperCase() + input.id.slice(1);
        let errorElement = document.querySelector("#" + errorId);
        if (errorElement) {
            errorElement.remove();
        }
        errores = Math.max(0, errores - 1);
    }
};
