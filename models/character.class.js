class Character extends MovableObject {
    x = 30;
    y = 85;
    img;
    height = 240;
    width = 100;
    speed = 8;
    idleIndex = 0;
    offset = {
        top: 95,
        left: 20,
        right: 25,
        bottom: 10
    }
    jumpAudio = new Audio('audio/jump.mp3');
    dieAudio = new Audio('audio/die.mp3');
    characterHurtAudio = new Audio('audio/character_hurt.mp3');

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
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

    animate() {
        setInterval(() => {
            if (this.world.keyboard.ARROWRIGHT && this.x < this.world.level.level_end_x && this.energy > 0) {
                this.moveRight();
            }

            if (this.world.keyboard.ARROWLEFT && this.x > 0 && this.energy > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround() && this.energy > 0) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead() && this.imageIndex <= 6) {
                this.dieAudio.play();
                this.currentImage = this.imageIndex;
                this.playAnimation(this.IMAGES_DEAD);
                this.imageIndex++
            } else if (this.isAboveGround() && this.energy > 0) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.idleIndex = 0;
            } else if (this.isHurt() && this.energy > 0) {
                // this.world.level.enemies.some(enemy => this.isColliding(enemy))
                this.playAnimation(this.IMAGES_HURT);
                this.characterHurtAudio.play();
            } else if (this.energy > 0 && this.world.keyboard.ARROWRIGHT || this.world.keyboard.ARROWLEFT && this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING);
                this.idleIndex = 0;
            } else if (this.energy > 0 && this.idleIndex <= 50) {
                this.playAnimation(this.IMAGES_IDLE);
                this.idleIndex++
            } else if (this.energy > 0 && this.idleIndex > 50) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
            } 
        }, 150);
    }
}
