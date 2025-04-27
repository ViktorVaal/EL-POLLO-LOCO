class SmallChicken extends MovableObject {
    height = 50;
    width = 50;
    y = 365;
    energy = 10;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a new instance of SmallChicken.
     * @description This function loads the images, sets the initial position, height, width and starts the animation
     * and the audio for the object.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 3500;
        this.speed = 0.3 + Math.random() * 0.3;
        this.animate();
        this.playAudio();
    }

    /**
     * Animates the object.
     * @description This function animates the object every 100ms. If the object's energy is 0, it plays the dead animation.
     * Otherwise, it plays the walking animation.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if (this.energy == 0) {
                this.loadImage( 'img/3_enemies_chicken/chicken_small/2_dead/dead.png');
                this.speed = 0;
                this.y = 377;
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