
// Elementos del DOM
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

const screenWelcome = document.getElementById('screen-welcome');
const screenMenu = document.getElementById('screen-menu');

// Acción al hacer clic en "YES PLEASE"
if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        screenWelcome.classList.remove('active');
        screenMenu.classList.add('active');
    });
}

// Acción divertida para el botón "NO THANKS" (Se mueve al pasar el mouse)
if (noBtn) {
    noBtn.addEventListener('mouseover', () => {
        const randomX = Math.random() * 220 - 110;
        const randomY = Math.random() * 120 - 60;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
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

