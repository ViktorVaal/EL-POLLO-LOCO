let canvas;
let world;
let menu;
let width;
let height;
let gameHud;
let intervsalIds = [];
let keyboard = new Keyboard();
let gameOverCheck;
let volumeUp;
let volumeOff;
let muted;
let youWinAudio = new Audio('audio/you_win.mp3');
let youLoseAudio = new Audio('audio/you_lose.mp3');
backgroundMusik = new Audio("audio/backgroundMusik.mp3");
backgroundMusik.loop = true;

function checkifMobile() {
    width = innerWidth;
    height = innerHeight;
    let rotateDeviceRef = document.getElementById("rotateDevice");
    if (height > width && width <= 768) {
        rotateDeviceRef.style.display = "flex";
    } else {
        rotateDeviceRef.style.display = "none";
        showMobileButtons();
    }
}

function showMobileButtons() {
    let mobileBtnsRef = document.getElementById("mobileBtns");
    if (width <= 1300) {
        mobileBtnsRef.style.display = "flex";
        activateMobileButtons();
    } else {
        mobileBtnsRef.style.display = "none";

    }
}

function startGame() {
    menu = document.getElementById("menu")
    canvas = document.getElementById("canvas");
    gameHud = document.getElementById("gameHud");
    backgroundMusik.play();
    initLevel();
    init();
    setVolume();
}

function init() {
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    gameHud.style.display = "block"
    menu.style.display = "none"
    checkGameOverLoop();
}

function restartGame() {
    world.destroy();
    clearInterval(gameOverCheck);
    document.getElementById("youWon").style.display = "none";
    document.getElementById("youLose").style.display = "none";
    startGame();
}

function showHomeScreen() {
    world.destroy();
    clearInterval(gameOverCheck);
    menu.style.display = "flex";
    document.getElementById("youLose").style.display = "none";
    document.getElementById("youWon").style.display = "none";
}

function checkGameOverLoop() {
    gameOverCheck = setInterval(() => {
        if (world?.level.enemies[world.level.enemies.length - 1].energy == 0) {
            clearInterval(gameOverCheck);
            setTimeout(() => {
                playAudio(true);
                world.destroy();
                gameHud.style.display = "none";
                document.getElementById("youWon").style.display = "flex";
            }, 1500);
        } else if (world?.character.energy == 0) {
            clearInterval(gameOverCheck);
            setTimeout(() => {
                playAudio(false);
                world.destroy();
                gameHud.style.display = "none";
                document.getElementById("youLose").style.display = "flex";
            }, 1500);
        }
    }, 20);
}

function playAudio(victory) {
    if (victory) {
        world.endBattleAudio.pause();
        world.playAudio(youWinAudio);
    } else {
        world.endBattleAudio.pause();
        backgroundMusik.pause();
        world.playAudio(youLoseAudio);
    }
}

function toggleVolumeImage() {
    volumeUp = document.getElementById("volumeUp");
    volumeOff = document.getElementById("volumeOff");
    if (volumeUp.classList.contains("d-none")) {
        volumeOff.classList.add("d-none");
        volumeUp.classList.remove("d-none");
        setVolume();
    } else {
        volumeOff.classList.remove("d-none");
        volumeUp.classList.add("d-none");
        setVolume();
    }
}

function setVolume() {
    volumeUp = document.getElementById("volumeUp");
    volumeOff = document.getElementById("volumeOff");
    if (!volumeOff.classList.contains("d-none")) {
        world.muted = true;
        backgroundMusik.pause();
    } else {
        backgroundMusik.play();
        world.muted = false;
        world.playMusik();
    }
}

window.addEventListener('keydown', (event) => {
    let key = event.code.toLocaleUpperCase();
    keyboard[key] = true;
    if (event.repeat && key == "KEYD") {
        keyboard[key] = false;
    }
});

window.addEventListener('keyup', (event) => {
    let key = event.code.toLocaleUpperCase();
    keyboard[key] = false;
});

function activateMobileButtons() {
    document.getElementById('moveLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.ARROWLEFT = true;
    });

    document.getElementById('moveLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.ARROWLEFT = false;
    });

    document.getElementById('moveRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.ARROWRIGHT = true;
    });

    document.getElementById('moveRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.ARROWRIGHT = false;
    });

    document.getElementById('jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KEYD = true;
    });

    document.getElementById('throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KEYD = false;
    });

    document.getElementById('volume').addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleVolumeImage();
    });
};

