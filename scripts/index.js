// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');

function createCard(idCard, delCard) {

    if (!idCard) return;
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');

    cardImage.src = idCard.link;
    cardImage.alt = idCard.name;
    card.querySelector('.card__title').textContent = idCard.name;
    card.querySelector('.card__delete-button').addEventListener('click', () => {
       delCard(card);
    });
    return card;
}

// @todo: Функция создания карточки

function addCards() {

    initialCards.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard);
        if (cardElement) {
            placesList.append(cardElement);
        }
    });
}


// @todo: Функция удаления карточки
function deleteCard(item) {
    
    item.remove();
}

// @todo: Вывести карточки на страницу
addCards();