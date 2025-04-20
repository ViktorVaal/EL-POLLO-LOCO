class World {
    character = new Character();
    statusBar = new Statusbar();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObjects = [];
    level = level1;
    canvas;
    keyboard;
    camera_x = 0;
    ctx;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.statusBar.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCharacterIsAttacking();
            this.checkCollisions();
            this.checkThrowObject();
        }, 20);
    }

    checkThrowObject() {
            if (this.keyboard.KEYD && this.statusBarBottle.percentageBottle > 0) {
                let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 90);
                this.throwableObjects.push(bottle);
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentageBottle -= 10);
                this.keyboard.KEYD = false;   
            }
    }

    checkCollisions() {
        
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.energy > 0) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        });
        for (let i = this.level.salsaBottle.length - 1; i >= 0; i--) {
            let salsaBottle = this.level.salsaBottle[i];
            if (this.character.isColliding(salsaBottle)) {
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentageBottle += 10);
                this.level.salsaBottle.splice(i, 1);
            }
        };
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            let coin = this.level.coins[i];
            if (this.character.isColliding(coin)) {
                this.statusBarCoin.setPercentage(this.statusBarCoin.percentageCoin += 10);
                this.level.coins.splice(i, 1);
            }
        };
    }

    checkCharacterIsAttacking() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let enemy = this.level.enemies[i];
            if (this.character.isAttacking(enemy)) {
                enemy.energy = 0;
                setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 1500);
            }
        };
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            let throwableObject = this.throwableObjects[i];
            let endboss = this.level.enemies[this.level.enemies.length - 1];
            if (throwableObject.isColliding(endboss)) {
                endboss.energy -= 20;
                this.throwableObjects.splice(i, 1);

            }
        };
        
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects ----------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsaBottle);
        this.addObjectsToMap(this.throwableObjects);


        this.ctx.translate(-this.camera_x, 0);


        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx)
        // mo.drawOffsetFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}