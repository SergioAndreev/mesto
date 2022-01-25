// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__user-job');

// Находим  Popoup
let popup = document.querySelector('.popup');
// Находим кнопки Popoup
let buttonClosePopup = document.querySelector('.popup__close-button');
let buttonOpenPopup = document.querySelector('.profile__edit-profile');
// Находим поля в Popoup
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

// Открываем PopUp
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}
// Закрываем PopUp
function closePopup() {
    popup.classList.remove('popup_opened');
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        userName.textContent = nameInput.value;
        userJob.textContent = jobInput.value;
        closePopup();
    }
// Прикрепляем обработчик :
formElement.addEventListener('submit', formSubmitHandler);
buttonClosePopup.addEventListener('click', closePopup);
buttonOpenPopup.addEventListener('click', openPopup);


