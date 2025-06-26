import '../pages/index.css';
import { createCard,  handleLikeCard, deleteCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards,
         getUserParameters,
         checkResource, 
         editProfile, 
         addNewCardOnServ, 
         deleteCardOnServer, 
         likeCardOnServer, 
         deleteLikeCardOnServer, 
         editAvatar 
        } from './api.js';

const placesList = document.querySelector('.places__list');
const popupList = document.querySelectorAll('.popup');

//переменные для профиля
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const popupEditProfile = document.querySelector('.popup_type_edit');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_description');
const formEditAvatarProfile = document.querySelector('.popup__form[name="update-avatar"]');
const popupEditAvatarProfile = document.querySelector('.popup_type_update_avatar');
const avatarInput = popupEditAvatarProfile.querySelector('.popup__input_type_url');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const avatarElement = document.querySelector('.profile__image');
const styles = window.getComputedStyle(avatarElement);

//переменные для новой карты
const formAddNewCard = document.querySelector('.popup__form[name="new-place"]');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const inputNameFormNewCard = document.querySelector('.popup__input_type_card-name');
const inputLinkFormNewCard = document.querySelector('.popup__input_type_url');

//переменнные просмотра карточки
const popupViewCard = document.querySelector('.popup_type_image');
const popupViewCardImage = popupViewCard.querySelector('.popup__image');
const popupViewCardCuption = popupViewCard.querySelector('.popup__caption');

//переменные для удаления карточки
const formDeleteCard =  document.querySelector('.popup__form[name="delete-card"]');
const popupDeleteCard = document.querySelector('.popup_type_delete');
let idDeleteCard;
let cardForDelete;

//кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//объект настроек для валидации форм
const parametersValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция добавления карточек при загрузке страницы
function addCards(placeList, initialCards, idUser) {
    initialCards.forEach(cardData => {
        const canDelete = idUser !== cardData.owner._id;
        const hasUserLiked = cardData.likes.some(like => like._id.toString() === idUser);
        addNewCard(placeList, cardData, canDelete, hasUserLiked);
    });
}

// Функция добавления новой карточки в DOM
function addNewCard(placeList, dataCard, canDelete, hasUserLiked) {
    const cardElement = createCard(dataCard, changeAddDeleteLikes, viewPopupDeleteCard, viewCard, canDelete, hasUserLiked);
    if (cardElement) {
        placeList.prepend(cardElement);
    }
}

// Обработчик для попапа редактирвания профиля
function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    editProfile(nameInput.value, jobInput.value)
        .then((user) => {
            profileName.textContent = user.name;
            profileJob.textContent = user.about;
            closeModal(popupEditProfile);
        })
        .catch(() => {
            showError("Не удалось обновить профиль. Попробуйте ещё раз.");
            console.error('Ошибка при обновлении данных:', err);
        })
        .finally(() => {
            submitButton.textContent = initialText;
        });
}

// Обработчик для попапа редактирвания аватара профиля
function handleEditAvatarProfileSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';
    checkResource(avatarInput.value)
        .then((result) => {
            if(result.exists) {
                editAvatar(avatarInput.value)
                    .then((user) => {
                        avatarElement.style.backgroundImage = user.avatar;
                        closeModal(popupEditAvatarProfile);
                    })
                        .catch((err) => {
                            showError("Не удалось обновить аватар профиля. Попробуйте ещё раз.");
                            console.error('Ошибка при обновлении аватара:', err);
                    })            
            }
            else {
                alert("Некорректная ссылка. Попробуйте ещё раз.");
            }
        })
        .catch((err) => {
            showError("Не удалось найти файл. Попробуйте ещё раз.");
            console.error('Ошибка при обращении к файлу:', err);
        })
        .finally(() => {
            submitButton.textContent = initialText;
        });

}


// Функция открытия попапа для редактирования профиля
function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(popupEditProfile);
    clearValidation(formEditProfile, parametersValid);
    enableValidation(parametersValid);
}

// Функция открытия попапа для редактирования аватара профиля
function openEditAvatarProfilePopup() {
    const backgroundImage = styles.getPropertyValue('background-image');
    const avatarUrl = backgroundImage.replace(/^url\(["']?|["']?\)$/g, '');
    avatarInput.value = avatarUrl;
    openModal(popupEditAvatarProfile);
    clearValidation(formEditAvatarProfile, parametersValid);
    enableValidation(parametersValid);
}

// Обработчик для попапа добавления новой карточки
function handleAddNewCardSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    addNewCardOnServ(inputNameFormNewCard.value, inputLinkFormNewCard.value)
        .then((dataCard) => {
            addNewCard(placesList, dataCard, false);
            evt.target.reset();
            closeModal(popupAddNewCard);
        })
        .catch((err) => {
            showError("Не удалось добавить карточку. Попробуйте ещё раз.");
            console.error('Ошибка при добавлении карточки:', err);
        })
        .finally(() => {
            submitButton.textContent = initialText;
        });
}

// Обработчик для попапа удаления карточки
function handleDeleteCardSubmit(evt) {
    evt.preventDefault();
    deleteCardOnServer(idDeleteCard)
        .then(() => {
            deleteCard(cardForDelete);
            closeModal(popupDeleteCard);
        })
        .catch((err) => {
            showError("Не удалось удалить карточку. Попробуйте ещё раз.");
            console.error('Ошибка при удалении карточки:', err);
        })
}

// Функция для открытия попапа просмотра карточки
function viewCard(dataCard) {
    popupViewCardImage.src = dataCard.link;
    popupViewCardImage.alt = dataCard.name;
    popupViewCardCuption.textContent = dataCard.name;
    openModal(popupViewCard);
}

// Функция для открытия попапа удаления карточки
function viewPopupDeleteCard(dataCard, card) {
    if(dataCard) {
        idDeleteCard = dataCard._id;
        cardForDelete = card;
    }
    openModal(popupDeleteCard);
}

// функция добавления и удаления лайков
function changeAddDeleteLikes(dataCard, card) {
    const likeButton = card.querySelector('.card__like-button');
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    if(isLiked) {
        deleteLikeCardOnServer(dataCard._id)
            .then((data) => {
                handleLikeCard(likeButton, data);
            })
    } else {
        likeCardOnServer(dataCard._id)
            .then((data) => {
                handleLikeCard(likeButton, data);
            })
    }
}

// Получаем данные пользователя и карточек с сервера
Promise.all([getUserParameters(), getInitialCards()])
    .then(([user, cards]) => {
        profileName.textContent = user.name;
        profileJob.textContent = user.about;
        avatarElement.style.backgroundImage = `url(${user.avatar})`;
        // Вывести карточки на страницу
        addCards(placesList, cards, user._id);
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });

// Слушатель клика по оверлею или по крестику
popupList.forEach((event) => {
  event.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
  })
})


profileEditButton.addEventListener('click', openEditProfilePopup);
formEditProfile.addEventListener('submit', handleEditProfileSubmit); 
profileAddButton.addEventListener('click', () => {
    inputNameFormNewCard.value = '';
    inputLinkFormNewCard.value = '';
    openModal(popupAddNewCard); 
    enableValidation(parametersValid); 
    clearValidation(formAddNewCard, parametersValid);
});
formAddNewCard.addEventListener('submit', handleAddNewCardSubmit);
formDeleteCard.addEventListener('submit', handleDeleteCardSubmit);
avatarElement.addEventListener('click', openEditAvatarProfilePopup);
formEditAvatarProfile.addEventListener('submit', handleEditAvatarProfileSubmit);