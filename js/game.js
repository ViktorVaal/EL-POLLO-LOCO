let canvas;
let world;
let menu;
let width;
let height;
let gameHud;
let intervsalIds = [];
let keyboard = new Keyboard();
let gameOverCheck;
let volumeUp;
let volumeOff;
let muted;
let mobileBtnsRef;
let youWinAudio = new Audio('audio/you_win.mp3');
let youLoseAudio = new Audio('audio/you_lose.mp3');
backgroundMusik = new Audio("audio/backgroundMusik.mp3");
backgroundMusik.loop = true;

/**
 * Checks the dimensions of the window to determine if the device is mobile.
 * If the device is in portrait mode with a width of 768px or less, it hides
 * the impressum and displays a rotate device prompt. Otherwise, it hides
 * the rotate device prompt. Calls showMobileButtons to manage mobile button visibility.
 */
function checkifMobile() {
    let impressumRef = document.getElementById("impressumBackground");
    width = innerWidth;
    height = innerHeight;
    let rotateDeviceRef = document.getElementById("rotateDevice");
    if (height > width && width <= 768) {
        impressumRef.style.display = "none";
        rotateDeviceRef.style.display = "flex";
    } else {
        rotateDeviceRef.style.display = "none";
    }
    showMobileButtons();
}

/**
 * Manages the visibility of mobile buttons based on the width of the window.
 * If the window is 1400px or narrower and the game HUD is visible, it will
 * display the mobile buttons and activate touchstart and touchend event listeners.
 * Otherwise, it will hide the mobile buttons.
 */
function showMobileButtons() {
    mobileBtnsRef = document.getElementById("mobileBtns");
    gameHud = document.getElementById("gameHud");
    if (width <= 1400 && gameHud.style.display == "block") {
        mobileBtnsRef.style.display = "flex";
        activateMobileTouchstartButtons();
        activateMobileTouchendButtons();
    } else {
        mobileBtnsRef.style.display = "none";

    }
}

/**
 * Initializes and starts the game by setting up the game environment.
 * Retrieves and sets the menu, canvas, and game HUD elements, and retrieves
 * the muted status from local storage. Plays background music, initializes the
 * game level and world, and sets the volume settings. Finally, manages the
 * display of mobile buttons based on the current window size.
 */
function startGame() {
    menu = document.getElementById("menu")
    canvas = document.getElementById("canvas");
    gameHud = document.getElementById("gameHud");
    muted = localStorage.getItem("muted");
    backgroundMusik.play();
    initLevel();
    init();
    setVolumeFromLocalstorage();
    setVolume();
    showMobileButtons();
}

/**
 * Initializes the game by creating a new World instance and setting the display
 * of the game HUD and menu elements. Finally, starts the game over check loop.
 */
function init() {
    world = new World(canvas, keyboard);
    gameHud.style.display = "block"
    menu.style.display = "none"
    checkGameOverLoop();
}

/**
 * Restarts the game by destroying the current world, clearing the game over check interval,
 * hiding the win or lose screens, and starting the game over.
 */
function restartGame() {
    world.destroy();
    clearInterval(gameOverCheck);
    document.getElementById("youWon").style.display = "none";
    document.getElementById("youLose").style.display = "none";
    startGame();
}

/**
 * Shows the home screen by destroying the current world, clearing the game over check interval,
 * and hiding the win or lose screens.
 */
function showHomeScreen() {
    world.destroy();
    clearInterval(gameOverCheck);
    menu.style.display = "flex";
    document.getElementById("youLose").style.display = "none";
    document.getElementById("youWon").style.display = "none";
}

/**
 * Checks the game over state every 20 milliseconds and shows the winner or loser
 * screen if the game is over. The function is called once at the start of the
 * game and is stopped once the game is over.
 */
function checkGameOverLoop() {
    gameOverCheck = setInterval(() => {
        if (world?.level.enemies[world.level.enemies.length - 1].energy == 0) {
            showWinnerScreen();
        } else if (world?.character.energy == 0) {
            showLoserScreen();
        }
    }, 20);
}

/**
 * Shows the winner screen by clearing the game over check interval, pausing the audio
 * and hiding the game Hud and mobile buttons, and displaying the winner screen.
 */
function showWinnerScreen() {
    clearInterval(gameOverCheck);
    setTimeout(() => {
        playAudio(true);
        world.destroy();
        mobileBtnsRef.style.display = "none";
        gameHud.style.display = "none";
        document.getElementById("youWon").style.display = "flex";
    }, 1500);
}

/**
 * Shows the loser screen by clearing the game over check interval, pausing the audio,
 * and hiding the game HUD and mobile buttons. Displays the loser screen after a delay
 * of 1.5 seconds.
 */

function showLoserScreen() {
    clearInterval(gameOverCheck);
    setTimeout(() => {
        playAudio(false);
        world.destroy();
        mobileBtnsRef.style.display = "none";
        gameHud.style.display = "none";
        document.getElementById("youLose").style.display = "flex";
    }, 1500);
}

