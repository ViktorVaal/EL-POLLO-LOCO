class Coin extends MovableObject {
    width = 150;
    height= 150;
    offset = {
        top: 48,
        left: 48,
        right: 48,
        bottom: 48
    }
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]; 
    coinRecievedAudio = new Audio('audio/coin-recieved.mp3');

    /**
     * Creates a new instance of a Coin.
     * @description This function loads the images, sets the initial position, height, width and starts the animation
     * of the object.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 3000;
        this.y = 50 + Math.random() * 100;

        this.animate();
    }

    /**
     * Animates the object.
     * @description This function animates the object every 600ms. It plays the walking animation by 
     * calling the playAnimation function with the array of images in the IMAGES_WALKING array.
     * The playAnimation function changes the image of the object every 600ms by calling the 
     * setImage function with the images in the array in the correct order.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 600);
    }
}