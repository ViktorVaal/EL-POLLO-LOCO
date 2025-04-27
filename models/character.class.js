class Character extends MovableObject {
    x = 30;
    y = 185;
    img;
    height = 240;
    width = 100;
    speed = 8;
    idleIndex = 0;
    jumpIndex = 0;
    isInTheAir;
    offset = {
        top: 95,
        left: 20,
        right: 25,
        bottom: 10
    }
    jumpAudio = new Audio('audio/jump.mp3');
    dieAudio = new Audio('audio/die.mp3');
    characterHurtAudio = new Audio('audio/character_hurt.mp3');
    characterSnoreAudio = new Audio('audio/male-snore.mp3');

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    world;

    /**
     * Constructor for the Character class.
     * Initializes the character by loading images for various animations
     * including walking, jumping, hurt, idle, long idle, and dead states.
     * Applies gravity and starts the animation cycle.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    /**
     * Animates the character based on keyboard input and updates the camera position.
     * @description This function sets up an interval to continuously check keyboard inputs and 
     *              performs actions such as moving right, moving left, and jumping if the corresponding 
     *              keys are pressed. It also pauses the snore audio when actions are taken and updates 
     *              the camera position relative to the character's x position. The function ensures 
     *              these actions are only executed if the character has energy and is within the 
     *              boundaries of the level.
     */
    animate() {
        setInterval(() => {
            if (this.world.keyboard.ARROWRIGHT && this.x < this.world.level.level_end_x && this.energy > 0) {
                this.moveRight();
                this.characterSnoreAudio.pause();
            }
            if (this.world.keyboard.ARROWLEFT && this.x > 0 && this.energy > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.characterSnoreAudio.pause();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround() && this.energy > 0) {
                this.jump();
                this.characterSnoreAudio.pause();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        this.startAnimationInterval();
    }

    /**
     * Starts an interval to continuously check the character's state and play the appropriate animation.
     * @description This function sets up an interval to continuously check the character's state and play the appropriate animation.
     *              If the character is dead and the image index is less then or equal to 6, it plays the losing animation and ends the game.
     *              If the character is hurt and has energy, it plays the character is hurt animation.
     *              If the character is not above ground and has energy, it plays the walking animation and resets the idle index to 0.
     *              If the character is not above ground and has energy and the idle index is less than or equal to 40, it plays the idle animation and increments the idle index.
     *              If the character is not above ground and has energy and the idle index is greater then 40, it plays the long idle animation and plays the snore audio.
     *              This function also calls the playJumpAnimation function to play the jumping animation.
     *              The interval is set to 150ms.
     */
    startAnimationInterval() {
        setInterval(() => {
            if (!this.world.isDestroyed) {
                if (this.isDead() && this.imageIndex <= 6) {
                    this.playLosingAnimationAndEndGame();
                } else if (this.isHurt() && this.energy > 0) {
                    this.playCharacterIsHurt();
                } else if (this.energy > 0 && this.world.keyboard.ARROWRIGHT && !this.isAboveGround() || this.world.keyboard.ARROWLEFT && this.energy > 0 && !this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.idleIndex = 0;
                } else if (this.energy > 0 && this.idleIndex <= 40 && !this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_IDLE);
                    this.idleIndex++
                } else if (this.energy > 0 && this.idleIndex > 40 && !this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                    this.world.playAudio(this.characterSnoreAudio);
                }
            }
        }, 150);
        this.playJumpAnimation();
    }

    /**
     * Plays the losing animation and ends the game.
     * @description This function pauses the snore audio, plays the die audio, and plays the dead animation.
     *              It increments the image index after the animation is finished and ends the game.
     */
    playLosingAnimationAndEndGame() {
        this.characterSnoreAudio.pause();
        this.world.playAudio(this.dieAudio);
        this.currentImage = this.imageIndex;
        this.playAnimation(this.IMAGES_DEAD);
        this.imageIndex++
    }

    /**
     * Plays the hurt animation and plays the hurt sound effect.
     * @description This function plays the hurt animation and plays the hurt sound effect.
     *              It also pauses the snore audio.
     */
    playCharacterIsHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.world.playAudio(this.characterHurtAudio);
        this.characterSnoreAudio.pause();
    }

    /**
     * Plays the jump animation for the character.
     * @description This function sets up two intervals. The first interval continuously checks if the character is above the ground,
     * updating the isInTheAir property accordingly. The second interval plays the jumping animation if the character is in the air
     * and has enough energy, cycling through the images in the IMAGES_JUMPING array. The jump animation is reset when the character
     * reaches the ground. The intervals ensure the animation transitions smoothly and reset the idle index when jumping.
     */
    playJumpAnimation() {
        setInterval(() => {
            this.isInTheAir = this.isAboveGround();
        }, 1);
        setInterval(() => {
            if (this.isInTheAir && this.energy > 0 && this.jumpIndex < 6) {
                this.currentImage = this.jumpIndex;
                this.playAnimation(this.IMAGES_JUMPING);
                this.jumpIndex++;
                this.idleIndex = 0;
            } else if (this.y >= 180) {
                this.jumpIndex = 0;
            }
        }, 120);
    }

}