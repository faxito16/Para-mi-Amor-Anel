
// Elementos del DOM
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

const screenWelcome = document.getElementById('screen-welcome');
const screenMenu = document.getElementById('screen-menu');
const screenNoThanks = document.getElementById('screen-no-thanks');
const tryAgainBtn = document.getElementById('try-again-btn');

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

const bouquetLetter = document.getElementById('bouquet-letter');
const flowerMessage = document.getElementById('flower-message');
const closeFlowerMessage = document.getElementById('flower-message-close');

function setFlowerMessageOpen(isOpen, restoreFocus = true) {
    if (!bouquetLetter || !flowerMessage) return;
    flowerMessage.hidden = !isOpen;
    bouquetLetter.setAttribute('aria-expanded', String(isOpen));
    if (isOpen && closeFlowerMessage) closeFlowerMessage.focus();
    if (!isOpen && restoreFocus) bouquetLetter.focus();
}

if (bouquetLetter) {
    bouquetLetter.addEventListener('click', () => setFlowerMessageOpen(true));
}

if (closeFlowerMessage) {
    closeFlowerMessage.addEventListener('click', () => setFlowerMessageOpen(false));
}

if (flowerMessage) {
    flowerMessage.addEventListener('click', event => {
        if (event.target === flowerMessage) setFlowerMessageOpen(false);
    });
}

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && flowerMessage && !flowerMessage.hidden) {
        setFlowerMessageOpen(false);
    }
});

const specialVideos = document.querySelectorAll('#screen-video2 video, #screen-video3 video');
specialVideos.forEach(video => {
    video.addEventListener('play', () => {
        songAudios.forEach(audio => audio.pause());
    });
});

// Acción al hacer clic en "YES PLEASE"
if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        screenWelcome.classList.remove('active');
        screenMenu.classList.add('active');
    });
}

if (noBtn) {
    noBtn.addEventListener('click', () => {
        screenWelcome.classList.remove('active');
        screenNoThanks.classList.add('active');
    });
}

if (tryAgainBtn) {
    tryAgainBtn.addEventListener('click', () => {
        screenNoThanks.classList.remove('active');
        screenWelcome.classList.add('active');
    });
}

// Función para abrir cada sección desde el menú principal
function openSection(sectionName) {
    screenMenu.classList.remove('active');

    const targetScreen = document.getElementById(`screen-${sectionName}`);
    if (targetScreen) {
        if (sectionName === 'flowers') {
            setFlowerMessageOpen(false, false);
            targetScreen.classList.remove('blooming');
            void targetScreen.offsetWidth;
            targetScreen.classList.add('blooming');
        }
        targetScreen.classList.add('active');
    }
}

// Función para regresar del menú principal a la pantalla de bienvenida
function goToWelcome() {
    screenMenu.classList.remove('active');
    screenWelcome.classList.add('active');
}

// Función para regresar al menú principal desde cualquier sección
const sectionsToResetOnReturn = new Set([
    'screen-video2',
    'screen-video3',
    'screen-pictures',
    'screen-flowers',
    'screen-letter'
]);

function resetSectionBeforeLeaving(screen) {
    if (!sectionsToResetOnReturn.has(screen.id)) {
        return;
    }

    if (screen.id === 'screen-flowers') {
        setFlowerMessageOpen(false, false);
        screen.classList.remove('blooming');
    }

    const isSpecialVideoScreen = screen.id === 'screen-video2' || screen.id === 'screen-video3';
    screen.querySelectorAll('video').forEach(video => {
        video.pause();

        if (isSpecialVideoScreen) {
            // Reloading resets playback and restores the HTML poster image.
            video.load();
            return;
        }

        try {
            video.currentTime = 0;
        } catch (error) {
            video.load();
        }
    });

    screen.querySelectorAll('.card-container, .letter-text').forEach(element => {
        element.scrollTop = 0;
    });
}

function goBackToMenu() {
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        if (screen.classList.contains('active')) {
            resetSectionBeforeLeaving(screen);
        }
        screen.classList.remove('active');
    });
    screenMenu.classList.add('active');
}

document.querySelectorAll('[data-open-section]').forEach(control => {
    const openTarget = () => openSection(control.dataset.openSection);
    control.addEventListener('click', openTarget);

    if (control.getAttribute('role') === 'button') {
        control.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openTarget();
            }
        });
    }
});

document.querySelectorAll('[data-site-action]').forEach(control => {
    control.addEventListener('click', () => {
        if (control.dataset.siteAction === 'welcome') {
            goToWelcome();
        } else if (control.dataset.siteAction === 'menu') {
            goBackToMenu();
        }
    });
});

