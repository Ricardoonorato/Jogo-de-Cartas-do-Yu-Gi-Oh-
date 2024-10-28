const playersSides = {
  player: "playerCards",
  computer: "computerCards",
};

const state = {
  actions: {
    button: document.getElementById("next-duel"),
  },
  score: {
    playerScore: 0,
    computerScore: 0,
    getPlayerScore: document.querySelector(".score_victory"),
    getComputerScore: document.querySelector(".score_defeat"),
  },
  cardSprite: {
    card: document.getElementById("card-image"),
    name: document.getElementById("cardName"),
    type: document.getElementById("cardType"),
  },
  fieldCards: {
    playerCard: document.getElementById("computer-field-card"),
    computerCard: document.getElementById("player-field-card"),
  },
  playersSides: {
    player: document.getElementById(playersSides.player),
    computer: document.getElementById(playersSides.computer),
  },
};

const cardsPath = "./src/assets/icons/";

const cardsData = [
  {
    id: 0,
    name: "Dragão Branco Dos olhos azuis",
    type: "papel",
    img: `${cardsPath}dragon.png`,
    winOf: [1],
    loseOf: [2],
  },
  {
    id: 1,
    name: "Mago Negro",
    type: "pedra",
    img: `${cardsPath}magician.png`,
    winOf: [2],
    loseOf: [0],
  },
  {
    id: 2,
    name: "Cabeça Do Exodia",
    type: "Tesoura",
    img: `${cardsPath}exodia.png`,
    winOf: [0],
    loseOf: [1],
  },
];

function drawCards(quantity, owner) {
  for (let i = 0; i < quantity; i++) {
    const ramdomId = parseInt(Math.random() * 3);
    const cardImage = createCardImage(cardsData[ramdomId].id, owner);

    document.getElementById(owner).appendChild(cardImage);
  }
}

function createCardImage(cardId, CardOwner) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", `${cardsPath}card-back.png`);
  cardImage.setAttribute("data-id", cardId);
  cardImage.classList.add("card");

  state.actions.button.style.display = "none";

  if (CardOwner === playersSides.player) {
    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });

    cardImage.addEventListener("mouseover", () => {
      drawSelectedCard(cardId);
    });
  }

  return cardImage;
}

function drawSelectedCard(cardId) {
  state.cardSprite.card.src = cardsData[cardId].img;
  state.cardSprite.name.textContent = cardsData[cardId].name;
  state.cardSprite.type.textContent = "Atributo: " + cardsData[cardId].type;
}

async function setCardsField(dataId) {
  removeAllCards();

  let computerCardId = parseInt(Math.random() * 3);

  state.fieldCards.playerCard.style.display = "block";
  state.fieldCards.computerCard.style.display = "block";

  state.fieldCards.playerCard.src = cardsData[dataId].img;
  state.fieldCards.computerCard.src = cardsData[computerCardId].img;
  let duelResults = await checkDuelResults(parseInt(dataId), computerCardId);

  updateScore();
  drawButton(duelResults);
}

function removeAllCards() {
  let getCards = state.playersSides.computer;
  getCards.querySelectorAll("img").forEach((img) => img.remove());

  getCards = state.playersSides.player;
  getCards.querySelectorAll("img").forEach((img) => img.remove());
}

async function checkDuelResults(playerId, computerId) {
  let result = "Empate";

  let playerCard = cardsData[playerId];
  let computerCard = cardsData[computerId];

  if (playerCard.winOf.includes(computerId)) {
    result = "Ganhou";
    state.score.playerScore++;
  }

  if (computerCard.winOf.includes(playerId)) {
    result = "Perdeu";
    state.score.computerScore++;
  }

  return result;
}

function updateScore() {
  state.score.getComputerScore.innerText = `Defeat: ${state.score.computerScore}`;
  state.score.getPlayerScore.innerText = `Wins: ${state.score.playerScore}`;
}

function drawButton(duelResult) {
  state.actions.button.innerText = duelResult;
  state.actions.button.style.display = "block";
}

function resetDuel() {
  state.cardSprite.card.src = "";
  state.actions.button.style.display = "none";
  console.log(state.actions.button.style.display);

  state.fieldCards.playerCard.style.display = "none";
  state.fieldCards.computerCard.style.display = "none";

  main();
}

function main() {
  drawCards(5, playersSides.player);
  drawCards(5, playersSides.computer);

  const bgm = document.getElementById("bgm");
  bgm.volume = 0.1;
  bgm.play();
}

main();
