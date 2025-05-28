import '../pages/index.css';
import { addCards, addNewCard } from './card.js';
import { openModal, closeModal } from './modal.js';

const placesList = document.querySelector('.places__list');
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
const namePlaceCard = document.querySelector('.popup__input_type_card-name');
const urlCard = document.querySelector('.popup__input_type_url');
//переменнные просмотра карточки
const popupViewCard = document.querySelector('.popup_type_image');
const popupImage = popupViewCard.querySelector('.popup__image');
const popupCuption = popupViewCard.querySelector('.popup__caption');
//кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal(popupEditProfile);
}

function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(popupEditProfile);
}

profileEditButton.addEventListener('click', openEditProfilePopup);
formEditProfile.addEventListener('submit', handleEditProfileSubmit); 

function handleAddNewCardSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: namePlaceCard.value,
        link: urlCard.value
    };
    addNewCard(placesList, newCard);
    evt.target.reset();
    closeModal(popupAddNewCard);
}

profileAddButton.addEventListener('click', () => {openModal(popupAddNewCard);});
formAddNewCard.addEventListener('submit', handleAddNewCardSubmit);

function viewCard(cardElement) {
    const cardImage = cardElement.querySelector('.card__image');
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCuption.textContent = cardImage.alt;
    openModal(popupViewCard);
}

// Вывести карточки на страницу
addCards(placesList);

export {viewCard};