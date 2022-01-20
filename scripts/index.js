// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');

let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__user-job');

let popup = document.querySelector('.popup');
let buttonClosePopup = document.querySelector('.popup__close-button');
let buttonOpenPopup = document.querySelector('.profile__edit-profile');

function openPopup() {
    popup.classList.add('popup_opened');
}
function closePopup() {
    popup.classList.remove('popup_opened');
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        userName.innerText = nameInput.value;
        userJob.innerText = jobInput.value;
        closePopup();
    }
// Прикрепляем обработчик :
formElement.addEventListener('submit', formSubmitHandler);
buttonClosePopup.addEventListener('click', closePopup);
buttonOpenPopup.addEventListener('click', openPopup);


