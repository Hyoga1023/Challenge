document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        botonEncriptar: document.querySelector('.encriptar'),
        botonDesencriptar: document.querySelector('.desencriptar'),
        textoEntrada: document.getElementById('input-text'),
        mensajeEncriptadoDiv: document.getElementById('mensaje-encriptado'),
        botonCopiar: document.getElementById('copy-button'),
        imagenRobot: document.querySelector('.imagen'),
    };

    const llavesEncriptacion = {
        'e': 'xn1er',
        'i': '!2mes',
        'a': 'qi3',
        'o': '4ber',
        'u': 'uf5at',
        'y': '6z7',
    };

    const llavesDesencriptacion = Object.fromEntries(
        Object.entries(llavesEncriptacion).map(([key, value]) => [value, key])
    );

    const encriptarTexto = texto =>
        texto.replace(/[eiouay]/g, match => llavesEncriptacion[match]);

    const desencriptarTexto = texto =>
        texto.replace(/xn1er|!2mes|qi3|4ber|uf5at|6z7/g, match => llavesDesencriptacion[match]);

    const mostrarMensaje = mensaje => {
        elements.mensajeEncriptadoDiv.innerHTML = `<p>${mensaje}</p>`;
        elements.botonCopiar.style.display = 'block';
        elements.imagenRobot.classList.add('oculto');
    };

    const mostrarMensajeDefault = () => {
        elements.mensajeEncriptadoDiv.innerHTML = `
            <h2>Ningún mensaje fue encontrado</h2>
            <p>Ingresa el texto que desees encriptar o desencriptar.</p>`;
        elements.botonCopiar.style.display = 'none';
        elements.imagenRobot.classList.remove('oculto');
    };

    function validarEntrada(texto) {
        console.log("Validando entrada:", texto);
        var regex = /^[a-záéíóúüñ0-9\s.,!?¿¡:;()'"&%$#@*-]+$/i;
        return regex.test(texto);
    }
    
    const manejarTexto = (accion) => {
        const entrada = elements.textoEntrada.value.trim();
        console.log(`Entrada para ${accion}:`, entrada);

        if (entrada && validarEntrada(entrada)) {
            const textoProcesado =
                accion === 'encriptar' ? encriptarTexto(entrada) : desencriptarTexto(entrada);
            mostrarMensaje(textoProcesado);
        } else {
            alert("El texto solo debe contener letras, números, tildes y espacios.");
            mostrarMensajeDefault();
        }
    };

    elements.botonEncriptar.addEventListener('click', () => manejarTexto('encriptar'));
    elements.botonDesencriptar.addEventListener('click', () => manejarTexto('desencriptar'));

    elements.botonCopiar.addEventListener('click', () => {
        const textoEncriptado = elements.mensajeEncriptadoDiv.innerText;
        navigator.clipboard
            .writeText(textoEncriptado)
            .then(() => {
                alert('Texto copiado al portapapeles');
                elements.textoEntrada.value = '';
                mostrarMensajeDefault();
            })
            .catch(err => console.error('Error al copiar el texto:', err));
    });
});
