"use strict"

const modal = document.querySelector('.modal')
const modalOverlay = document.querySelector('.modal-overlay');
const restartBtn = document.querySelector(".restart");



// Все карты
const cardsArr = [
	{ imgName: "img1", imgPath: "img/1.jpg" },
	{ imgName: "img1", imgPath: "img/1.jpg" },
	{ imgName: "img2", imgPath: "img/2.jpg" },
	{ imgName: "img2", imgPath: "img/2.jpg" },
	{ imgName: "img3", imgPath: "img/3.jpg" },
	{ imgName: "img3", imgPath: "img/3.jpg" },
	{ imgName: "img4", imgPath: "img/4.jpg" },
	{ imgName: "img4", imgPath: "img/4.jpg" },
	{ imgName: "img5", imgPath: "img/5.jpg" },
	{ imgName: "img5", imgPath: "img/5.jpg" },
	{ imgName: "img6", imgPath: "img/6.jpg" },
	{ imgName: "img6", imgPath: "img/6.jpg" },
]

//randomizer
function random(){
	cardsArr.sort(() => {
		return 0.5 - Math.random()
	});
}
random();

//Функция создания поля с карточками
function createCard() {
	let gameTable = document.querySelector(".game__table");
	for (let i = 0; i < cardsArr.length; i++) {
		const imgCard = document.createElement('IMG');
		imgCard.setAttribute("id", String(i));
		imgCard.setAttribute("src", "img/0.jpg");
		imgCard.setAttribute("class", "game__card");
		imgCard.addEventListener("click", flipCard);

		gameTable.appendChild(imgCard);
	}
}

createCard();

// Логика  игры
let cardsChosenArr = [];// Выбранные карточки
let cardsChosenArrId = [];// Идентефикаторы выбранных карточек
let quantityOfCards = []; //Количество выбранных карточек
let cardsOpen = []; //Открытые зеленые карты

function checkForMatch() {
	const cards = document.querySelectorAll('img');

	const id1 = cardsChosenArrId[0];
	const id2 = cardsChosenArrId[1];

	//Найдено соответствие 
	if (cardsChosenArr[0] === cardsChosenArr[1] && id1 !== id2) {
		quantityOfCards = [];
		cards[id1].classList.add('open');
		cards[id2].classList.add('open');
		//Удалить с карточки событие click
		cards[id1].removeEventListener("click", flipCard);
		cards[id2].removeEventListener("click", flipCard);
		//Добавить элемент в массив открытых карт
		cardsOpen.push(cards[id1]);
		cardsOpen.push(cards[id2]);

		//если открыты все карты 
		if (cardsOpen.length === cardsArr.length) {
			showModal();
		}
	} else {
		//если карты не совпали
		quantityOfCards = [];
		cards[id1].setAttribute("src", "img/0.jpg");
		cards[id2].setAttribute("src", "img/0.jpg");
		cards[id1].classList.remove('flip');
		cards[id2].classList.remove('flip');

		cards[id1].addEventListener("click", flipCard);
		cards[id2].addEventListener("click", flipCard);
		
	}
	//Clear the arrays
	cardsChosenArr = [];
	cardsChosenArrId = [];
}

function flipCard() {
	quantityOfCards.push(this);
	if (quantityOfCards.length > 2){
		return
	}
	 
	let cardId = this.getAttribute("id");
	cardsChosenArr.push(cardsArr[cardId].imgName);
	cardsChosenArrId.push(cardId);

	//записать в src путь к картинке
	this.setAttribute("src", cardsArr[cardId].imgPath);

	if (cardsChosenArr.length === 2) {
		setTimeout(checkForMatch, 1000)
	}

	this.classList.add('flip');
	this.removeEventListener("click", flipCard);
}

function showModal(){
	modal.classList.add('show');
	modalOverlay.classList.add('show');
}

function hideModal() {
	modal.style.display = "none";
	modalOverlay.style.display = "none"
}

// restart
restartBtn.addEventListener("click", () =>{
	location.reload();
});







