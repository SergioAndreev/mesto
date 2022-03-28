import {initialCards} from './InitialCards.js';
import Card from './Card.js';
import FormValidator from "./FormValidator.js";

// объект классов Card
const templateCard = {
    itemImage: ('.element__photo'),
    itemTitle: ('.element__title'),
    likeBtn: ('.element__heart'),
    deleteBtn: ('.element__delete')
}


// Находим элементы в popup_type_image
const popupImage = document.querySelector('.popup_type_image');
const imageUrl = popupImage.querySelector('.popup__image-url');
const imageName = popupImage.querySelector('.popup__image-name');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');


// Находим форму в DOM
const profileEditFormElement = document.forms.edit__form;
// Находим поля формы в DOM
const userName = document.querySelector('.profile__user-name');
const userJob = document.querySelector('.profile__user-job');

// кнопки открытия попапов
const buttonOpenEditPopup = document.querySelector('.profile__edit-profile');
const buttonOpenNewelement = document.querySelector('.profile__add-button');

// Находим  PopoupEdit
const popupEdit = document.querySelector('.popup_type_edit');
const popupElement = document.querySelector('.popup_type_element');

// Находим кнопки в popup__container
const popupContainer = document.querySelector('.popup__container');
const buttonClosePopup = popupContainer.querySelector('.popup__close-button');


// Находим кнопки в popup__newelement
const popupNewelement = document.querySelector('.popup__newelement');
const buttonCloseNewelement = popupNewelement.querySelector('.popup__close-button');


// Находим поля в popup__form
const nameInput = profileEditFormElement.elements.user_name;
const jobInput = profileEditFormElement.elements.user_job;

// Находим элементы формы в в newelement
const newElementForm = document.forms.newelement__form;
const cardName = newElementForm.elements.card_name;
const cardUrl = newElementForm.elements.card_url;


// секция отображения карточек
const elementsContainer = document.querySelector('.elements');
// шаблон для создания карточек
const template = document.querySelector('.template');

// селекторы вылидации
const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Открываем PopUp
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('mousedown', clickOverlay);
    document.addEventListener('keydown', pressEscape);
}

// handler PopupEdit
function handlerPopupEdit() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    formEditProfileValidator.resetValidation();
    formAddCardValidator.resetValidation();
    openPopup(popupEdit);
}

// handler popupImage
const handlerPopupImage = function(name, link) {
    imageUrl.src = link;
    imageUrl.alt = name;
    imageName.textContent = name;
    openPopup(popupImage);
}

// Закрываем PopUp
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('mousedown', clickOverlay);
    document.removeEventListener('keydown', pressEscape);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function handleSubmitEditForm (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        userName.textContent = nameInput.value;
        userJob.textContent = jobInput.value;
        closePopup(popupEdit);
    }

// Оброботчик отправки формы нового элемента
function handleSubmitNewElementForm (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const newCard = {}
    newCard.name = cardName.value;
    newCard.link = cardUrl.value;

    closePopup(popupElement);
    newElementForm.reset();
    formAddCardValidator.toggleButtonState();
    elementsContainer.prepend(createCard(newCard));
}



// function setEventCard(card, name, link) {
//     // лайк
//     card.querySelector('.element__heart').addEventListener('click', function(evt) {
//         evt.target.classList.toggle('element__heart_active');
//     });
//
//     // удалить карточку
//     card.querySelector('.element__delete').addEventListener('click', () => {
//         card.remove();
//     });
//
//     // открытие карточку
//     card.querySelector('.element__photo').addEventListener('click', () => {
//         handlerPopupImage(name,link);
//     });
// }

// функция закрытия popup при клике во вне зоны
function clickOverlay (evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    };
};

// функция закрытия popup при нажатии Esc
function pressEscape (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
};
// Прикрепляем обработчик :
profileEditFormElement.addEventListener('submit', handleSubmitEditForm);
buttonClosePopup.addEventListener('click', () => closePopup(popupEdit));
buttonOpenEditPopup.addEventListener('click', handlerPopupEdit);

// Открытия закрытия нового элемента
buttonCloseNewelement.addEventListener('click', () => closePopup(popupElement));
buttonOpenNewelement.addEventListener('click', () => {
    openPopup(popupElement)
    formEditProfileValidator.resetValidation();
    formAddCardValidator.resetValidation();
});

// Закрытия popup Image
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));

// Обробочик отправки формы
newElementForm.addEventListener('submit', handleSubmitNewElementForm);

// Загрузим начальные карточки
initialCards.forEach((item) => {
    elementsContainer.prepend(createCard(item));
})

//валидация для выбранной формы.
const formEditProfileValidator = new FormValidator(selectors, popupEdit);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(selectors, newElementForm);
formAddCardValidator.enableValidation();

function createCard(card) {
    return new Card(card, templateCard, '.template', handlerPopupImage).createCard()
}
