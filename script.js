//Aqui colocare mis constantes
document.addEventListener('DOMContentLoaded', function() {
    const botonEncriptar = document.querySelector('.encriptar');
    const botonDesencriptar = document.querySelector('.desencriptar');
    const textoEntrada = document.getElementById('input-text');
    const mensajeEncriptadoDiv = document.getElementById('mensaje-encriptado');
    const botonCopiar = document.getElementById('copy-button');
    const imagenRobot = document.querySelector('.imagen');

//llave de encriptacion
    const llavesEncriptacion = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const llavesDesencriptacion = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

//funcion para Encriptar
    function encriptarTexto(texto) {
        return texto.replace(/[eioua]/g, function(match) {
            return llavesEncriptacion[match];
        });
    }

//Funcion para Desencriptar
    function desencriptarTexto(texto) {
        return texto.replace(/enter|imes|ai|ober|ufat/g, function(match) {
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

    function validarEntrada(texto) {
        var regex = /^[a-z]+$/;
        return regex.test(texto);
    }

    botonEncriptar.addEventListener('click', function() {
        let entrada = textoEntrada.value;
        if (entrada && validarEntrada(entrada)) {
            let textoEncriptado = encriptarTexto(entrada);
            mostrarMensaje(textoEncriptado);
        } else {
            alert("El texto solo debe contener letras minúsculas sin acentos.");
            mostrarMensajeDefault();
        }
    });

    botonDesencriptar.addEventListener('click', function() {
        let entrada = textoEntrada.value;
        if (entrada && validarEntrada(entrada)) {
            let textoDesencriptado = desencriptarTexto(entrada);
            mostrarMensaje(textoDesencriptado);
        } else {
            alert("El texto solo debe contener letras minúsculas sin acentos.");
            mostrarMensajeDefault();
        }
    });

//Boton de copiado
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
