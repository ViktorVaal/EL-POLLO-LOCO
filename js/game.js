let canvas;
let world;

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    console.log('My Character is', world.character);
}

window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        world.character.moveRight();
    }
    if (event.key === 'ArrowLeft') {
        world.character.moveLeft();
    }
});
