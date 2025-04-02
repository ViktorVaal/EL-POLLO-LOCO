class MovableObject {
    x = 120;
    y = 240;
    img;
    height = 180;
    width = 100;

// loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    moveRight() {
        this.x += 10;
    }

    moveLeft() {
        this.x -= 10;
    }
}