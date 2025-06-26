
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(dataCard, onLikeCard, onOpenPopupDeleteCard, onOpenImagePopup, canDelete, hasUserLiked) {
    if (!dataCard) return;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardLike = card.querySelector('.card__like-button');
    const buttonDelete = card.querySelector('.card__delete-button');
    
    cardImage.src = dataCard.link;
    cardImage.alt = dataCard.name;
    buttonDelete.hidden = canDelete;
    if(hasUserLiked) {cardLike.classList.toggle('card__like-button_is-active');}
    card.querySelector('.card__title').textContent = dataCard.name;
    card.querySelector('.count__likes').textContent = dataCard.likes.length;
    buttonDelete.addEventListener('click', () => { onOpenPopupDeleteCard(dataCard, card); });
    cardLike.addEventListener('click', () => { onLikeCard(dataCard, card); })
    cardImage.addEventListener('click', () => { onOpenImagePopup(dataCard); })
    return card;
}

// Функция удаления карточки
function deleteCard(item) {
    item.remove();
}

// Функция активности лайка
function handleLikeCard(button, dataCard) {
    button.classList.toggle('card__like-button_is-active');
    button.closest('.card').querySelector('.count__likes').textContent = dataCard.likes.length;
}

export { createCard, handleLikeCard, deleteCard };