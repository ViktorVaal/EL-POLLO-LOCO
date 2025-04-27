class StatusBarBottle extends DrawableObjects {
    x = 30;
    y = 80;
    height = 50;
    width = 200;
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',

    ];
    world;

    /**
     * The constructor of the class StatusBarBottle
     * 
     * The constructor calls the super class, loads the images and sets the percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the StatusBarBottle to a given value between 0 and 100.
     * This will update the displayed image of the status bar based on the percentage.
     * @param {number} percentage - The percentage of the StatusBarBottle.
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 .... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image to display for the status bar
     * based on the current percentage value.
     * The index corresponds to the image that represents the closest 
     * percentage range.
     * 
     * @returns {number} - The index of the image to display, ranging from 0 to 5.
     */
    resolveImageIndex() {
        if (this.percentage >= 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}