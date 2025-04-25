class StatusBarEndboss extends DrawableObjects {
    x = 500;
    y = 10;
    height = 50;
    width = 200;
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',

    ];
    world;


    /**
     * The constructor of the class StatusBarEndboss
     * 
     * The constructor calls the super class and loads the images. It also sets the percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }


    /**
     * Sets the percentage of the StatusBarEndboss to a given value between 0 and 100.
     * The percentage is used to determine the index of the image to display from the IMAGES array.
     * The index is calculated by the resolveImageIndex method.
     * @param {number} percentage - the percentage of the StatusBarEndboss
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 .... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Determines the index of the image to display in the status bar
     * based on the current percentage of the StatusBarEndboss.
     * Returns an index corresponding to the percentage range:
     * - 0 for 0%
     * - 1 for >0% to 20%
     * - 2 for >20% to 40%
     * - 3 for >40% to 60%
     * - 4 for >60% to 80%
     * - 5 for >=80%
     * @returns {number} - the index of the image to display
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