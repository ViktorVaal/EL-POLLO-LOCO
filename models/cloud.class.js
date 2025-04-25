class Cloud extends MovableObject {
    width = 500;
    height = 200;
    y = 30;

    /**
     * Creates a new instance of Cloud.
     * @description This function loads the cloud image and sets the initial position of the cloud.
     * The cloud is positioned at a random x position and at y = 30. The cloud is then animated
     * to move left at a speed of 1px per frame.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 4000;
        this.animate();
    }

    /**
     * Animates the cloud.
     * @description This function animates the cloud to move left at a speed of 1px per frame.
     * The animation is started when the cloud is created.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}