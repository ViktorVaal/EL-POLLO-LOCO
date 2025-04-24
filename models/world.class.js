class World {
    intervalId = [];
    character = new Character();
    statusBar = new Statusbar();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    backgroundMusik = new Audio("audio/backgroundMusik.mp3");
    endBattleAudio = new Audio('audio/endboss_fight.mp3');
    level = level1;
    throwableObjects = [];
    canvas;
    keyboard;
    isDestroyed = false;
    muted = false;
    camera_x = 0;
    ctx;
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.playMusik();
        this.draw();
        this.setWorld();
        this.run();
    }
    
    playMusik() {
        let loopIndex = 0;
        setInterval(() => {
            if (this.level.enemies[this.level.enemies.length - 1].hadFirstContact && loopIndex == 0) {
                backgroundMusik.pause();
                setTimeout(() => {
                    this.checkmusikMuted(this.endBattleAudio);
                }, 1000);
                loopIndex++
            }
        }, 100);
    }

    checkmusikMuted(audio) {
        setInterval(() => {
            if (this.muted) {
                audio.pause();
            }
        }, 100);
        if (!this.muted) {
            audio.play();
        }
        
    }

    playAudio(audio) {
        if (this.muted) {
            audio.pause();
            return;
        } else {
            audio.play();
        }
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        })
    }

    destroy() {
        clearInterval(this.intervalId);
        this.isDestroyed = true;
    }

    run() {
        this.intervalId = setInterval(() => {
            this.checkCharacterIsAttacking();
            this.checkEndbossIsAttacking();
            this.checkCollisions();
            this.checkThrowObject();
        }, 20);
    }

    checkThrowObject() {
        if (this.keyboard.KEYD && this.statusBarBottle.percentageBottle > 0 && this.character.energy > 0) {
            let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 90);
            if (this.character.otherDirection == true) {
                bottle.direction = "left";
                console.log(bottle.otherDirection);
            }
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
            if (this.character.isColliding(salsaBottle) && this.statusBarBottle.percentage < 100) {
                this.playAudio(salsaBottle.collectBottleAudio);
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentageBottle += 10);
                this.level.salsaBottle.splice(i, 1);
            }
        };
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            let coin = this.level.coins[i];
            if (this.character.isColliding(coin)) {
                this.playAudio(coin.coinRecievedAudio);
                this.statusBarCoin.setPercentage(this.statusBarCoin.percentageCoin += 10);
                this.level.coins.splice(i, 1);
            }
        };
    }

    checkCharacterIsAttacking() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let chicken = this.level.enemies[i];
            if (this.character.isAttacking(chicken)) {
                if (chicken.energy > 0) {
                    this.character.speedY = 20;
                }
                chicken.energy = 0;
                setTimeout(() => {
                    let index = this.level.enemies.indexOf(chicken);
                    if (index > -1) {
                        this.level.enemies.splice(index, 1);
                    }
                }, 1500);
            }
        }
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            let throwableObject = this.throwableObjects[i];
            let endboss = this.level.enemies[this.level.enemies.length - 1];
            if (throwableObject.isColliding(endboss)) {
                endboss.hitEndboss(throwableObject);
                this.statusBarEndboss.setPercentage(endboss.energy)
                this.smashBottle(throwableObject);
            } else if (throwableObject.hitsTheGround()) {
                this.smashBottle(throwableObject);
            }
        }
    }

    checkEndbossIsAttacking() {
        let endboss = this.level.enemies[this.level.enemies.length - 1];
        if (endboss.isColliding(this.character)) {
            endboss.isAttackingCharacter();
        }
    }

    smashBottle(throwableObject) {
        throwableObject.energy = 0;
        setTimeout(() => {
            let index = this.throwableObjects.indexOf(throwableObject);
            if (index > -1) {
                this.throwableObjects.splice(index, 1);
            }
        }, 1000);
    }

    draw() {
        if (this.isDestroyed) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects ----------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
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