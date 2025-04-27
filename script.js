document.addEventListener('DOMContentLoaded', function() {
    const botonEncriptar = document.querySelector('.encriptar');
    const botonDesencriptar = document.querySelector('.desencriptar');
    const textoEntrada = document.getElementById('input-text');
    const mensajeEncriptadoDiv = document.getElementById('mensaje-encriptado');
    const botonCopiar = document.getElementById('copy-button');
    const imagenRobot = document.querySelector('.imagen');

    // Llaves de encriptación
    const llavesEncriptacion = {
        'e': 'xn1er',
        'i': '!2mes',
        'a': 'qi3',
        'o': '4ber',
        'u': 'uf5at',
        'y': '6z7'
    };

    const llavesDesencriptacion = {
        'xn1er': 'e',
        '!2mes': 'i',
        'qi3': 'a',
        '4ber': 'o',
        'uf5at': 'u',
        '6z7': 'y'
    };

    // Función para encriptar texto
    function encriptarTexto(texto) {
        return texto.replace(/[eiouay]/g, function(match) {
            return llavesEncriptacion[match];
        });
    }

    // Función para desencriptar texto
    function desencriptarTexto(texto) {
        return texto.replace(/xn1er|!2mes|qi3|4ber|uf5at|6z7/g, function(match) {
            return llavesDesencriptacion[match];
        });
    }

    function mostrarMensaje(mensaje) {
        mensajeEncriptadoDiv.innerHTML = `<p>${mensaje}</p>`;
        botonCopiar.style.display = 'block';
        imagenRobot.classList.add('oculto');
    }

    function mostrarMensajeDefault() {
        mensajeEncriptadoDiv.innerHTML = `<h2>Ningún mensaje fue encontrado</h2>
                                          <p>Ingresa el texto que desees encriptar o desencriptar.</p>`;
        botonCopiar.style.display = 'none';
        imagenRobot.classList.remove('oculto');
    }

    // Modificar validación para permitir letras con tildes, números y espacios
    function validarEntrada(texto) {
        console.log("Validando entrada:", texto);
        var regex = /^[a-záéíóúüñ0-9\s]+$/i; // Acepta letras con tildes, números y espacios
        return regex.test(texto);
    }

    // Función de los botones
    botonEncriptar.addEventListener('click', function() {
        let entrada = textoEntrada.value.trim();
        console.log("Entrada para encriptar:", entrada);
        if (entrada && validarEntrada(entrada)) {
            let textoEncriptado = encriptarTexto(entrada);
            mostrarMensaje(textoEncriptado);
        } else {
            alert("El texto solo debe contener letras, números, tildes y espacios.");
            mostrarMensajeDefault();
        }
    });

    botonDesencriptar.addEventListener('click', function() {
        let entrada = textoEntrada.value.trim();
        console.log("Entrada para desencriptar:", entrada);
        if (entrada && validarEntrada(entrada)) {
            let textoDesencriptado = desencriptarTexto(entrada);
            mostrarMensaje(textoDesencriptado);
        } else {
            alert("El texto solo debe contener letras, números, tildes y espacios.");
            mostrarMensajeDefault();
        }
    });

    // Botón de copiado    
    botonCopiar.addEventListener('click', function() {
        let textoEncriptado = mensajeEncriptadoDiv.innerText;
        navigator.clipboard.writeText(textoEncriptado).then(function() {
            alert('Texto copiado al portapapeles');
            textoEntrada.value = '';
            mostrarMensajeDefault();
        }).catch(function(err) {
            console.error('Error al copiar el texto: ', err);
        });
    });
});
