class Cloud extends MovableObject {
    width = 500;
    height = 200;
    y = 30;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 520;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}