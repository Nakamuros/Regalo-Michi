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
        media: [] 
    },
    {
        fecha: "20 de Septiembre",
        texto: "Nuestra primera cita, estuve muy nervioso intentando que todo vaya bien.",
        media: [
            { type: 'img', src: 'img/20 septiembre1.jpeg' }, 
            { type: 'img', src: 'img/20 septiembre 2.jpeg' } 
        ]
    },
    {
        fecha: "27 de Septiembre",
        texto: "Segunda cita y nuestro primer beso. Llegué muy feliz a casa sabiendo que te vería al día siguiente.",
        media: [
            { type: 'img', src: 'img/27 septiembre1.jpeg' },
            { type: 'img', src: 'img/27 septiembre2.jpeg' }
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
        media: [] 
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
    },
    {
        fecha: "16 de Enero",
        texto: "Nuestro primer aniversario de 1 mes, recuerdo como nos moríamos de ganas de repetir nuestra primera cita, conmemorándola como recuerdo",
        media: [
            { type: 'video', src: 'img/16 enero.mp4' }
        ]
    },
    {
        fecha: "19 de Enero",
        texto: "Tu cumple michi, la pase muy bien en tu dia especial y me sentí afortunado de estar a tu lado en este dia tan especial, lo recuerdo con mucho amor",
        media: [
            { type: 'img', src: 'img/19 enero 2.jpeg' },
            { type: 'video', src: 'img/19 enero 1.mp4' }
        ]
    },
    {
        fecha: "6 de Febrero",
        texto: "Viniste a mi casita una vez mas, paseamos bajo la lluvia y disfrutamos mucho de nuestra compañia michi",
        media: [
            { type: 'img', src: 'img/6 febrero 2.jpeg' },
            { type: 'img', src: 'img/6 febrero 3.jpeg' },
            { type: 'video', src: 'img/6 febrero.mp4' }
        ]
    },
    {
        fecha: "11 de Febrero",
        texto: "Recuerdo ese dia claramente, estaba muy mal y estresado, no quería nada, sentí que mis emociones colapsaron y no sabia que hacer, muchas cosas estuve conteniendo pero mi vaso se derramo. Verte fue todo lo que necesite para reiniciar, fuiste mi respiro y mi salvadora. Además ese dia probamos por primera vez senpai michi, me gusto ese dia también porque en los últimos momentos de mi presencia, nos recostamos en la oscuridad y empezamos a hablar acerca de lo que queríamos a futuro y como nos veíamos.",
        media: [
            { type: 'img', src: 'img/11 febrero.jpeg' }
        ]
    },
    {
        fecha: "19 de Febrero",
        texto: "Salimos para celebrar nuestro segundo aniversario, recuerdo bien que estabas ocupadita por parciales asi que acordamos ese dia. Conociste a mis amigos del colegio, visitamos mi antiguo depa, comimos en un lugar muy rico, fuimos al cine, nos probamos ropa y finalmente cenamos un bembos. De verdad que este fue uno de mis días favoritos michi, y algo me dice que también fue el tuyo :c porfavor regresa a mi",
        media: [
            { type: 'img', src: 'img/19 febrero.jpeg' },
            { type: 'img', src: 'img/19 febrero 3.jpeg' },
            { type: 'video', src: 'img/19 febrero 2.mp4' }
        ]
    },
    {
        fecha: "22 de Febrero",
        texto: "Conoci por primera vez a tu familia, a tu hermana, a su esposo y a tus sobrinos. Desayunamos juntos, salimos un rato al parque porque necesitabas paz y tranquilidad, una escapatoria del ruido de tu hogar. Y ese gordo en la foto que se colaba como bueno JAJAJAJA. Fue un placer total conocer a tu familia, me gusto mucho compartir tiempo con ellos",
        media: [
            { type: 'img', src: 'img/22 febrero.jpeg' },
            { type: 'img', src: 'img/22 febrero 2.jpeg' }
        ]
    },
    {
        fecha: "3 de Marzo",
        texto: "Acabaste tu ciclo de verano, el curso mas terrible que hasta a mi me dio miedo, morfo 4 el terror de todos. Me gusto mucho acompañarte en tu relajo total",
        media: [
            { type: 'video', src: 'img/3 marzo.mp4' }
        ]
    },
    {
        fecha: "7 de Marzo",
        texto: "Tambien recuerdo ese dia, tenias que ir a la universidad para ver tu examen, la primera vez que estuve cerca a la ucsur, acompañarte para pelear tu nota y de ahi esperarte a que termines. Y enterarte que pasaste fue la sensación mas bonita que vi en ti, 0 miedo y felicidad pura, esa es la michi que yo conozco.",
        media: [] 
    },
    {
        fecha: "10 de Marzo",
        texto: "Recuerdo bien ese dia, viniste a mi cerrito para ir a la piscina. Nadamos jugamos mucho, luego regresamos a casa y jugamos valorant después de acurrucarnos un ratito.",
        media: [
            { type: 'img', src: 'img/10 marzo.jpeg' },
            { type: 'video', src: 'img/10 marzo.mp4' }
        ]
    },
    {
        fecha: "12 de Marzo",
        texto: "Recuerdo que tuvimos una cita porque si, fuimos a almorzar una comida fit, fuimos a ver periféricos y de ahi al cine. Me gustaban ese tipo de citas, donde hacemos mucho en un solo dia, me gustaba estar a tu lado y mucho",
        media: [
            { type: 'img', src: 'img/12 marzo.jpeg' },
            { type: 'img', src: 'img/12 marzo 2.jpeg' }
        ]
    },
    {
        fecha: "16 de Marzo",
        texto: "Uno de los mejores aniversarios, manejamos bici toda la mañana hasta la tarde, almorzamos en Oxxo recuerdo, y luego en la noche salimos a una cita a una cafeteria que ya tenias rato pensando. La pase muy bien, lo único malo es que tuve que aliviar mi estomago en plena plaza de barranco. No sabes lo mucho que aprecie ese dia, estar todo un dia juntos es lo mejor que el destino me pudo haber dado.",
        media: [
            { type: 'img', src: 'img/16 marzo.jpeg' },
            { type: 'img', src: 'img/16 marzo 2.jpeg' },
            { type: 'img', src: 'img/16 marzo 3.jpeg' },
            { type: 'img', src: 'img/16 marzo 4.jpeg' },
            { type: 'img', src: 'img/16 marzo 5.jpeg' }
        ]
    },
    {
        fecha: "20 de Marzo",
        texto: "Ese dia estuvimos todo el dia juntos recuerdo bien, me mostraste el episodio de el circo digital, nos alistamos juntos y fuimos al cumple de mi amigo Gianluca. De no ser por el no te hubiera conocido. Fue divertido al final porque nos dimos unos toques y comimos ese cheesecake que estaba riquisimo. Estando incluso en ese estado de locura, te busque y supe que te quería para siempre.",
        media: [
            { type: 'img', src: 'img/20 marzo.jpeg' },
            { type: 'video', src: 'img/20 marzo.mp4' }
        ]
    },
    {
        fecha: "24 de Marzo",
        texto: "Fuimos a un museo, al LUM, y opinamos igual: no nos gusto para nada y nos aburrimos mucho. Ese dia estaba ajustado con el dinero pero aun asi alcance para comprar su subway y finalmente de sorpresa nos metimos a ver una pelicula de la nada. Era una peli que quería ver a tu lado michi, y se dio. Lamento que al final de ese dia te hayas sentido mal michi, pero fue un gran dia de todos modos",
        media: [
            { type: 'img', src: 'img/24 marzo.jpeg' }
        ]
    },
    {
        fecha: "26 de Marzo",
        texto: "Prácticamente el ultimo dia de verano, la pasamos únicamente los dos, piscina, almuerzo chill en mi casa, probamos la pizza que tanto te hablaba. En fin, un dia que no quería que acabase nunca. Hasta fuimos corriendo al paradero porque ya había llegado tu carro",
        media: [
            { type: 'video', src: 'img/26 marzo.mp4' }
        ]
    },
    {
        fecha: "4 de Abril",
        texto: "Luego de una larga semana nos vimos, los sábados como era de costumbre. Solo el vernos ya era suficiente para mi michita.",
        media: [
            { type: 'img', src: 'img/4 abril.jpeg' },
            { type: 'img', src: 'img/4 abril 3.jpeg' }
        ]
    },
    {
        fecha: "11 de Abril",
        texto: "Recuerdo llegar antes a tu casa y tu papa me recibió en lo que te esperábamos. Considero que los fines de semana eran los días en los cuales podíamos calmarnos y dejar de lado las responsabilidades de la universidad. Y que todo sea nosotros, ver pelis, comer alguito, solo los dos y la milou",
        media: [
            { type: 'img', src: 'img/11 abril.jpeg' },
            { type: 'video', src: 'img/11 abril.mp4' }
        ]
    },
    {
        fecha: "19 de Abril",
        texto: "No tomamos fotos a ese dia, solo estábamos juntitos, yo se que nos estábamos queriendo mucho",
        media: [
            { type: 'img', src: 'img/19 abril.jpeg' } 
        ]
    },
    {
        fecha: "26 de Abril",
        texto: "Lamento demasiado lo que paso en esa semana, en verdad lo siento mucho. Recuerdo que este dia empezó incomodo para los dos, fuimos al hipódromo juntos, el dia que conociste a mis amigos, almorzamos juntos y luego hablamos y hablamos. En verdad que estoy arrependito de hacerte pasar malos momentos, se que digo esto siempre y quiero que sepas que JAMAS lo hago a propósito, no lo hago con la intención de hacerte sufrir mi niña. No sabia lo que estaba haciendo, lo que hacia con la unica persona que me quiso por como fui.",
        media: [
            { type: 'img', src: 'img/26 abril.jpeg' },
            { type: 'img', src: 'img/26 abril 2.jpeg' },
            { type: 'img', src: 'img/26 abril 3.jpeg' }
        ]
    },
    {
        fecha: "9 de Mayo",
        texto: "Como el dia que venia era el dia de la madre, nos vimos el sábado. Recuerdo que ese dia te regale unas flores bonitas hechas de limpia pipas. Verte feliz siempre fue lo mejor de mis díasA y también use tu baño por primera vez para dejar de peso.",
        media: [
            { type: 'video', src: 'img/9 mayo.mp4' }
        ]
    },
    {
        fecha: "16 de Mayo",
        texto: "Salir a hacer un buen plan fue difícil, nos encontrábamos en un punto en el cual la universidad nos consumia. Al menos la pasamos juntos, nos quisimos mucho, estudiamos mucho, y como siempre, era muy bonito verte michi por favor regresa a mi",
        media: [
            { type: 'video', src: 'img/16 mayo.mp4' },
            { type: 'video', src: 'img/16 mayo 2.mp4' }
        ]
    },
    {
        fecha: "25 de Mayo",
        texto: "Fue una sorpresa que hayas decidio venir a mi depa. Compartimos mucho ese dia, comimos 2 pizzas, estudiamos, hicimos trabajos a ultima hora y vimos una de mis pelis favoritas michi. Me viste feliz por comprarme unos perfumes, me gusto siempre estar contigo",
        media: [
            { type: 'img', src: 'img/25 mayo.jpeg' },
            { type: 'img', src: 'img/25 mayo 3.jpeg' },
            { type: 'video', src: 'img/25 mayo 2.mp4' }
        ]
    },
    {
        fecha: "31 de Mayo",
        texto: "Fuimos a ver los backrooms en los backrooms, pero antes comimos con tus papis en punto de limon, ese ceviche estaba bueno pero no me iba a comer esa bellaka pirámide de conchas negras. Recuerdo que en el cine queríamos matar a ese chibolo que no paraba de gritar. El camino de regreso estaba chispeando un poco, y tenia miedo que me violen. Pero fue bonito regresar juntitos tomados de la mano.",
        media: [
            { type: 'img', src: 'img/31 mayo.jpeg' },
            { type: 'video', src: 'img/31 mayo.mp4' }
        ]
    },
    {
        fecha: "5 de Junio",
        texto: "Luego de esperar mucho tiempo, porfin fuimos al cine a ver el ultimo episodio del circo digital. Si te soy honesto, hubo una parte en la cual me proyecte con jax, me sentí mal porque sabia que hacia daño, sobre todo a ti. Nunca fue apropósito en verdad, lo juro que nunca era asi. No quiero dar cringe ni nada pero al final del dia, te consideraba como mi ponmi, aun asi me querias por como era. Perdon si nunca lo reconoci",
        media: [
            { type: 'video', src: 'img/5 junio.mp4' }
        ]
    },
    {
        fecha: "6 de Junio",
        texto: "Gracias por estar presente en el festejo del cumple de mi hermana, aun me da roche que me hayas visto loquearme en la pista de baile y sobretodo por el apagon que vino de la nada. Me gusto mucho ese dia y como estabas conmigo y mi familia.",
        media: [] 
    },
    {
        fecha: "20 de Junio",
        texto: "La pasamos en tu casa y en la noche vinieron tus amigos para pasar el momento. Como siempre estoy agradecido de que me incluyeras en esos planes michi, siempre lo estaré y lo llevo en mi corazon.",
        media: [] 
    },
    {
        fecha: "21 de Junio",
        texto: "Nos vimos dos días seguidos, algo que siempre me gustaba, estar a tu ladito varios días seguidos y querernos mucho. Recuerdo que ese dia se celebro nuestro sexto aniversario, con un shawarma y una promesa de ambos de cambiar nuestros habitos alimenticios. Aunque haya sido un tiempo corto ese dia, vivimos muchas emociones",
        media: [
            { type: 'img', src: 'img/21 junio.jpeg' },
            { type: 'video', src: 'img/21 junio 2.mp4' }
        ]
    },
    {
        fecha: "29 de Junio",
        texto: "Salimos a pasear al parque Kennedy, comimos la lucha porque se nos había antojado y vaya que lo disfrute, olimos perfumes y me explicaste acerca de los productos de maquillajes. Recuerdo también que querias una casaca de cuero asi bien chévere. Luego vimos la pelicula mas mid de la historia. En fin locuras michi.",
        media: [
            { type: 'video', src: 'img/29 junio.mp4' },
            { type: 'video', src: 'img/29 junio 2.mp4' },
            { type: 'video', src: 'img/29 junio 3.mp4' }
        ]
    },
    {
        fecha: "12 de Julio",
        texto: "Perdon michi, de verdad que hacer este gesto me pone triste porque los recuerdos inundan mi cabeza. La pizza casera mas rica que probe en mi vida, me la hiciste tu. Te ayude para tu examen, fui el muñeco de pruebas. Y pensar que ese fue el ultimo dia que te vi. En verdad no creo nada de lo que esta pasando. Lo siento michi, en verdad de te extraño como no tienes idea. Si llegaste hasta aca, te deje una carta.",
        media: [
            { type: 'img', src: 'img/12 julio.jpeg' }
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