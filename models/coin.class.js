class Coin extends MovableObject {
    width = 150;
    height= 150;
    offset = {
        top: 48,
        left: 48,
        right: 48,
        bottom: 48
    }
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]; 
    coinRecievedAudio = new Audio('audio/coin-recieved.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 2000;
        this.y = 50 + Math.random() * 100;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 600);
    }
}