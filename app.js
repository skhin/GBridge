// GAME CODES

const instructionBtn = document.getElementById("instructions-btn");
const startBtn = document.getElementById("start-btn");
const timer = document.getElementById("timer");
const comments = document.getElementById("comments");
const livesCount = document.querySelector(".lives-count");
const player = document.querySelector(".player-icon");
const gameBody = document.querySelector(".game-body");
const glassTiles = document.querySelectorAll(".glass-tile");
const startPosition = document.querySelector(".player-start-position");
const endPosition = document.querySelector(".player-end-position");
const endPositionHolder = document.querySelector(".end-position");
const gameoverScreen = document.querySelector(".gameover-screen");
const gameoverText = document.querySelector(".gameover-text");
const restartBtn = document.getElementById("restart-btn");

// Toggle audio
const myAudio = document.getElementById("myAudio");

function togglePlay() {
  myAudio.volume = 0.2;
  return myAudio.paused ? myAudio.play() : myAudio.pause();
}

let time = 30;
let startgame = false;
let totalLife = 3;
let lostTilesRandom = [];
let loseLife = false;
let previousTileCleared = true;
let previousTile;
let playerIcon;
let i = 1;
let gameover = false;
let interval;

// SETTING THE TILES
const tilesArray = {
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

//start button control
startBtn.addEventListener("click", () => {
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

//generating random losing tiles for the game
lostTilesRandom = ComputerGenerateRandomTiles(tilesArray);

//computer generating random tile numbers to lose
function ComputerGenerateRandomTiles(tilesArray) {
  let Tiles = [];

  for (const set in tilesArray) {
    Tiles.push(getRandom(tilesArray[set][0], tilesArray[set][1]));
  }

  return Tiles;
}
// console.log(ComputerGenerateRandomTiles());

//once the game starts
glassTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    //checking if startgame button was pressed
    if (!startgame) {
      // return (comments.innerHTML = "Please press the start button!");
      alert("Please press the start button!");
    }

    // checking if the previous tile set was cleared
    if (
      tilesArray[i][0] == tile.dataset.value ||
      tilesArray[i][1] == tile.dataset.value
    ) {
      // console.log("cleared");

      previousTileCleared = true;

      //removing the player icon from the previous tile
      if (i != 1) previousTile.removeChild(player);
      // checking if it is a losing tile
      lostTilesRandom.forEach((lostTile) => {
        if (tile.dataset.value == lostTile) {
          loseLife = true;

          // console.log("lives - 1");
        }
      });
      return;
    }
    if (tile.dataset.value) {
      alert("Previous set has not been selected! Do not cheat!");
      previousTileCleared = false;
      return;
    }

    //
  });
});

glassTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
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
      //if the player steps onto the correct tile then i++
      i++;
      movePlayer(tile);
      //   console.log("move on");
      comments.innerText = "Move forward!";
    }
    // console.log(tile);
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
// console.log(getRandom());

// player moving to the next tile set
function movePlayer(tile) {
  tile.appendChild(player);
  previousTile = tile;
}

function gameOver() {
  gameBody.classList.add("hide");
  gameoverScreen.classList.remove("hide");
  clearInterval(interval);
}

function winGame() {
  gameBody.classList.add("hide");
  gameoverText.innerText = "You Won! I'll get you next time ";
  gameoverScreen.classList.remove("hide");
}
