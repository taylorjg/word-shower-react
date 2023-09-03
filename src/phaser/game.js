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
    start: (letterFallSpeed) => {
      game.events.emit("START", letterFallSpeed);
    },
    addLetter: (id, letter, value) => {
      game.events.emit("ADD_LETTER", id, letter, value);
    },
    setLetterFallSpeed: (letterFallSpeed) => {
      game.events.emit("SET_LETTER_FALL_SPEED", letterFallSpeed);
    },
  };
};

class ShowerScene extends Phaser.Scene {
  constructor() {
    console.log("[ShowerScene#constructor]");
    super("ShowerScene");
    this.previousTime = -1;
    this.letterTileContainers = [];
  }

  init(data) {
    console.log("[ShowerScene#init]", data);
    this.letterFallSpeed = data.letterFallSpeed;
  }

  create() {
    console.log("[ShowerScene#create]");
    this.game.events.on("START", this.onStart.bind(this));
    this.game.events.on("ADD_LETTER", this.onAddLetter.bind(this));
    this.game.events.on(
      "SET_LETTER_FALL_SPEED",
      this.onSetLetterFallSpeed.bind(this)
    );
  }

  update(time) {
    if (this.previousTime < 0) {
      this.previousTime = time;
      return;
    }

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

    const delta = time - this.previousTime;
    this.previousTime = time;
    const distanceToFall = this.sys.game.canvas.height;
    const letterFallSpeedFrameCount = this.letterFallSpeed / delta;
    const fallDelta = distanceToFall / letterFallSpeedFrameCount;
    this.cameras.main.scrollY -= fallDelta;
  }

  onStart(letterFallSpeed) {
    console.log("[ShowerScene#onStart]", { letterFallSpeed });
    this.cameras.main.scrollY = 0;
    this.previousTime = -1;
    this.letterFallSpeed = letterFallSpeed;
  }

  onSetLetterFallSpeed(letterFallSpeed) {
    console.log("[ShowerScene#onSetLetterFallSpeed]", { letterFallSpeed });
    this.letterFallSpeed = letterFallSpeed;
  }

  onAddLetter(id, letter, value) {
    console.log("[ShowerScene#onAddLetter]", {
      id,
      letter,
      value,
    });

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
    const y = this.cameras.main.scrollY - SIZE / 5;
    const children = [letterTile, letterText, valueText];
    const letterTileContainer = this.add.container(x, y, children);
    letterTileContainer.postFX.addShadow(0, 1, 0.05);
    letterTileContainer.setData("id", id);
    this.letterTileContainers.push(letterTileContainer);
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
  parent: "shower-panel",
  transparent: true,
  expandParent: false,
  // canvasStyle: "display: block; padding: 0.25rem;",
  canvasStyle: "display: block; padding: 0; margin: 0;",
};

export const initGame = (letterFallSpeed) => {
  const game = new Phaser.Game(gameConfig);
  const showerScene = new ShowerScene();
  game.scene.add("ShowerScene", showerScene, true, { letterFallSpeed });
  return game;
};
