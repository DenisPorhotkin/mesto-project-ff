import { initialCards } from './cards.js';
import { viewCard } from './index.js';

// Функция создания карточки
function createCard(idCard, likeCard, delCard, openCard) {
    if (!idCard) return;
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardLike = card.querySelector('.card__like-button');

    cardImage.src = idCard.link;
    cardImage.alt = idCard.name;
    card.querySelector('.card__title').textContent = idCard.name;
    card.querySelector('.card__delete-button').addEventListener('click', () => { delCard(card); });
    cardLike.addEventListener('click', () => { likeCard(cardLike); })
    cardImage.addEventListener('click', () => { openCard(card); })
    return card;
}

// Функция добавления карточек при загрузке страницы
function addCards(placeList) {
    initialCards.forEach(cardData => {
       addNewCard(placeList, cardData);
    });
}

// Функция добавления новой карточки вручную
function addNewCard(placeList, idCard) {
    const cardElement = createCard(idCard, handleLikeCard, deleteCard, viewCard);
    if (cardElement) {
        placeList.prepend(cardElement);
    }
}

// Функция удаления карточки
function deleteCard(item) {
    item.remove();
}

// Функция активности лайка
function handleLikeCard(item) {
    item.classList.toggle('card__like-button_is-active');
}

export { addCards, addNewCard };