/**
 * Plays audio based on the game outcome.
 * @param {boolean} victory - Indicates whether the game was won or lost.
 * If victory is true, pauses the end battle audio and plays the winning audio.
 * If victory is false, pauses both the end battle and background music, and plays the losing audio.
 */

function playAudio(victory) {
    if (victory) {
        world.endBattleAudio.pause();
        world.playAudio(youWinAudio);
    } else {
        world.endBattleAudio.pause();
        backgroundMusik.pause();
        world.playAudio(youLoseAudio);
    }
}

/**
 * Sets the volume based on the localStorage value.
 * If the localStorage value is "true", the volume is set to off.
 * If the localStorage value is "false", the volume is set to on.
 */
function setVolumeFromLocalstorage() {
    volumeUp = document.getElementById("volumeUp");
    volumeOff = document.getElementById("volumeOff");
    if (muted == "true") {
        volumeOff.classList.remove("d-none");
        volumeUp.classList.add("d-none");
    } else {
        volumeOff.classList.add("d-none");
        volumeUp.classList.remove("d-none");
    }
}

/**
 * Toggles the volume icon between the "volume up" and "volume off" states.
 * If the "volume up" icon is currently hidden, it displays the "volume up" icon and hides the "volume off" icon.
 * If the "volume off" icon is currently hidden, it displays the "volume off" icon and hides the "volume up" icon.
 * Calls the `setVolume` function to update the volume state based on the current icon displayed.
 */

function toggleVolumeImage() {
    volumeUp = document.getElementById("volumeUp");
    volumeOff = document.getElementById("volumeOff");
    if (volumeUp.classList.contains("d-none")) {
        volumeOff.classList.add("d-none");
        volumeUp.classList.remove("d-none");
        setVolume();
    } else {
        volumeOff.classList.remove("d-none");
        volumeUp.classList.add("d-none");
        setVolume();
    }
}

/**
 * Sets the volume state based on the current state of the volume icon.
 * If the "volume off" icon is displayed, sets the volume to off and pauses the background music.
 * If the "volume up" icon is displayed, sets the volume to on and plays the background music.
 * Updates the localStorage value to reflect the new volume state.
 */
function setVolume() {
    volumeUp = document.getElementById("volumeUp");
    volumeOff = document.getElementById("volumeOff");
    if (!volumeOff.classList.contains("d-none")) {
        world.muted = true;
        localStorage.setItem("muted", "true");
        backgroundMusik.pause();
    } else {
        backgroundMusik.play();
        world.muted = false;
        localStorage.setItem("muted", "false");
        world.playMusik();
    }
}

/**
 * Shows the impressum screen by setting the display of the impressumBackground element to "flex".
 * @function
 */
function openImpressum() {
    let impressumRef = document.getElementById("impressumBackground");
    impressumRef.style.display = "flex";
}

/**
 * Closes the impressum screen when clicking outside the impressum content.
 * @param {Event} event - The event triggered by a click on the impressumBackground.
 * If the click target is the impressumBackground itself, hides the impressum by setting 
 * its display style to "none".
 */
function closeImpressum(event) {
    let impressumRef = document.getElementById("impressumBackground");
    if (event.target == impressumRef) {
        impressumRef.style.display = "none";
    }
}

window.addEventListener('keydown', (event) => {
    let key = event.code.toLocaleUpperCase();
    keyboard[key] = true;
    if (event.repeat && key == "KEYD") {
        keyboard[key] = false;
    }
});

window.addEventListener('keyup', (event) => {
    let key = event.code.toLocaleUpperCase();
    keyboard[key] = false;
});

/**
 * Activates touchstart event listeners for the mobile buttons.
 * 
 * Listens for touchstart events on the moveLeft, moveRight, jump, throw, and volume elements.
 * If a touchstart event is triggered on one of these elements, it prevents the event's default behavior
 * and sets the corresponding key in the Keyboard object to true.
 */
function activateMobileTouchstartButtons() {
    document.getElementById('moveLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.ARROWLEFT = true;
    });
    document.getElementById('moveRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.ARROWRIGHT = true;
    });
    document.getElementById('jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KEYD = true;
    });
    document.getElementById('volume').addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleVolumeImage();
    });
};

/**
 * Deactivates touchstart event listeners for the mobile buttons.
 *
 * Listens for touchend events on the moveLeft, moveRight, jump, throw, and volume elements.
 * If a touchend event is triggered on one of these elements, it prevents the event's default behavior
 * and sets the corresponding key in the Keyboard object to false.
 */
function activateMobileTouchendButtons() {
    document.getElementById('moveLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.ARROWLEFT = false;
    });
    document.getElementById('moveRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.ARROWRIGHT = false;
    });
    document.getElementById('jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KEYD = false;
    });

};

