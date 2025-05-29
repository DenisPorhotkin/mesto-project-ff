import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard,  handleLikeCard, deleteCard } from './card.js';
import { openModal, closeModal } from './modal.js';

const placesList = document.querySelector('.places__list');
const popupLlist = document.querySelectorAll('.popup');
//переменные для профиля
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const popupEditProfile = document.querySelector('.popup_type_edit');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
//переменные для новой карты
const formAddNewCard = document.querySelector('.popup__form[name="new-place"]');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const inputNameFormNewCard = document.querySelector('.popup__input_type_card-name');
const inputLinkFormNewCard = document.querySelector('.popup__input_type_url');
//переменнные просмотра карточки
const popupViewCard = document.querySelector('.popup_type_image');
const popupViewCardImage = popupViewCard.querySelector('.popup__image');
const popupViewCardCuption = popupViewCard.querySelector('.popup__caption');
//кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// Функция добавления карточек при загрузке страницы
function addCards(placeList) {
    initialCards.forEach(cardData => {
       addNewCard(placeList, cardData);
    });
}

// Функция добавления новой карточки вручную
function addNewCard(placeList, dataCard) {
    const cardElement = createCard(dataCard, handleLikeCard, deleteCard, viewCard);
    if (cardElement) {
        placeList.prepend(cardElement);
    }
}

// Обработчик для попапа редактирвания профиля
function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal(popupEditProfile);
}

// Функция открытия попапа для редактирования профиля
function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(popupEditProfile);
}

// Обработчик для попапа добавления новой карточки
function handleAddNewCardSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: inputNameFormNewCard.value,
        link: inputLinkFormNewCard.value
    };
    addNewCard(placesList, newCard);
    evt.target.reset();
    closeModal(popupAddNewCard);
}

// Функция для открытия попапа просмотра карточки
function viewCard(dataCard) {
    popupViewCardImage.src = dataCard.link;
    popupViewCardImage.alt = dataCard.name;
    popupViewCardCuption.textContent = dataCard.name;
    openModal(popupViewCard);
}

// Слушатель клика по оверлею или по крестику
popupLlist.forEach((event) => {
  event.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
  }
  })
})

profileEditButton.addEventListener('click', openEditProfilePopup);
formEditProfile.addEventListener('submit', handleEditProfileSubmit); 
profileAddButton.addEventListener('click', () => {openModal(popupAddNewCard);});
formAddNewCard.addEventListener('submit', handleAddNewCardSubmit);

// Вывести карточки на страницу
addCards(placesList);