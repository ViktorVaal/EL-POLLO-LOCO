class Endboss extends MovableObject {

    speed = 5;
    height = 400;
    width = 300;
    y = 42;
    lastAttack = 0;
    offset = {
        top: 80,
        left: 60,
        right: 50,
        bottom: 20
    }
    angryEndbossAudio = new Audio('audio/endboss_angry.mp3');
    endbossDiesAudio = new Audio('audio/endboss_dies.mp3');
    endbossAttackAudio = new Audio('audio/endboss_attack.mp3')
    world;
    
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Constructor for Endboss class.
     * @description Initializes the object and its properties. Loads all the images and sets the initial position.
     *              Also starts the animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 4200;
        this.animate();
    }

    /**
     * Animates the object.
     * @description This function animates the object every 100ms and every 200ms. If the object is hurt, it plays the hurt animation.
     *              If the object is dead, it plays the dead animation and plays the die sound effect.
     *              If the object is attacking, it plays the attack animation and plays the attack sound effect.
     *              If the character is close to the object and the object is not dead, it plays the alert animation.
     *              If the character is farther away than 3700px and the object is not dead, it plays the walk animation.
     *              The animation is started when the object is created.
     */
    animate() {
        let i = 0;
        setInterval(() => {
            if (this.hadFirstContact && i > 10 && this.world.character.x + 50 < this.x + this.width / 2) {
                this.moveLeft();
                this.otherDirection = false;
            } else if (this.hadFirstContact && i > 10 && this.world.character.x - 50 > this.x + this.width / 2) {
                this.moveRight();
                this.otherDirection = true;
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.isHurt()) {
                // this.world.level.enemies.some(enemy => this.isColliding(enemy))
                this.playAnimation(this.IMAGES_HURT);
                this.world.playAudio(this.chickenHurtAudio);
            } else if (this.isDead() && this.imageIndex <= 2) {
                this.world.playAudio(this.endbossDiesAudio);
                this.currentImage = this.imageIndex;
                this.playAnimation(this.IMAGES_DEAD);
                this.imageIndex++
                this.y = 50;
                this.speed = 0;
            } else if (this.endbossAttacks() && this.energy > 0) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.world.playAudio(this.endbossAttackAudio);
            } else if (this.world?.character.x > 3700 && i < 10) {
                this.world.playAudio(this.angryEndbossAudio);
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.energy > 0 && this.hadFirstContact){
                this.playAnimation(this.IMAGES_WALK)
            }

            i++

            if (this.world?.character.x > 3700 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
                this.world.disableThrow();
            }
        }, 200);
    }

}