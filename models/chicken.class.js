class Chicken extends MovableObject {
    height = 80;
    width = 80;
    y = 345;
    energy = 10;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates a new instance of Chicken.
     * @description This function loads the images, sets the initial position, height, width and starts the animation
     * and the audio for the object.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 3500;
        this.speed = 0.3 + Math.random() * 0.3;
        this.animate();
        this. playAudio();
    }

/**
 * Animates the chicken object.
 * @description This function moves the chicken left continuously and updates its animation
 * every 100ms. If the chicken's energy is 0, it displays the dead image and stops the movement.
 * Otherwise, it plays the walking animation.
 */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if (this.energy == 0) {
                this.loadImage( 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                this.speed = 0;
                this.y = 360;
            }else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    /**
     * Plays the audio for the object.
     * @description This function plays the dying sound when the object's energy is 0.
     * The sound is played only once, after the object's energy has been reduced to 0.
     */
    playAudio(){
        setInterval(() => {
            if (this.energy == 0 && this.chickenDiesIndex == 0) {
                this.world.playAudio(this.chickenHurtAudio);
                this.chickenDiesIndex++
            }
        }, 50);
    }
}  