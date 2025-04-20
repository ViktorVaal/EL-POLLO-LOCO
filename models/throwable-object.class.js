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
    speedX = 20;



    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.throw();
        this.animate();
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }

    animate() {
        setInterval(() => {
            console.log(this.y);
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

}



