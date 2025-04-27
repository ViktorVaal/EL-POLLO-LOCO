class MovableObject extends DrawableObjects {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.5;
    energy = 100;
    lastHit = 0;
    chickenDiesIndex = 0;
    hadFirstContact = false;
    world;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    chickenHurtAudio = new Audio('audio/chicken_hurt.mp3');

    /**
     * Applies gravity to the object.
     * @description This function applies gravity to the object by
     * increasing its vertical speed by the acceleration every 20ms.
     * The object's vertical position is then updated by subtracting
     * the vertical speed from its current vertical position.
     * The function runs every 20ms until the object is no longer
     * above the ground or its vertical speed is 0 or negative.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else if (this instanceof Character) {
                this.y = 188
            }
        }, 10);
    }

    /**
     * Checks if the object is above the ground.
     * @description This function checks if the object is above the ground.
     * If the object is an instance of ThrowableObject, it checks if its vertical
     * position is less than 330, otherwise it checks if its vertical position is
     * less than 180.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
            if (this instanceof ThrowableObject && this.y < 330) {
                return true;
            } else {
                return this.y < 188;
            }
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} mo - The object to check for collision.
     * @returns {boolean} - True if the object is colliding with the other object, false otherwise.
     * @description This function checks if the object is colliding with another object. It checks if the
     * object's rectangle is overlapping with the other object's rectangle, taking into account the
     * offset of the object's rectangle. If the rectangles are overlapping, the function returns true,
     * otherwise it returns false.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Determines if the object is attacking another object.
     * @param {MovableObject} mo - The object to check for an attack.
     * @returns {boolean} - True if the object is attacking the other object, false otherwise.
     * @description This function checks if the object is currently in an attacking motion
     * (indicated by a negative vertical speed) and if the object's bounding box is overlapping 
     * with the upper region of another object's bounding box, taking into account the offset. 
     * If these conditions are met, the function returns true, indicating an attack.
     */
    isAttacking(mo) {
        return this.speedY < 0 &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.height - this.offset.bottom < mo.y + mo.offset.top + 40 &&
            this.y + this.offset.top < mo.y;
    }

    /**
     * Reduces the object's energy by 2 points. If the resulting energy is less than 0,
     * sets the energy to 0. Otherwise, updates the lastHit timestamp to the current time.
     */
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the endboss's energy by 15 points if the given ThrowableObject has more than 0 energy.
     * If the resulting energy is less than 0, sets the energy to 0. Otherwise, updates the lastHit 
     * timestamp to the current time.
     * @param {ThrowableObject} throwableObject - The ThrowableObject that hit the endboss.
     */
    hitEndboss(throwableObject) {
        if (throwableObject.energy > 0) {
            this.energy -= 15;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }


    /**
     * Checks if the object is hurt.
     * @description This function checks if the object is hurt by comparing the
     * current time in milliseconds to the last hit timestamp. If the difference
     * is less than 0.5 seconds, the function returns true, indicating that the
     * object is hurt.
     * @returns {boolean} - True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;  // difference in ms
        timepassed = timepassed / 1000; // difference in s
        return timepassed < 0.5;
    }

    /**
     * Updates the last attack timestamp to the current time in milliseconds.
     * This function is called by the endboss when it is attacking the character.
     */
    isAttackingCharacter() {
        this.lastAttack = new Date().getTime();
    }

    /**
     * Determines if the endboss is currently attacking.
     * @description This function checks the time elapsed since the last attack
     * by comparing the current time to the lastAttack timestamp. If the time
     * difference is less than 1 second, the function returns true, indicating
     * that the endboss is in an attack state.
     * @returns {boolean} - True if the endboss is attacking, false otherwise.
     */
    endbossAttacks() {
        let timepassedAttack = new Date().getTime() - this.lastAttack;  // difference in ms
        timepassedAttack = timepassedAttack / 1000; // difference in s
        return timepassedAttack < 1;
    }

    /**
     * Checks if the object is dead.
     * @description This function checks if the object is dead by comparing the
     * object's energy to 0. If the energy is 0, the function returns true,
     * indicating that the object is dead.
     * @returns {boolean} - True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the object has hit the ground.
     * @description This function checks if the object's vertical position is greater than 330,
     * indicating that it has hit the ground.
     * @returns {boolean} - True if the object has hit the ground, false otherwise.
     */
    hitsTheGround() {
        return this.y > 330;
    }

    /**
     * Plays an animation.
     * @description This function plays an animation by iterating over the given images array and
     * setting the object's image to the current image in the array.
     * @param {Array<String>} images - An array of image paths to play the animation with.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; => 0, Rest 0 => speichert immer nur den Rest 
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by its speed.
     * @description This function moves the object to the right by its speed, which is a positive value.
     * It also sets the otherDirection property to false, indicating that the object is not moving left.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left by its speed.
     * @description This function moves the object to the left by its speed, which is a positive value.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Jumps the object.
     * @description This function jumps the object by setting its vertical speed to 30 and playing a jump sound effect.
     */
    jump() {
        this.speedY = 15;
        this.world.playAudio(this.jumpAudio);
    }
}