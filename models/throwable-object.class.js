class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    offset = {
        top: 10,
        left: 30,
        right: 20,
        bottom: 10
    }



    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
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
            this.x += 20;
        }, 25);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 50);
    }

}



