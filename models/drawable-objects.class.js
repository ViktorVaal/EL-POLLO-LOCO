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


    
    /**
     * Loads an image from the given path and assigns it to the object's img property.
     * @param {String} path - The path to the image to load.
     */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }

    /**
     * Draws the object on the given canvas context at the object's position
     * and with the object's size.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

  
    /**
     * Loads an array of images from the given paths and assigns them to the object's imageCache property.
     * The imageCache is an object where the keys are the paths and the values are the images.
     * @param {Array<String>} arr - An array of paths to the images to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * Draws a blue frame around the object on the given canvas context.
     * This is useful for debugging purposes to see the size and position of the object.
     * The frame is only drawn if the object is an instance of one of the following classes:
     * Character, Chicken, Endboss, ThrowableObject, or SmallChicken.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws a red frame around the object's offset area on the given canvas context.
     * This is useful for debugging purposes to see the size and position of the object's offset area.
     * The frame is only drawn if the object is an instance of one of the following classes:
     * Character, Chicken, Endboss, ThrowableObject.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    /**
     * Plays an animation by cycling through a sequence of images.
     * @param {Array<String>} images - An array of image paths representing the animation frames.
     * @description This function updates the object's image to the next frame in the animation sequence
     * using the imageCache and increments the currentImage index. The animation loops back to the start
     * once all images have been displayed.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}