class DrawableObjects {
    x = 120;
    y = 220;
    height = 200;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    imageIndex = 0;
    percentage = 100;
    percentageCoin = 0;
    percentageBottle = 0;


    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; => 0, Rest 0 => speichert immer nur den Rest 
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}