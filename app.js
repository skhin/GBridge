// GAME CODES

const glassTiles = document.querySelectorAll(".glass-tile");
const timer = document.getElementById("timer");
const comments = document.getElementById("comments");
const livesCount = document.querySelector(".lives-count");
const player = document.querySelector(".player-icon");
const startPosition = document.querySelector(".player-start-position");
const instructionBtn = document.getElementById("instructions-btn");
const gameoverScreen = document.querySelector(".gameover-screen");
const gameoverText = document.querySelector(".gameover-text");
const gameBody = document.querySelector(".game-body");
const restartBtn = document.getElementById("restart-btn");
const endPosition = document.querySelector(".player-end-position");
const endPositionHolder = document.querySelector(".end-position");
const startBtn = document.getElementById("start-btn");
const audioBtn = document.getElementById("audio-btn");

let time = 30;
let randomLosingTiles = [];
let totalLife = 3;
let loseLife = false;
let previousTileCleared = true;
let i = 1;
let previousTile;
let playerIcon;
let gameover = false;
let startgame = false;
let interval;

// SETTING THE TILES
const SetofTiles = {
  1: [1, 2],
  2: [3, 4],
  3: [5, 6],
  4: [7, 8],
  5: [9, 10],
  6: [11, 12],
  7: [13, 14],
};

// instructions button pop-up
function instructions() {
  alert(
    "Players will attempt to cross two parallel bridges by jumping across tempered glass panels while avoiding weaker panes of regular glass. Those who land on a regular glass panel will fall to your DEATH⚰️, resulting in a life lost. You have 3 lives, so use them well"
  );
}
instructionBtn.addEventListener("click", instructions);

//generating random losing tiles for the game
randomLosingTiles = ComputerGenerateRandomTiles(SetofTiles);

//computer generating random tile numbers to lose
function ComputerGenerateRandomTiles(SetofTiles) {
  let Tiles = [];

  for (const set in SetofTiles) {
    Tiles.push(getRandom(SetofTiles[set][0], SetofTiles[set][1]));
  }

  return Tiles;
}

//start button control
startBtn.addEventListener("mousedown", () => {
  startgame = true;
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      timer.innerText = `Time : ${time}sec`;
      if (time == 0) {
        gameOver();
      }
    }
  }, 1000);
});

//once the game starts
glassTiles.forEach((tile) => {
  tile.addEventListener("mousedown", () => {
    //checking if startgame button was pressed
    if (!startgame) {
      return (comments.innerHTML = "Please press the start button!");
    }
    // checking if the previous tile set was cleared
    if (
      SetofTiles[i][0] == tile.dataset.value ||
      SetofTiles[i][1] == tile.dataset.value
    ) {
      // console.log("previous tile set was cleared");
      previousTileCleared = true;
      //removing the player icon from the previous tile
      if (i != 1) previousTile.removeChild(player);
      // checking if it is a losing tile
      randomLosingTiles.forEach((losingTile) => {
        if (tile.dataset.value == losingTile) {
          loseLife = true;

          // console.log("lives - 1");
        }
      });
      return;
    }
    if (tile.dataset.value) {
      comments.innerText = "Previous set has not been selected! Do not cheat!";
      previousTileCleared = false;
      return;
    }

    //
  });
});

glassTiles.forEach((tile) => {
  tile.addEventListener("mouseup", () => {
    //checking if startgame button was pressed
    if (!startgame) return;
    if (!previousTileCleared) return;
    if (loseLife) {
      comments.innerText = "You lost a life!";
      tile.style.backgroundColor = "black";
      startPosition.appendChild(player);
      i = 1;
      totalLife--;
      livesCount.innerText = `Lives left : ${totalLife}`;

      loseLife = false; //resetting the loselife
      tile.dataset.value = null;

      //checking if total life is 0
      if (totalLife == 0) {
        // console.log("gameover");
        gameOver();
      }
      //
    } else {
      //if the player stepped onto the correct tile then i++
      i++;
      movePlayer(tile);
      //   console.log("go next");
      comments.innerText = "Move forward!";
    }
  });
});

//To win the game
endPosition.addEventListener("click", () => {
  if (i >= 8 && !gameover) {
    endPosition.removeChild(endPositionHolder);
    endPosition.appendChild(player);
    winGame();
  }
});
//

//to restart the game
restartBtn.addEventListener("click", () => {
  window.location = "./";
});

// randomizing each tile set
function getRandom(min, max) {
  max++; //since the max value is not included
  return Math.floor(Math.random() * (max - min)) + min;
}

// player moving to the next tile set
function movePlayer(tile) {
  tile.appendChild(player);
  previousTile = tile;
}

function gameOver() {
  gameBody.classList.add("hide");
  gameoverScreen.classList.remove("hide");
  clearInterval(interval);
  backgroundMusic.pause();
}

function winGame() {
  gameBody.classList.add("hide");
  gameoverText.innerText = "You Won! I'll get you next time ";
  gameoverScreen.classList.remove("hide");
}
