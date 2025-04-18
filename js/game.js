let canvas;
let world;
let keyboard = new Keyboard(); 

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
}

function startGame() {
    // canvas = document.getElementById("canvas");
    // world = new World(canvas, keyboard);
    // console.log('My Character is', world.character);
    let startGame = document.getElementById("startGame")
    canvas.style.display = "block"
    startGame.style.display = "none"
}

window.addEventListener('keydown', (event) => {
    let key = event.code.toLocaleUpperCase();
    keyboard[key] = true;
});

window.addEventListener('keyup', (event) => {
    let key = event.code.toLocaleUpperCase();
    keyboard[key] = false;
});
