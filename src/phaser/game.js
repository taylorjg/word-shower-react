import * as Phaser from "phaser";
import log from "loglevel";

class ShowerScene extends Phaser.Scene {
  constructor() {
    log.debug("[ShowerScene#constructor]");
    super("ShowerScene");
    this.newLetterRate = 0;
    this.letterFallSpeed = 0;
    this.letterTileContainers = [];
  }

  init(settings) {
    log.debug("[ShowerScene#init]", { settings });
    this.newLetterRate = settings.newLetterRate;
    this.letterFallSpeed = settings.letterFallSpeed;
  }

  create() {
    log.debug("[ShowerScene#create]");

    const onPauseHandler = this.onPause.bind(this);
    const onResumeHandler = this.onResume.bind(this);
    const onSleepHandler = this.onSleep.bind(this);
    const onWakeHandler = this.onWake.bind(this);

    this.events.on(Phaser.Scenes.Events.PAUSE, onPauseHandler);
    this.events.on(Phaser.Scenes.Events.RESUME, onResumeHandler);
    this.events.on(Phaser.Scenes.Events.SLEEP, onSleepHandler);
    this.events.on(Phaser.Scenes.Events.WAKE, onWakeHandler);

    const onSetNewLetterRateHandler = this.onSetNewLetterRate.bind(this);
    const onSetLetterFallSpeedHandler = this.onSetLetterFallSpeed.bind(this);
    const onAddLetterHandler = this.onAddLetter.bind(this);

    this.game.events.on("SET_NEW_LETTER_RATE", onSetNewLetterRateHandler);
    this.game.events.on("SET_LETTER_FALL_SPEED", onSetLetterFallSpeedHandler);
    this.game.events.on("ADD_LETTER", onAddLetterHandler);
  }

  update(_, delta) {
    if (this.letterTileContainers.length > 0) {
      const canvasHeight = this.sys.game.canvas.height;
      const top = this.cameras.main.scrollY;
      const bottom = top + canvasHeight;

      const scrolledOutOfView = (item) => {
        return item.y > bottom;
      };

      const firstItem = this.letterTileContainers[0];
      if (scrolledOutOfView(firstItem)) {
        this.letterTileContainers.shift();
        const id = firstItem.getData("id");
        firstItem.destroy(true);
        this.game.events.emit("LETTER_REMOVED", id);
      }
    }

    const distanceToFall = this.sys.game.canvas.height;
    const letterFallSpeedFrameCount = this.letterFallSpeed / delta;
    const fallDelta = distanceToFall / letterFallSpeedFrameCount;
    this.cameras.main.scrollY -= fallDelta;
  }

  onPause() {
    log.debug("[ShowerScene#onPause]");
  }

  onResume(_, settings) {
    log.debug("[ShowerScene#onResume]", { settings });
    this.newLetterRate = settings.newLetterRate;
    this.letterFallSpeed = settings.letterFallSpeed;
  }

  onSleep() {
    log.debug("[ShowerScene#onSleep]");
  }

  onWake(_, settings) {
    log.debug("[ShowerScene#onWake]", { settings });
    this.newLetterRate = settings.newLetterRate;
    this.letterFallSpeed = settings.letterFallSpeed;
    this.cameras.main.scrollY = 0;
  }

  onSetNewLetterRate(newLetterRate) {
    log.debug("[ShowerScene#onSetNewLetterRate]", { newLetterRate });
    this.newLetterRate = newLetterRate;
  }

  onSetLetterFallSpeed(letterFallSpeed) {
    log.debug("[ShowerScene#onSetLetterFallSpeed]", { letterFallSpeed });
    this.letterFallSpeed = letterFallSpeed;
  }

  onAddLetter(id, letter, value) {
    log.debug("[ShowerScene#onAddLetter]", { id, letter, value });

    const canvasWidth = this.sys.game.canvas.width;

    const TILE_SIZE = 50;
    const SINGLE_MARGIN = TILE_SIZE / 10;
    const BOTH_MARGINS = SINGLE_MARGIN * 2;

    const letterTile = this.add.graphics();
    letterTile.fillStyle(0xffe4c4); // Bisque
    letterTile.fillRoundedRect(0, 0, TILE_SIZE, TILE_SIZE, 10);

    const letterTextStyle = {
      fontSize: "40px",
      fontFamily: "Arial",
      fill: "black",
    };

    const valueTextStyle = {
      fontSize: "10px",
      fontFamily: "Arial",
      fill: "black",
    };

    const letterText = this.add
      .text(
        TILE_SIZE * 0.5,
        TILE_SIZE * 0.5,
        letter.toUpperCase(),
        letterTextStyle
      )
      .setOrigin(0.5);

    const valueText = this.add
      .text(TILE_SIZE * 0.85, TILE_SIZE * 0.8, value.toString(), valueTextStyle)
      .setOrigin(0.5);

    const availableWidth = canvasWidth - BOTH_MARGINS - TILE_SIZE;
    const x = SINGLE_MARGIN + Math.floor(availableWidth * Math.random());
    const y = this.cameras.main.scrollY - TILE_SIZE;
    const children = [letterTile, letterText, valueText];
    const letterTileContainer = this.add.container(x, y, children);
    letterTileContainer.setData("id", id);
    this.letterTileContainers.push(letterTileContainer);
  }
}

const GAP = "0.25rem";

const gameConfig = {
  type: Phaser.AUTO,
  scale: {
    width: "100%",
    height: "100%",
    mode: Phaser.Scale.NONE,
  },
  parent: "shower-panel",
  transparent: true,
  canvasStyle: `
    display: block;
    width: calc(100% - ${GAP});
    height: calc(100% - ${GAP});
    margin-top: calc(${GAP} / 2);
    margin-left: calc(${GAP} / 2);
  `,
};

export const initGame = (settings, onLetterRemoved) => {
  const game = new Phaser.Game(gameConfig);

  game.events.on("LETTER_REMOVED", onLetterRemoved);

  const showerScene = new ShowerScene();
  game.scene.add("ShowerScene", showerScene, true, settings);

  return {
    start: (settings) => {
      game.scene.wake(showerScene, settings);
    },

    stop: () => {
      game.scene.sleep(showerScene);
    },

    pause: () => {
      game.scene.pause(showerScene);
    },

    resume: (settings) => {
      game.scene.resume(showerScene, settings);
    },

    setNewLetterRate: (newLetterRate) => {
      game.events.emit("SET_NEW_LETTER_RATE", newLetterRate);
    },

    setLetterFallSpeed: (letterFallSpeed) => {
      game.events.emit("SET_LETTER_FALL_SPEED", letterFallSpeed);
    },

    addLetter: (id, letter, value) => {
      game.events.emit("ADD_LETTER", id, letter, value);
    },
  };
};
