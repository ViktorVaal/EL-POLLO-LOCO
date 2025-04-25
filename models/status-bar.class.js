class Statusbar extends DrawableObjects {
    x = 30;
    y = 0;
    height = 50;
    width = 200;
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
   
    world;


    /**
     * Constructor for the Statusbar class.
     * Initializes the status bar by calling the super constructor,
     * loading the images for the status bar and setting the percentage
     * of the status bar to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the status bar to the given value.
     * This will update the displayed image of the status bar.
     * @param {number} percentage - a number between 0 and 100
     */
    setPercentage(percentage) {
            this.percentage = percentage; // => 0 .... 5
            let path = this.IMAGES[this.resolveImageIndex()];
            this.img = this.imageCache[path];
    }


    /**
     * Returns the index of the image to display in the status bar
     * based on the current percentage.
     * @returns {number} - the index of the image to display
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if(this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}