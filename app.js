const items = [
  {
    img: "./images/note.png",
    key: "paper",
  },
  {
    img: "./images/scissors.png",
    key: "scissors",
  },
  {
    img: "./images/stone.png",
    key: "stone",
  },
];

const player = document.querySelector(".player");
const computer = document.querySelector(".computer");
const plate = document.querySelector(".plate");
const plateCenter = document.querySelector(".plate-center");
const playerScore = document.querySelector(".player-score")
const computerScore = document.querySelector(".computer-score")
const roundNumber = document.querySelector(".round-number");
let isFinished = false;
const soundOnHover = new Audio("./sound/onhover-sound.mp3");
const selectSound = new Audio("./sound/select.mp3");
const soundBtn = document.querySelector(".sound-btn");
const restartBtn = document.querySelector(".restart-btn");


let playerScoreCount = 0;
let computerScoreCount = 0;
let iterator = 0;
let maxRounds = 5;
let isSoundOn = true;

soundBtn.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>'

soundBtn.addEventListener("click", () => {
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    soundBtn.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
  } else {
    soundBtn.innerHTML = '<i class="fa-solid fa-volume-mute"></i>';
  }
});

restartBtn.addEventListener("click", () => {
  isSoundOn && selectSound.play()
  playerScoreCount = 0;
  computerScoreCount = 0;
  iterator = 0;
  isFinished = false;
  playerScore.textContent = playerScoreCount;
  computerScore.textContent = computerScoreCount;
  roundNumber.textContent = iterator;
  plateCenter.textContent = "";
  plate.style.visibility = "hidden";
  const imgContaniers = document.querySelectorAll(".img-container");
  imgContaniers.forEach((imgContanier) => {
    imgContanier.disabled = false;
  });
});


computer.innerHTML = `<img src='./images/question.png' />`;

function playerChoice(playerChoice, index) {
  isSoundOn && selectSound.play()
  plate.style.visibility = "visible";
  const computerChoice = items[Math.floor(Math.random() * items.length)].key;
  computerImage = items.find((item) => item.key === computerChoice).img;
  computer.innerHTML = `<img src=${computerImage} />`;
  const itms = document.querySelectorAll(".img-container");
  player.innerHTML = `<img src=${items[index].img} />`;
  for (let index = 0; index < itms.length; index++) {
    const element = itms[index];
    if (element.dataset.key === playerChoice) {
      element.classList.add("selected");
    } else {
      element.classList.remove("selected");
    }
  }
  if (playerChoice === computerChoice) {
    plateCenter.textContent = "Draw";
    playerScoreCount++;
    computerScoreCount++;
  } else if (playerChoice === "paper" && computerChoice === "scissors") {
    plateCenter.textContent = "Computer WIN!";
    computerScoreCount++;
  } else if (playerChoice === "stone" && computerChoice === "paper") {
    plateCenter.textContent = "Computer WIN!";
    computerScoreCount++;
  } else if (playerChoice === "scissors" && computerChoice === "stone") {
    plateCenter.textContent = "Computer WIN!";
    computerScoreCount++;
  } else {
    plateCenter.textContent = "Player WIN!";
    playerScoreCount++;
  }
  playerScore.textContent = playerScoreCount;
  computerScore.textContent = computerScoreCount;
  iterator++;
  roundNumber.textContent = iterator;
  if (iterator >= maxRounds) {
    isFinished = true;
    if (playerScoreCount > computerScoreCount) {
      plateCenter.textContent = "Player WIN!";
    } else if (playerScoreCount < computerScoreCount) {
      plateCenter.textContent = "Computer WIN!";
    } else {
      plateCenter.textContent = "Draw";
    }
    const imgContaniers = document.querySelectorAll(".img-container");
    imgContaniers.forEach((imgContanier) => {
      imgContanier.disabled = true;
    });
  }
}

const itemsEl = document.querySelector(".items");

for (let index = 0; index < items.length; index++) {
  const element = items[index];
  itemsEl.innerHTML += `<button data-key=${element.key} class=img-container onclick="playerChoice('${element.key}', '${index}')">
        <img src=${element.img} />
    </button>`;
}

const imgContaniers = document.querySelectorAll(".img-container");
imgContaniers.forEach((imgContanier) => {
  imgContanier.addEventListener("mouseover", () => {
    isSoundOn && soundOnHover.play();
  });
});
