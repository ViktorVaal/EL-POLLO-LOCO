let canvas;
let world;
let keyboard = new Keyboard(); 

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
}

window.addEventListener('keydown', (event) => {
    let key = event.code.toLocaleUpperCase();
    keyboard[key] = true;
});

window.addEventListener('keyup', (event) => {
    let key = event.code.toLocaleUpperCase();
    keyboard[key] = false;
});
