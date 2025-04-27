class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    offset = {
        top: 10,
        left: 30,
        right: 20,
        bottom: 10
    }
    speedX = 18;
    bottleShatterIndex = 0;
    direction = "right";
    bottleShatterAudio = new Audio('audio/bottle_shatter.mp3');
    throwAudio = new Audio('audio/throw.mp3');


    /**
     * Creates a new instance of a ThrowableObject.
     * @param {Number} x - The x position of the object.
     * @param {Number} y - The y position of the object.
     * @description This function also loads the images, sets the initial position, height, width and starts the animation
     * and the audio for the object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.throw(this.direction);
        this.animate();
        this.playAudio();
    }



    /**
     * Throws the bottle in the given direction.
     * @param {String} direction - The direction to throw the bottle in. Can be "right" or "left".
     * @description This function applies gravity to the object and moves it horizontally in the given direction.
     */
    throw() {
        this.speedY = 13;
        this.applyGravity();
        setInterval(() => {
            if (this.direction == "right") {
                this.x += this.speedX;
            } else if (this.direction == "left") {
                this.x -= this.speedX;
            }
        }, 25);
    }

    /**
     * Animates the object.
     * @description This function animates the object when it is thrown and when it hits the ground.
     * It plays the rotation animation while the object is being thrown and the splash animation when the object
     * hits the ground. The animation is played in an interval of 200ms.
     */
    animate() {
        setInterval(() => {
            if (this.energy <= 0 && this.imageIndex <= 6 || this.hitsTheGround() && this.imageIndex <= 6) {
                this.currentImage = this.imageIndex;
                this.speedX = 0;
                this.speedY = 0;
                this.playAnimation(this.IMAGES_SPLASH)
                this.imageIndex++;
            } 
        }, 200);
        setInterval(() => {
            if (this.speedX > 0 && this.energy > 0) {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 70);
    }

    /**
     * Plays the audio for the object.
     * @description This function plays the throwing sound when the object is thrown and the shatter sound when the object hits the ground.
     * The shatter sound is played only once, after the object hits the ground.
     */
    playAudio() {
        world.playAudio(this.throwAudio);
        setInterval(() => {
            if (this.energy == 0 && this.bottleShatterIndex == 0) {
                world.playAudio(this.bottleShatterAudio);
                this.bottleShatterIndex ++
            }
      }, 100);  
    }
}



