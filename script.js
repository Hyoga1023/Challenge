//aqui van a ir las constantes que usare en mi codigo
document.addEventListener('DOMContentLoaded', function() {
    const botonEncriptar = document.querySelector('.encriptar');
    const botonDesencriptar = document.querySelector('.desencriptar');
    const textoEntrada = document.getElementById('input-text');
    const mensajeEncriptadoDiv = document.getElementById('mensaje-encriptado');
    const botonCopiar = document.getElementById('copy-button');
    const imagenRobot = document.querySelector('.imagen');

//llaves de encriptación
    const llavesEncriptacion = {
        'e': 'en1er',
        'i': 'i2mes',
        'a': 'ai3',
        'o': '4ober',
        'u': 'uf5at'
    };

    const llavesDesencriptacion = {
        'en1er': 'e',
        'i2mes': 'i',
        'ai3': 'a',
        '4ober': 'o',
        'uf5at': 'u'
    };

//funcion para encriptar texto
    function encriptarTexto(texto) {
        return texto.replace(/[eioua]/g, function(match) {
            return llavesEncriptacion[match];
        });
    }

//funcion para desencriptar texto
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

//determina letras minusculas sin acentos permitiendo espacios
    function validarEntrada(texto) {
        console.log("Validando entrada:", texto);
        var regex = /^[a-z\s]+$/;
        return regex.test(texto);
    }

//funcion de los botones
    botonEncriptar.addEventListener('click', function() {
        let entrada = textoEntrada.value.trim();
        console.log("Entrada para encriptar:", entrada);
        if (entrada && validarEntrada(entrada)) {
            let textoEncriptado = encriptarTexto(entrada);
            mostrarMensaje(textoEncriptado);
        } else {
            alert("El texto solo debe contener letras minúsculas sin acentos.");
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
            alert("El texto solo debe contener letras minúsculas sin acentos.");
            mostrarMensajeDefault();
        }
    });

//boton de copiado    
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
