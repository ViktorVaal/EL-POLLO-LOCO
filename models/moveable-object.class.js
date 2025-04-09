class MovableObject {
    x = 120;
    y = 220;
    img;
    height = 200;
    width = 100;
    currentImage = 0;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;

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

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; => 0, Rest 0 => speichert immer nur den Rest 
                // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, ...
                let path = images[i];
                this.img = this.imageCache[path];
                this.currentImage++;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}