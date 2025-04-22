let canvas;
let world;
let menu;
let intervsalIds = [];
let keyboard = new Keyboard();
let gameOverCheck;

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
            clearInterval(gameOverCheck); // Stoppe die Schleife!
            setTimeout(() => {
                world.destroy();
                canvas.style.display = "none";
                document.getElementById("youWon").style.display = "flex";
            }, 2000);
        } else if (world?.character.energy == 0) {
            clearInterval(gameOverCheck); // Stoppe die Schleife!
            setTimeout(() => {
                world.destroy();
                canvas.style.display = "none";
                document.getElementById("youLose").style.display = "flex";
            }, 2000);
        }
    }, 20);
}

