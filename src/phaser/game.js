import * as Phaser from "phaser";

const defaultLetterRemovedHandler = (id) => {
  console.log("[defaultLetterRemovedHandler]", { id });
};

export const makeGameActions = (
  game,
  onLetterRemoved = defaultLetterRemovedHandler
) => {
  game.events.on("LETTER_REMOVED", onLetterRemoved);

  return {
    start: () => {
      game.events.emit("START");
    },
    stop: () => {
      game.events.emit("STOP");
    },
    addLetter: (id, letter, value, letterFallSpeed) => {
      game.events.emit("ADD_LETTER", id, letter, value, letterFallSpeed);
    },
    // setLetterFallSpeed ?
  };
};

class ShowerScene extends Phaser.Scene {
  constructor() {
    console.log("[ShowerScene#constructor]");
    super("ShowerScene");
    this.lastLetterFallSpeed = -1;
    this.running = false;
  }

  create() {
    console.log("[ShowerScene#create]");
    this.game.events.on("START", this.onStart.bind(this));
    this.game.events.on("STOP", this.onStop.bind(this));
    this.game.events.on("ADD_LETTER", this.onAddLetter.bind(this));
  }

  update(_time, delta) {
    // if (!this.running) return;
    if (this.lastLetterFallSpeed >= 0) {
      const distanceToFall = this.sys.game.canvas.height;
      const letterFallSpeedFrameCount = this.lastLetterFallSpeed / delta;
      const fallDelta = distanceToFall / letterFallSpeedFrameCount;
      this.cameras.main.scrollY -= fallDelta;
    }
  }

  onStart() {
    console.log("[ShowerScene#onStart]");
    this.running = true;
    this.cameras.main.scrollY = 0;
  }

  onStop() {
    console.log("[ShowerScene#onStop]");
    this.running = false;
  }

  onAddLetter(id, letter, value, letterFallSpeed) {
    console.log("[ShowerScene#onAddLetter]", {
      id,
      letter,
      value,
      letterFallSpeed,
    });

    this.lastLetterFallSpeed = letterFallSpeed;

    const canvasWidth = this.sys.game.canvas.width;

    const SIZE = 50;
    const MARGIN = 5;

    const letterTile = this.add.graphics();
    letterTile.fillStyle(0xffe4c4); // Bisque
    letterTile.fillRoundedRect(0, 0, SIZE, SIZE, 10);

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
      .text(SIZE * 0.5, SIZE * 0.5, letter.toUpperCase(), letterTextStyle)
      .setOrigin(0.5);

    const valueText = this.add
      .text(SIZE * 0.85, SIZE * 0.8, value.toString(), valueTextStyle)
      .setOrigin(0.5);

    const availableWidth = canvasWidth - 2 * MARGIN - SIZE;
    const x = MARGIN + Math.floor(availableWidth * Math.random());
    const y = this.cameras.main.scrollY;
    const children = [letterTile, letterText, valueText];
    const letterTileContainer = this.add.container(x, y, children);
    letterTileContainer.postFX.addShadow(0, 1, 0.05);

    // TODO: instead of waiting an explicit amount of time:
    // - maintain an array of letterTileContainer
    // - in update(), check each outstanding letterTileContainer
    // - if a letterTileContainer is no longer visible then:
    //  - destroy it
    //  - emit a LETTER_REMOVED event passing id
    this.time.delayedCall(letterFallSpeed, () => {
      letterTileContainer.destroy(true);
      this.game.events.emit("LETTER_REMOVED", id);
    });
  }
}

const gameConfig = {
  type: Phaser.AUTO,
  scale: {
    width: "100%",
    height: "100%",
    mode: Phaser.Scale.FIT,
    // mode: Phaser.Scale.RESIZE,
  },
  backgroundColor: 0xffffff,
  scene: ShowerScene,
  parent: "shower-panel",
  expandParent: false,
  // canvasStyle: "display: block; padding: 0.25rem;",
  canvasStyle: "display: block; padding: 0; margin: 0;",
};

export const initGame = () => {
  return new Phaser.Game(gameConfig);
};
