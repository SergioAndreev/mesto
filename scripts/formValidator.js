export default class FormValidator{
    constructor(validate, formElement){
        this._form = formElement;
        this._submitButton = this._form.querySelector(validate.submitButtonSelector);
        this._inactiveButtonClass = validate.inactiveButtonClass;
        this._inputList = Array.from(this._form.querySelectorAll(validate.inputSelector));
        this._inputErrorClass = validate.inputErrorClass;
        this._errorClass = validate.errorClass;
    }

    _hasInvalidInput = () => this._inputList.some(inputElement => !inputElement.validity.valid);

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.setAttribute('disabled', true);
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.removeAttribute('disabled');
        }
    };


    _showInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
    };


    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    };
    _setInputListeners(){
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
    }

    enableValidation (){
        this._setInputListeners();
    }

    resetValidation() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
        });
        this._toggleButtonState();
    }

}