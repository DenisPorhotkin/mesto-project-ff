function showInputError(formElement, inputElement, errorMessage, parametersValid) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(parametersValid.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(parametersValid.errorClass);
};

function hideInputError(formElement, inputElement, parametersValid) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(parametersValid.inputErrorClass);
    errorElement.classList.remove(parametersValid.errorClass);
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, parametersValid) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, parametersValid);
    } else {
        hideInputError(formElement, inputElement, parametersValid);
    }
};

// функция валидации формы
function enableValidation(parametersValid) {
    const formList = Array.from(document.querySelectorAll(parametersValid.formSelector));

    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(parametersValid.inputSelector));
        const buttonElement = formElement.querySelector(parametersValid.submitButtonSelector);
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, parametersValid);
            toggleButtonState(inputList, buttonElement, parametersValid.inactiveButtonClass);
            });
        });
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

function toggleButtonState(inputList, buttonElement, buttonInactive) {
    if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
          buttonElement.classList.add(buttonInactive);
    } else {
          buttonElement.disabled = false;
          buttonElement.classList.remove(buttonInactive);
    }
}; 

// функция очистки формы от ошибок валидации
function clearValidation(profileForm, parametersValid) {
    const inputList = Array.from(profileForm.querySelectorAll(parametersValid.inputSelector));
    inputList.forEach((input) => {
        input.classList.remove(parametersValid.inputErrorClass);
        const errorElement = profileForm.querySelector(`.${input.id}-error`);
        if (errorElement) {
          errorElement.textContent = '';
          errorElement.classList.remove(parametersValid.errorClass);
        }
    });
    const buttonElement = profileForm.querySelector(parametersValid.submitButtonSelector);
    if (buttonElement) {
        buttonElement.classList.add(parametersValid.inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

export { enableValidation, clearValidation };