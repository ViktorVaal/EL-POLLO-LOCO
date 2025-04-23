let canvas;
let world;
let menu;
let intervsalIds = [];
let keyboard = new Keyboard();
let gameOverCheck;
let youWinAudio = new Audio('audio/you_win.mp3');
let youLoseAudio = new Audio('audio/you_lose.mp3');

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
    initLevel();
    init();
}

function init() {
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    canvas.style.display = "block"
    menu.style.display = "none"
    checkGameOverLoop();
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
                canvas.style.display = "none";
                document.getElementById("youWon").style.display = "flex";
            }, 1500);
        } else if (world?.character.energy == 0) {
            clearInterval(gameOverCheck);
            setTimeout(() => {
                playAudio(false);
                world.destroy();
                canvas.style.display = "none";
                document.getElementById("youLose").style.display = "flex";
            }, 1500);
        }
    }, 20);
}

function playAudio(victory) {
    if (victory) {
        world.endBattleAudio.pause();
        youWinAudio.play();
        
    } else {
        world.endBattleAudio.pause();
        world.backgroundMusik.pause();
        youLoseAudio.play();
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

