// 1. Contador de Tiempo Juntos
const fechaInicio = new Date("2025-09-13T23:00:00"); // <--- ¡PON TU FECHA AQUÍ! (Formato YYYY-MM-DD)

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / 1000 / 60) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    const contadorDiv = document.getElementById('contador');
    if(contadorDiv) {
        contadorDiv.innerHTML = `
            Llevamos juntos: <br>
            <strong>${dias}</strong> días, <strong>${horas}</strong> horas, 
            <strong>${minutos}</strong> minutos y <strong>${segundos}</strong> segundos.
        `;
    }
}
setInterval(actualizarContador, 1000);

// 2. Modo Oscuro / Claro
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

// Revisar si ya había guardado preferencia
if(localStorage.getItem('theme') === 'night') {
    html.setAttribute('data-theme', 'night');
}

themeBtn.addEventListener('click', () => {
    if(html.getAttribute('data-theme') === 'day') {
        html.setAttribute('data-theme', 'night');
        localStorage.setItem('theme', 'night');
    } else {
        html.setAttribute('data-theme', 'day');
        localStorage.setItem('theme', 'day');
    }
});

// 3. Polaroids Draggable (Arrastrar y Soltar)
const polaroids = document.querySelectorAll('.polaroid');
let zIndex = 1;

polaroids.forEach(polaroid => {
    polaroid.addEventListener('mousedown', (e) => {
        zIndex++;
        polaroid.style.zIndex = zIndex; // Traer al frente al hacer click
        
        let shiftX = e.clientX - polaroid.getBoundingClientRect().left;
        let shiftY = e.clientY - polaroid.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            polaroid.style.left = pageX - shiftX + 'px';
            polaroid.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            polaroid.onmouseup = null;
        };
    });
    
    // Evitar el drag por defecto del navegador en imágenes
    polaroid.ondragstart = function() {
        return false;
    };
});

// 4. Lluvia de Corazones
function lluviaCorazones() {
    const emojis = ['❤️', '💖', '🥰', '😍', '💘'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.classList.add('confetti');
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // Entre 3 y 5 segundos
        document.body.appendChild(heart);

        // Eliminar del DOM al terminar animación
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}