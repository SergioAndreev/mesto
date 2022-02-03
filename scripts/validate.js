const showInputError = (arg, formElement, inputElement, errorMessage) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(arg.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(arg.errorClass);
};

const hideInputError = (arg, formElement, inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(arg.inputErrorClass);
    errorElement.classList.remove(arg.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (arg, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(arg, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(arg, formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (arg, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(arg.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(arg.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (arg, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(arg.inputSelector));
    const buttonElement = formElement.querySelector(arg.submitButtonSelector);
    toggleButtonState(arg, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(arg, formElement, inputElement);
            toggleButtonState(arg, inputList, buttonElement);
        });
    });
};

const enableValidation = (arg) => {
    const formList = Array.from(document.querySelectorAll(arg.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(arg, formElement);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});