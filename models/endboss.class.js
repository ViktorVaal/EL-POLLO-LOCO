class Endboss extends MovableObject {

    speed = 0.9;
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
    world;
    hadFirstContact = false;
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

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2400;
        this.animate();
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (this.hadFirstContact && i > 8 && this.world.character.x < this.x + this.width / 2) {
                this.moveLeft();
                this.otherDirection = false;
            } else if (this.hadFirstContact && i > 8 ) {
                this.moveRight();
                this.otherDirection = true;
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.isHurt()) {
                // this.world.level.enemies.some(enemy => this.isColliding(enemy))
                this.playAnimation(this.IMAGES_HURT)
            } else if (this.isDead() && this.imageIndex <= 2) {
                this.currentImage = this.imageIndex;
                this.playAnimation(this.IMAGES_DEAD);
                this.imageIndex++
                this.y = 50;
                this.speed = 0;
            } else if (this.endbossAttacks() && this.energy > 0) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (i < 8) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.energy > 0){
                this.playAnimation(this.IMAGES_WALK)
            }
            i++
            
            if (this.world?.character.x > 1400 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 100);
    }

}