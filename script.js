
// Elementos del DOM
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

const screenWelcome = document.getElementById('screen-welcome');
const screenMenu = document.getElementById('screen-menu');
const screenNoThanks = document.getElementById('screen-no-thanks');
const tryAgainBtn = document.getElementById('try-again-btn');
let noBtnEscaped = false;

const songAudios = document.querySelectorAll('#screen-song audio');
songAudios.forEach(audio => {
    audio.addEventListener('play', () => {
        songAudios.forEach(otherAudio => {
            if (otherAudio !== audio) {
                otherAudio.pause();
            }
        });
    });
});

// Acción al hacer clic en "YES PLEASE"
if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        screenWelcome.classList.remove('active');
        screenMenu.classList.add('active');
    });
}

// El botón escapa una vez y luego se puede elegir normalmente.
if (noBtn) {
    noBtn.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'mouse' || noBtnEscaped) {
            return;
        }

        noBtnEscaped = true;
        const randomX = Math.random() * 220 - 110;
        const randomY = Math.random() * 120 - 60;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    noBtn.addEventListener('click', () => {
        screenWelcome.classList.remove('active');
        screenNoThanks.classList.add('active');
    });
}

if (tryAgainBtn) {
    tryAgainBtn.addEventListener('click', () => {
        screenNoThanks.classList.remove('active');
        screenWelcome.classList.add('active');
        noBtn.style.transform = '';
        noBtnEscaped = false;
    });
}

// Función para abrir cada sección desde el menú principal
function openSection(sectionName) {
    screenMenu.classList.remove('active');

    const targetScreen = document.getElementById(`screen-${sectionName}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Función para regresar del menú principal a la pantalla de bienvenida
function goToWelcome() {
    screenMenu.classList.remove('active');
    screenWelcome.classList.add('active');
}

// Función para regresar al menú principal desde cualquier sección
function goBackToMenu() {
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => screen.classList.remove('active'));
    screenMenu.classList.add('active');
}

