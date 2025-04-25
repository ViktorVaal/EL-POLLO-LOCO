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
    canThrow = true;
    isDestroyed = false;
    muted = false;
    camera_x = 0;
    ctx;

    /**
     * Constructor for the World class.
     * @param {HTMLCanvasElement} canvas - The canvas element on which the game is drawn.
     * @param {Keyboard} keyboard - The keyboard object that handles user input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.playMusik();
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Plays the background music if the user is not muted.
     * The music is paused when the last enemy is hit for the first time.
     * After one second, the boss music starts playing.
     */
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

    /**
     * Checks if the audio is muted and pauses or plays the audio accordingly.
     * The function is called every 100 milliseconds.
     * If the audio is muted, the function pauses the audio.
     * If the audio is not muted, the function plays the audio.
     * @param {HTMLAudioElement} audio - The audio to be checked.
     */
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

    /**
     * Plays the given audio if the user is not muted.
     * If the user is muted, the audio is paused.
     * @param {HTMLAudioElement} audio - The audio to be played or paused.
     */
    playAudio(audio) {
        if (this.muted) {
            audio.pause();
            return;
        } else {
            audio.play();
        }
    }

    /**
     * Sets the world property for the character and all enemies in the level.
     * This method initializes the world reference for the main character and
     * iterates through each enemy, setting their world property to the current
     * instance of the World class.
     */

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        })
    }

    /**
     * Destroys the current World instance by clearing the interval
     * and setting the isDestroyed flag to true, effectively stopping
     * the game's main loop and other ongoing processes.
     */

    destroy() {
        this.clearAllIntervals();
        this.isDestroyed = true;
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
      }

    /**
     * Starts the main game loop for the World instance.
     * The loop repeatedly checks for character actions, 
     * endboss attacks, collisions, and throwable object conditions 
     * at each interval of 20 milliseconds.
     */

    run() {
        this.intervalId = setInterval(() => {
            this.checkCharacterIsAttacking();
            this.checkEndbossIsAttacking();
            this.checkCollisions();
            this.checkThrowObject();
        }, 20);
    }

    /**
     * Checks if the player has pressed the throw button (KEYD) and if the player
     * has enough bottles to throw (percentageBottle > 0) and if the character is not
     * currently in the middle of a throw animation (canThrow == true). If all of these
     * conditions are met, creates a new ThrowableObject instance at the character's
     * current position and sets its direction to either "left" or "right" based on the
     * character's current direction. Adds the new ThrowableObject to the list of
     * throwable objects and decrements the player's bottle count by 10. Finally,
     * sets the "KEYD" property of the keyboard object to false to prevent the player
     * from throwing multiple bottles at once.
     */
    checkThrowObject() {
        if (this.keyboard.KEYD && this.statusBarBottle.percentageBottle > 0 && this.character.energy > 0 && this.canThrow == true) {
            let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 90);
            if (this.character.otherDirection == true) {
                bottle.direction = "left";
            }
            this.throwableObjects.push(bottle);
            this.statusBarBottle.setPercentage(this.statusBarBottle.percentageBottle -= 10);
            this.keyboard.KEYD = false;
        }
    }


    /**
     * Disables the ability to throw bottles for 2.5 seconds.
     * This is used to prevent the player from throwing multiple bottles at once.
     */
    disableThrow() {
        this.canThrow = false;
        setTimeout(() => {
            this.canThrow = true;
        }, 2500);
    }

    /**
     * Checks for collisions between the character and various objects in the level.
     * 
     * - If the character collides with an enemy and the enemy has energy remaining,
     *   the character takes damage and the status bar is updated to reflect the character's
     *   current energy.
     * 
     * - If the character collides with a salsa bottle and the character's bottle percentage
     *   is less than 100, the bottle is collected, the corresponding audio is played,
     *   and the status bar for bottles is updated. The bottle is then removed from the level.
     * 
     * - If the character collides with a coin, the coin is collected, the corresponding
     *   audio is played, and the status bar for coins is updated. The coin is then removed
     *   from the level.
     */

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

    /**
     * Checks if the character is attacking any enemies in the level.
     * If the character is attacking an enemy, the enemy's energy is set to 0.
     * If the character is attacking the endboss, the endboss's energy is updated
     * and the status bar for the endboss is updated to reflect the endboss's
     * current energy.
     * If the character is throwing a bottle and the bottle hits an enemy, the
     * bottle is smashed and the enemy's energy is set to 0.
     */
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
            } else {
                this.level.enemies.forEach((enemy) => {
                    if (throwableObject.isColliding(enemy) && enemy.energy > 0) {
                        this.smashBottle(throwableObject);
                        enemy.energy = 0;
                        setTimeout(() => {
                            let index = this.level.enemies.indexOf(enemy);
                            if (index > -1) {
                                this.level.enemies.splice(index, 1);
                            }
                        }, 1500);
                    }
                });
            }
        }

    }

    /**
     * Checks if the endboss is attacking the character.
     * If the endboss is attacking the character, the endboss's isAttackingCharacter
     * method is called, which sets the lastAttack variable of the endboss to the
     * current time in milliseconds.
     */
    checkEndbossIsAttacking() {
        let endboss = this.level.enemies[this.level.enemies.length - 1];
        if (endboss.isColliding(this.character)) {
            endboss.isAttackingCharacter();
        }
    }

    /**
     * Sets the energy of the given throwable object to 0 and
     * removes it from the world after 1 second.
     * @param {ThrowableObject} throwableObject
     */
    smashBottle(throwableObject) {
        throwableObject.energy = 0;
        throwableObject.speedX = 0;
        setTimeout(() => {
            let index = this.throwableObjects.indexOf(throwableObject);
            if (index > -1) {
                this.throwableObjects.splice(index, 1);
            }
        }, 1000);
    }

    /**
     * Draws the game world and all objects within it.
     * If the game is over, this method does nothing.
     * Otherwise, it clears the canvas, moves the camera to the
     * character's position, draws all objects in the level, and
     * then moves the camera back to the top left of the canvas.
     * Finally, it schedules itself to be called again after a
     * short delay using requestAnimationFrame.
     */
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

    /**
     * Adds multiple objects to the map by iterating over the provided array of objects.
     * Each object is individually added to the map using the addToMap method.
     * 
     * @param {Array} objects - An array of objects to be added to the map.
     */

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    /**
     * Adds a single object to the map. If the object has its otherDirection flag set, the object's
     * x position is flipped to account for mirrored sprites.
     * 
     * @param {MovableObject|DrawableObject} mo - The object to be added to the map.
     */
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

    /**
     * Flips the given object's image horizontally by translating and scaling the canvas context.
     * The object's x position is inverted to account for the flipped appearance.
     * 
     * @param {MovableObject|DrawableObject} mo - The object whose image is to be flipped.
     */

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    /**
     * Reverses the effects of flipImage on the given object and restores the canvas context to its
     * previous state. The object's x position is inverted again to account for the flipped
     * appearance.
     * 
     * @param {MovableObject|DrawableObject} mo - The object whose image was flipped using flipImage.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}