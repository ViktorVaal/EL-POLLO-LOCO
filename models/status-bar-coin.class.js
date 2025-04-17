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


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }

    // setPercentage(50);
    setPercentage(percentage) {
            this.percentage = percentage; // => 0 .... 5
            let path = this.IMAGES[this.resolveImageIndex()];
            this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.percentage >= 100) {
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