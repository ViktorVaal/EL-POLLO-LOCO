class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    salsaBottle;
    level_end_x = 4000;

/**
 * Constructs a new Level instance with the specified game elements.
 * 
 * @param {Array} enemies - An array of enemy objects present in the level.
 * @param {Array} clouds - An array of cloud objects for the level's background.
 * @param {Array} backgroundObjects - An array of background objects for the level.
 * @param {Array} coins - An array of coin objects that can be collected in the level.
 * @param {Array} salsaBottle - An array of salsa bottle objects available in the level.
 */

    constructor(enemies, clouds, backgroundObjects, coins, salsaBottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.salsaBottle = salsaBottle;
    }
}