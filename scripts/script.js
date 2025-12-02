const cardArray = [
    {
        name: "apple",
        img: "images/apple-whole-solid-full.svg"
    },
    {
        name: "riceBowl",
        img: "images/bowl-rice-solid-full.svg"
    },
    {
        name: "burger",
        img: "images/burger-solid-full.svg"
    },
    {
        name: "cake",
        img: "images/cake-candles-solid-full.svg"
    },
    {
        name: "carrot",
        img: "images/carrot-solid-full.svg"
    },
    {
        name: "pizza",
        img: "images/pizza-slice-solid-full.svg"
    },
    {
        name: "apple",
        img: "images/apple-whole-solid-full.svg"
    },
    {
        name: "riceBowl",
        img: "images/bowl-rice-solid-full.svg"
    },
    {
        name: "burger",
        img: "images/burger-solid-full.svg"
    },
    {
        name: "cake",
        img: "images/cake-candles-solid-full.svg"
    },
    {
        name: "carrot",
        img: "images/carrot-solid-full.svg"
    },
    {
        name: "pizza",
        img: "images/pizza-slice-solid-full.svg"
    }
]

const randomizedCards = cardArray.sort(() => 0.5 - Math.random());
const gridElement = document.querySelector(".gridContainer");
const resultSpanElement = document.querySelector(".result");
const timeDisplay = document.querySelector(".timeDisplay");
const startGameButton = document.querySelector(".startGameButton");

let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

let userTime = 0;
let timerInterval = null;

// ⭐ Starta timern
const startTimer = () => {
    timerInterval = setInterval(() => {
        userTime++;
        timeDisplay.textContent = userTime;
    }, 1000);
};

// ⭐ Stoppa timern
const stopTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
};

// ⭐ Startknapp
startGameButton.addEventListener("click", () => {
    // Reset
    userTime = 0;
    cardsWon = [];
    timeDisplay.textContent = 0;
    resultSpanElement.textContent = 0;

    // Starta timern
    if (!timerInterval) startTimer();

    // Rensa och bygg om board
    gridElement.innerHTML = "";
    createBoard();
});



const createBoard = () => {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", "images/square-solid-full.svg");
        card.setAttribute("data-id", i);
        card.setAttribute("class", "card");
        card.addEventListener('click', flipCard);
        //console.log(card, i);
        gridElement.append(card);
    }
}

function checkMatch() {
    const allCards = document.querySelectorAll(".card");
    const cardClickedOneId = cardsChosenIds[0];
    const cardClickedTwoId = cardsChosenIds[1];
    console.log("check for match");

    if (cardClickedOneId == cardClickedTwoId) {
        alert("You clicked the same image twice")
        allCards[cardClickedOneId].setAttribute("src", "images/square-solid-full.svg")
        allCards[cardClickedTwoId].setAttribute("src", "images/square-solid-full.svg")
    }

    if (cardsChosen[0] == cardsChosen[1]) {
        alert("you found a match");
        allCards[cardClickedOneId].setAttribute('src', 'images/square-check-solid-full.svg')
        allCards[cardClickedTwoId].setAttribute('src', 'images/square-check-solid-full.svg')
        allCards[cardClickedOneId].removeEventListener('click', flipCard)
        allCards[cardClickedTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen);
    }
    else {
        allCards[cardClickedOneId].setAttribute("src", "images/square-solid-full.svg")
        allCards[cardClickedTwoId].setAttribute("src", "images/square-solid-full.svg")
        alert("Sorry try again")
    }

    resultSpanElement.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == (cardArray.length / 2)) {
        resultSpanElement.innerHTML = `Congratulation, you found them all in ${userTime} seconds`;
        stopTimer();
    }
}

function flipCard() {
    let cardId = this.getAttribute("data-id")
    let cardName = cardArray[cardId].name;
    cardsChosen.push(cardName);
    cardsChosenIds.push(cardId);
    console.log(cardsChosen, cardsChosenIds);

    this.setAttribute('src', cardArray[cardId].img);

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

