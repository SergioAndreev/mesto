// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__user-job');

// кнопки открытия попапов
let buttonOpenPopup = document.querySelector('.profile__edit-profile');
let buttonOpenNewelement = document.querySelector('.profile__add-button');

// Находим  PopoupEdit
let popupEdit = document.querySelector('.popup_type_edit');
let popupElement = document.querySelector('.popup_type_element');

// Находим кнопки в popup__container
let popupContainer = document.querySelector('.popup__container');
let buttonClosePopup = popupContainer.querySelector('.popup__close-button');

// Находим элементы в popup_type_image
let popupImage = document.querySelector('.popup_type_image');
let imageUrl = popupImage.querySelector('.popup__image-url');
let imageName = popupImage.querySelector('.popup__image-name');
let buttonCloseImage = popupImage.querySelector('.popup__close-button');

// Находим кнопки в popup__newelement
let popupNewelement = document.querySelector('.popup__newelement');
let buttonCloseNewelement = popupNewelement.querySelector('.popup__close-button');


// Находим поля в popup__form
let form = document.forms.popup__form;
let nameInput = form.elements.user_name;
let jobInput = form.elements.user_job;

// Находим элементы формы в в newelement
let newElementForm = document.forms.newelement__form;
let cardName = newElementForm.elements.card_name;
let cardUrl = newElementForm.elements.card_url;


// секция отображения карточек
const elements = document.querySelector('.elements');
// шаблон для создания карточек
const template = document.querySelector('.template');
// массив с начальными карточками
const initialCards = [
    {
        name: 'Хорватия',
        link: 'https://images.unsplash.com/photo-1596097155664-4f5c49ba1b69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    },
    {
        name: 'Испания',
        link: 'https://images.unsplash.com/photo-1641900833936-02cdb77d7068?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Голливуд',
        link: 'https://images.unsplash.com/photo-1641534425566-9e141d1b3b17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Индия',
        link: 'https://images.unsplash.com/photo-1630750967058-18c1707ee95a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Алтай',
        link: 'https://images.unsplash.com/photo-1641555130479-473595f33bd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80'
    },
    {
        name: 'Бали',
        link: 'https://images.unsplash.com/photo-1558347718-b45a32c31c03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
];

// Открываем PopUp
function openPopup() {
    popupEdit.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

// Открываем popupElement
function openNewelement() {
    popupElement.classList.add('popup_opened');
}

// Открываем popupImage
function openPopupImage(name, link) {
    imageUrl.src = link;
    imageUrl.alt = name;
    imageName.textContent = name;

    popupImage.classList.add('popup_opened');
}

// Закрываем PopUp
function closePopup() {
    popupEdit.classList.remove('popup_opened');
}

// Закрываем popupElement
function closePopupNewelement() {
    popupElement.classList.remove('popup_opened');
}

// Закрываем popupImage
function closePopupImage() {
    popupImage.classList.remove('popup_opened');
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        userName.textContent = nameInput.value;
        userJob.textContent = jobInput.value;
        closePopup();
    }

// Оброботчик отправки формы нового элемента
function formElementSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let newCard = {}
    newCard.name = cardName.value;
    newCard.link = cardUrl.value;

    addCard(newCard);
    closePopupNewelement();
}

// Прикрепляем обработчик :
formElement.addEventListener('submit', formSubmitHandler);
buttonClosePopup.addEventListener('click', closePopup);
buttonOpenPopup.addEventListener('click', openPopup);


// Открытия закрытия нового элемента
buttonCloseNewelement.addEventListener('click', closePopupNewelement);
buttonOpenNewelement.addEventListener('click', openNewelement);

// Закрытия popup Image
buttonCloseImage.addEventListener('click', closePopupImage);

// Обробочик отправки формы
newElementForm.addEventListener('submit', formElementSubmitHandler);

function addCard(card) {
    // создадим карточку
    const elementTemplate = template.content;
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

    // зададим поля карточки
    const cardPhoto = cardElement.querySelector('.element__photo');
    cardPhoto.alt = card.name;
    cardPhoto.src = card.link;
    cardElement.querySelector('.element__title').textContent = card.name;

    // Установим эвенты
    setEventCard(cardElement, card.name, card.link);
    // добавим карточку в массив
    elements.append(cardElement);
}

function setEventCard(card, name, link) {
    // лайк
    card.querySelector('.element__heart').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__heart_active');
    });

    // удалить карточку
    card.querySelector('.element__delete').addEventListener('click', () => {
        card.remove();
    });

    // открытие карточку
    card.querySelector('.element__photo').addEventListener('click', () => {
        openPopupImage(name,link);
    });
}

// Загрузим начальные карточки
initialCards.forEach((card) => {
    addCard(card);
})
