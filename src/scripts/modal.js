// Открытие попапа
function openModal(popupElement) {
    popupElement.classList.add('popup_is-animated');
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
    popupElement.addEventListener('click', handleOverlayCrossClick);
}

// Закрытие попапа
function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
    popupElement.removeEventListener('click', handleOverlayCrossClick);
}

// Обработчик Esc
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Обработчик клика по оверлею или по крестику
function handleOverlayCrossClick(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

export { openModal, closeModal };