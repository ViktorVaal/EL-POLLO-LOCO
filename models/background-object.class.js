class BackgroundObject extends MovableObject {
    y = 0
    width = 720;
    height = 480;

/**
 * Creates a new instance of a BackgroundObject.
 * @param {string} imagePath - The path to the image to load.
 * @param {number} x - The x position of the background object.
 * @description This constructor initializes the background object with an image
 * and sets its horizontal position. The object's width and height are predefined.
 */

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}