
const cardTemplate = document.querySelector('#card-template').content;
// Функция создания карточки
function createCard(dataCard, onLikeCard, onDeleteCard, onOpenImagePopup) {
    if (!dataCard) return;    
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardLike = card.querySelector('.card__like-button');

    cardImage.src = dataCard.link;
    cardImage.alt = dataCard.name;
    card.querySelector('.card__title').textContent = dataCard.name;
    card.querySelector('.card__delete-button').addEventListener('click', () => { onDeleteCard(card); });
    cardLike.addEventListener('click', () => { onLikeCard(cardLike); })
    cardImage.addEventListener('click', () => { onOpenImagePopup(dataCard); })
    return card;
}

// Функция удаления карточки
function deleteCard(item) {
    item.remove();
}

// Функция активности лайка
function handleLikeCard(item) {
    item.classList.toggle('card__like-button_is-active');
}

export { createCard, handleLikeCard, deleteCard };