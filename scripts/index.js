// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');

function TemplateCard(index) {

    if (!initialCards[index]) return;
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = initialCards[index].link;
    card.querySelector('.card__image').alt = initialCards[index].name;
    card.querySelector('.card__title').textContent = initialCards[index].name;
    card.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(card);
    });
    placesList.append(card);
}

// @todo: Функция создания карточки
function addCards() {

    initialCards.forEach((_, index) => TemplateCard(index));
}

// @todo: Функция удаления карточки
function deleteCard(item) {

    item.style.transition = 'opacity 0.5s ease';
    item.style.opacity = '0';
    setTimeout(() => {item.remove();}, 500);
}

// @todo: Вывести карточки на страницу
addCards();