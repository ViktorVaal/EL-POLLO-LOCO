class StatusBarCoin extends DrawableObjects {
    x = 30;
    y = 40;
    height = 50;
    width = 200;
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',

    ];

    world;


    /**
     * Initializes a new instance of the StatusBarCoin class.
     * Loads the images for the status bar and sets the initial percentage to 0.
     */

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }


    /**
     * Sets the percentage of the StatusBarCoin to a given value between 0 and 100.
     * This will update the displayed image of the status bar.
     * @param {number} percentage - the percentage of the StatusBarCoin
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


/**
 * Determines the index of the image to display based on the current percentage.
 * The returned index corresponds to an image in the IMAGES array.
 * 
 * @returns {number} - The index of the image to display, ranging from 0 to 5.
 */

    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
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