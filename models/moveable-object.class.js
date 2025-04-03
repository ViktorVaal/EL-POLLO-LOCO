class MovableObject {
    x = 120;
    y = 220;
    img;
    height = 200;
    width = 100;
    imageCache = {};

// loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    moveRight() {
        this.x += 10;
    }

    moveLeft() {
        this.x -= 10;
    }
}