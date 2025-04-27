class World {
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

    /**
     * Clears all intervals in the range of 1 to 9999 (the maximum
     * number of allowed intervals) to prevent memory leaks and
     * ensure that the game can be restarted without any issues.
     */
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
        setInterval(() => {
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
            this.character.characterSnoreAudio.pause();
            this.character.idleIndex = 0;
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
     * Checks and handles collisions between the character and various objects in the game.
     * This method checks for collisions with enemies, salsa bottles, and coins, and updates
     * the game state accordingly. If a collision with an enemy occurs, the character's energy
     * is decreased. If a collision with a salsa bottle or coin occurs, the respective status
     * bar is updated, and the bottle or coin is removed from the level.
     */
    checkCollisions() {
        this.checkCollisionsWithEnemy();
        this.checkCollisionsWithSalsaBottle();
        this.checkCollisionsWithCoin();
    }

    /**
     * Checks for collisions between the character and enemies.
     * If a collision is detected and the enemy has energy, the character takes damage.
     * The character's energy is then updated on the status bar.
     */
    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.energy > 0) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        });
    }

    /**
     * Checks for collisions between the character and the salsa bottles in the level.
     * If a collision is detected and the character's bottle count is less than 100, the
     * character's bottle count is increased by 10, the collection audio is played, and
     * the bottle is removed from the level.
     */
    checkCollisionsWithSalsaBottle() {
        for (let i = this.level.salsaBottle.length - 1; i >= 0; i--) {
            let salsaBottle = this.level.salsaBottle[i];
            if (this.character.isColliding(salsaBottle) && this.statusBarBottle.percentage < 100) {
                this.playAudio(salsaBottle.collectBottleAudio);
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentageBottle += 10);
                this.level.salsaBottle.splice(i, 1);
            }
        };
    }

    /**
     * Checks for collisions between the character and the coins in the level.
     * If a collision is detected, the character's coin count is increased by 10, the
     * collection audio is played, and the coin is removed from the level.
     */
    checkCollisionsWithCoin() {
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
     */
    checkCharacterIsAttacking() {
        this.checkCharacterIsAttackingChicken();
        this.checkCharacterIsAttackingEndBoss();
    }

    /**
     * Checks if the character is attacking any chickens in the level.
     * If a chicken is attacked and its energy is greater than 0, the character's
     * vertical speed is increased. The chicken's energy is set to 0, and it is
     * removed from the level after a delay of 1.5 seconds.
     */
    checkCharacterIsAttackingChicken() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let chicken = this.level.enemies[i];
            if (this.character.isAttacking(chicken)) {
                if (chicken.energy > 0) {
                    this.character.speedY = 10;
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
    }

    /**
     * Checks if the character is attacking the endboss or salse bottle is hitting the ground.
     */
    checkCharacterIsAttackingEndBoss() {
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
     * Draws all the objects in the world on the canvas.
     */
    draw() {
        if (this.isDestroyed) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addMoveableObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
        this.addFixedObjectsToMap();
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds all the moveable objects in the world to the map.
     */
    addMoveableObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsaBottle);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
    }

    /**
     * Adds all the fixed objects in the world to the map.
     */
    addFixedObjectsToMap() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
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