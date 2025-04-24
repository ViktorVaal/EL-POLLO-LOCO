let canvas;
let world;
let menu;
let gameHud;
let intervsalIds = [];
let keyboard = new Keyboard();
let gameOverCheck;
let volumeUp;
let volumeOff;
let youWinAudio = new Audio('audio/you_win.mp3');
let youLoseAudio = new Audio('audio/you_lose.mp3');
backgroundMusik = new Audio("audio/backgroundMusik.mp3");

function checkifMobile() {
    let width = innerWidth;
    let height = innerHeight;
    let rotateDeviceRef = document.getElementById("rotateDevice");
    if (height > width && width <= 768) {
        rotateDeviceRef.style.display = "flex"
    } else {
        rotateDeviceRef.style.display = "none"
    }
}

function startGame() {
    menu = document.getElementById("menu")
    canvas = document.getElementById("canvas");
    gameHud = document.getElementById("gameHud");
    backgroundMusik.play();
    initLevel();
    init();
}

function init() {
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    gameHud.style.display = "block"
    menu.style.display = "none"
    checkGameOverLoop();
    checkVolume();
}

function restartGame() {
    world.destroy();
    clearInterval(gameOverCheck);
    document.getElementById("youWon").style.display = "none";
    document.getElementById("youLose").style.display = "none";
    initLevel();
    init();
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
        world.backgroundMusik.pause();
        world.playAudio(youLoseAudio);
    }
}

function toggleVolume() {
    volumeUp = document.getElementById("volumeUp");
    volumeOff = document.getElementById("volumeOff");
    if (volumeUp.style.display == "block") {
        volumeOff.style.display = "block";
        volumeUp.style.display = "none";
        world.muted = true;
    } else {
        volumeOff.style.display = "none";
        volumeUp.style.display = "block";
        world.muted = false;
        world.playMusik(); 
    }
}

function checkVolume() {
    volumeUp = document.getElementById("volumeUp");
    volumeOff = document.getElementById("volumeOff");
    if (volumeOff.style.display == "block") {
        world.muted = true;
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

