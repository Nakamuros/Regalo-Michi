/* =========================================
   1. CONTADOR DE TIEMPO JUNTOS
   ========================================= */
// Ajusta la fecha aquí si quieres que cuente desde el noviazgo (16 Dic) o desde que se conocieron
const fechaInicio = new Date("2025-09-13T00:00:00"); 

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

/* =========================================
   2. MODO OSCURO / CLARO
   ========================================= */
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

// Cargar preferencia guardada
if(localStorage.getItem('theme') === 'night') {
    html.setAttribute('data-theme', 'night');
}

if(themeBtn) {
    themeBtn.addEventListener('click', () => {
        if(html.getAttribute('data-theme') === 'day') {
            html.setAttribute('data-theme', 'night');
            localStorage.setItem('theme', 'night');
        } else {
            html.setAttribute('data-theme', 'day');
            localStorage.setItem('theme', 'day');
        }
    });
}

/* =========================================
   3. LLUVIA DE CORAZONES
   ========================================= */
function lluviaCorazones() {
    const emojis = ['❤️', '💖', '🥰', '😍', '💘', '👩‍❤️‍👨'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.classList.add('confetti');
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's'; 
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}
window.lluviaCorazones = lluviaCorazones;

/* =========================================
   4. POLAROIDS EN LA MESA (DRAG & DROP)
   ========================================= */
// Funcionalidad para mover las fotos "sueltas" en la sección de polaroids
const polaroids = document.querySelectorAll('.polaroid');
let zIndex = 1;

polaroids.forEach(polaroid => {
    polaroid.addEventListener('mousedown', (e) => {
        zIndex++;
        polaroid.style.zIndex = zIndex; 
        
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
    
    polaroid.ondragstart = function() { return false; };
});

/* =========================================
   5. TIMELINE HORIZONTAL (DATOS ACTUALIZADOS)
   ========================================= */

const historiaData = [
    {
        fecha: "13 de Septiembre",
        texto: "Nos conocimos sin saber lo mucho que mi vida iba a cambiar.",
        media: [] // <--- ¡DEJAR VACÍO! (Sin fotos)
    },
    {
        fecha: "20 de Septiembre",
        texto: "Nuestra primera cita, estuve muy nervioso intentando que todo vaya bien.",
        media: [
            { type: 'img', src: 'img/20 septiembre1.jpeg' }, 
            { type: 'img', src: 'img/20 septiembre 2.jpeg' } // Ojo: espacio antes del 2
        ]
    },
    {
        fecha: "27 de Septiembre",
        texto: "Segunda cita y nuestro primer beso. Llegué muy feliz a casa sabiendo que te vería al día siguiente.",
        media: [
            { type: 'img', src: 'img/27 septiembre1.jpeg' },
            { type: 'img', src: 'img/27 septiembre2.jpeg' } // Aquí NO hay espacio (según captura)
        ]
    },
    {
        fecha: "28 de Septiembre",
        texto: "Almorzamos con tus papás y vimos nuestra primera película juntos.",
        media: [
            { type: 'img', src: 'img/28 septiembre.jpeg' }
        ]
    },
    {
        fecha: "18 de Octubre",
        texto: "Pasaron cositas... Conocí a tus amigos y te di tus primeras flores 🌹.",
        media: [
            { type: 'img', src: 'img/18 octubre.jpeg' }
        ]
    },
    {
        fecha: "25 de Octubre",
        texto: "Nuestra primera cenita juntos y ese pan con asado bien rico.",
        media: [
            { type: 'img', src: 'img/25 octubre1.jpeg' },
            { type: 'img', src: 'img/25 octubre2.jpeg' },
            { type: 'img', src: 'img/25 octubre3.jpeg' }
        ]
    },
    {
        fecha: "1 de Noviembre",
        texto: "Conociste a mi mamá y salimos de la monotonía en esa feria bonita.",
        media: [
            { type: 'img', src: 'img/1 noviembre.jpeg' }
        ]
    },
    {
        fecha: "8 de Noviembre",
        texto: "Cine por primera vez y Shawarma. ¡La única foto es michi!",
        media: [
            { type: 'img', src: 'img/8 noviembre.jpeg' }
        ]
    },
    {
        fecha: "15 de Noviembre",
        texto: "Primera cita tranquila en tu casita, la pasé muy bonito.",
        media: [
            { type: 'img', src: 'img/15 noviembre.jpeg' }
        ]
    },
    {
        fecha: "23 de Noviembre",
        texto: "El cumple de tu pa. No tengo foto de recuerdo, pero pasamos juntos ❤️.",
        media: [] // Sin media
    },
    {
        fecha: "29 de Noviembre",
        texto: "Fui a ayudarte con la tarea... y ni hablar de lo que pasó en la cocina 😉.",
        media: [
            { type: 'video', src: 'img/29 noviembre.mp4' }
        ]
    },
    {
        fecha: "16 de Diciembre",
        texto: "El día más feliz: ¡Te pedí que seas mi novia! 💍 La pasé muy bonito contigo mi amor.",
        media: [
            { type: 'img', src: 'img/16 diciembre1.jpeg' },
            { type: 'img', src: 'img/16 diciembre2.jpeg' },
            { type: 'img', src: 'img/16 diciembre3.jpeg' }
        ]
    },
    {
        fecha: "18 de Diciembre",
        texto: "Conociste a mi papá. Me encantó que durmieras en mi hombro al final del viaje.",
        media: [
            { type: 'img', src: 'img/18 diciembre.jpeg' }
        ]
    },
    {
        fecha: "23 de Diciembre",
        texto: "Nuestra mini navidad adelantada para darte tu regalo. Una cita muy tranquila.",
        media: [
            { type: 'video', src: 'img/23 diciembre.mp4' }
        ]
    },
    {
        fecha: "5 de Enero",
        texto: "Después de que me abandonaras porque no me querias, nos volvimos a ver, pintamos y nos quedamos todo el día juntos.",
        media: [
            { type: 'img', src: 'img/5 enero.jpeg' },
            { type: 'video', src: 'img/5 enero.mp4' }
        ]
    },
    {
        fecha: "7 de Enero",
        texto: "El gesto más bonito: viniste hasta mi casa con regalos y nos quedamos en la terraza. Te amo por existir en mi vida.",
        media: [
            { type: 'img', src: 'img/7 enero.jpeg' },
            { type: 'video', src: 'img/7 enero.mp4' }
        ]
    },
    {
        fecha: "9 de Enero",
        texto: "Mi cumple con mi familia y tú. Paseo de la manito en Miraflores. Te quiero tanto michita.",
        media: [
            { type: 'img', src: 'img/9 enero.jpeg' }
        ]
    }
];

// Lógica para pintar la línea de tiempo
const timelineContainer = document.getElementById('timeline-content');

if (timelineContainer) {
    historiaData.forEach((evento, index) => {
        const item = document.createElement('div');
        item.classList.add('t-item');

        // Generar HTML de Fotos/Videos
        let mediaHTML = '';
        if (evento.media.length > 0) {
            mediaHTML = '<div class="polaroid-group">';
            evento.media.forEach(archivo => {
                const rotacion = (Math.random() * 20) - 10; 
                
                if (archivo.type === 'video') {
                    mediaHTML += `
                        <div class="mini-polaroid" style="--rot: ${rotacion}deg">
                            <video controls>
                                <source src="${archivo.src}" type="video/mp4">
                                Tu navegador no soporta video.
                            </video>
                        </div>`;
                } else {
                    mediaHTML += `
                        <div class="mini-polaroid" style="--rot: ${rotacion}deg">
                            <img src="${archivo.src}" alt="Foto">
                        </div>`;
                }
            });
            mediaHTML += '</div>';
        }

        item.innerHTML = `
            ${mediaHTML}
            <div class="t-date">${evento.fecha}</div>
            <div class="t-message">${evento.texto}</div>
        `;

        if (evento.media.length === 0) {
            item.classList.add('solo-texto');
        }

        timelineContainer.appendChild(item);
    });
}