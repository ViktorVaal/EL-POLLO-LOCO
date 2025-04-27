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
    i = 0;
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
 * Animates the Endboss character based on the character's position and state.
 * @description This function sets up an interval to make the Endboss move left or right 
 *              depending on the character's position once first contact is made. 
 *              It also starts the animation interval for playing the appropriate animations 
 *              for hurt, dead, attack, alert, or walking states. The movement logic runs 
 *              at approximately 60 frames per second.
 */
    animate() {
        setInterval(() => {
            if (this.hadFirstContact && this.i > 10 && this.world.character.x + 50 < this.x + this.width / 2) {
                this.moveLeft();
                this.otherDirection = false;
            } else if (this.hadFirstContact && this.i > 10 && this.world.character.x - 50 > this.x + this.width / 2) {
                this.moveRight();
                this.otherDirection = true;
            }
        }, 1000 / 60);
        this.startAnimationInterval();
    }

/**
 * Starts an interval to animate the Endboss based on its state and interaction with the character.
 * @description This function sets up an interval that checks the Endboss's state every 200ms and plays the 
 *              corresponding animation and audio. It plays the hurt animation and sound when the Endboss is hurt,
 *              the dead animation when the Endboss dies, the attack animation and sound when the Endboss is attacking,
 *              the alert animation and sound when the character is near, and the walking animation when the Endboss
 *              has energy and first contact is made. It also checks for the first contact between the character and the Endboss.
 */
    startAnimationInterval() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.world.playAudio(this.chickenHurtAudio);
            } else if (this.isDead() && this.imageIndex <= 2) {
              this.playWinnerAnimationAndEndGame();
            } else if (this.endbossAttacks() && this.energy > 0) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.world.playAudio(this.endbossAttackAudio);
            } else if (this.world?.character.x > 3700 && this.i < 10) {
                this.world.playAudio(this.angryEndbossAudio);
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.energy > 0 && this.hadFirstContact){
                this.playAnimation(this.IMAGES_WALK)
            }
            this.i++
            this.checkFirstContact();
        }, 200);
    }

/**
 * Plays the winner animation and ends the game.
 * @description This function plays the endboss's death audio and the dead animation.
 *              It increments the image index after the animation is finished, sets the
 *              vertical position of the endboss to 50, and stops its movement by setting
 *              the speed to 0.
 */
    playWinnerAnimationAndEndGame() {
        this.world.playAudio(this.endbossDiesAudio);
        this.currentImage = this.imageIndex;
        this.playAnimation(this.IMAGES_DEAD);
        this.imageIndex++
        this.y = 50;
        this.speed = 0;
    }

/**
 * Checks for the first contact between the character and the Endboss.
 * @description This function increments a counter variable and checks if the character's
 *              x position is greater than 3700 and if the Endboss has not had first contact yet.
 *              When the conditions are met, it resets the counter, marks that the first contact
 *              has been made, and disables the character's ability to throw objects.
 */
    checkFirstContact() {
        if (this.world?.character.x > 3700 && !this.hadFirstContact) {
            this.i = 0;
            this.hadFirstContact = true;
            this.world.disableThrow();
        }
    }
}