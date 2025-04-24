class SalsaBottle extends MovableObject {

    height = 80;
    offset = {
        top: 10,
        left: 30,
        right: 20,
        bottom: 10
    }
    collectBottleAudio = new Audio('audio/collect_bottle.mp3');


    IMAGES_WALKING = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]; 

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 2000;
        this.y = 350;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 600);
    }
}