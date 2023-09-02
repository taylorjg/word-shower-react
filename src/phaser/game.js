import * as Phaser from "phaser";

export const makeGameActions = (game) => {
  return {
    addLetter: (letter, value, letterFallSpeed) => {
      game.events.emit("ADD_LETTER", letter, value, letterFallSpeed);
    },
  };
};

class ShowerScene extends Phaser.Scene {
  constructor() {
    console.log("[ShowerScene#constructor]");
    super("ShowerScene");
  }

  create() {
    console.log("[ShowerScene#create]");
    this.game.events.on("ADD_LETTER", this.onAddLetter.bind(this));
  }

  onAddLetter(letter, value, letterFallSpeed) {
    console.log("[ShowerScene#onAddLetter]", {
      letter,
      value,
      letterFallSpeed,
    });

    const { width: canvasWidth, height: canvasHeight } = this.sys.game.canvas;

    const SIZE = 50;

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

    const randomX = Math.floor((canvasWidth - SIZE) * Math.random());

    const letterTileContainer = this.add.container(randomX, 0, [
      letterTile,
      letterText,
      valueText,
    ]);

    letterTileContainer.postFX.addShadow(0, 1, 0.02);

    this.tweens.add({
      targets: letterTileContainer,
      duration: letterFallSpeed,
      ease: "Linear",
      y: canvasHeight * 1.02,
      onComplete: () => {
        letterTileContainer.destroy(true);
      },
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
