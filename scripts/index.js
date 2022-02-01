// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const userName = document.querySelector('.profile__user-name');
const userJob = document.querySelector('.profile__user-job');

// кнопки открытия попапов
const buttonOpenPopup = document.querySelector('.profile__edit-profile');
const buttonOpenNewelement = document.querySelector('.profile__add-button');

// Находим  PopoupEdit
const popupEdit = document.querySelector('.popup_type_edit');
const popupElement = document.querySelector('.popup_type_element');

// Находим кнопки в popup__container
const popupContainer = document.querySelector('.popup__container');
const buttonClosePopup = popupContainer.querySelector('.popup__close-button');

// Находим элементы в popup_type_image
const popupImage = document.querySelector('.popup_type_image');
const imageUrl = popupImage.querySelector('.popup__image-url');
const imageName = popupImage.querySelector('.popup__image-name');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');

// Находим кнопки в popup__newelement
const popupNewelement = document.querySelector('.popup__newelement');
const buttonCloseNewelement = popupNewelement.querySelector('.popup__close-button');


// Находим поля в popup__form
const form = document.forms.popup__form;
const nameInput = form.elements.user_name;
const jobInput = form.elements.user_job;

// Находим элементы формы в в newelement
const newElementForm = document.forms.newelement__form;
const cardName = newElementForm.elements.card_name;
const cardUrl = newElementForm.elements.card_url;


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
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// handler PopupEdit
function handlerPopupEdit() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    openPopup(popupEdit);
}

// handler popupImage
function handlerPopupImage(name, link) {
    imageUrl.src = link;
    imageUrl.alt = name;
    imageName.textContent = name;
    openPopup(popupImage);
}

// Закрываем PopUp
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        userName.textContent = nameInput.value;
        userJob.textContent = jobInput.value;
        closePopup(popupEdit);
    }

// Оброботчик отправки формы нового элемента
function formElementSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let newCard = {}
    newCard.name = cardName.value;
    newCard.link = cardUrl.value;

    newElementForm.reset();
    elements.prepend(createCard(newCard));
    closePopup(popupElement);
}

function createCard(card) {
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
    // elements.prepend(cardElement);
    return cardElement
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
        handlerPopupImage(name,link);
    });
}

// Прикрепляем обработчик :
formElement.addEventListener('submit', formSubmitHandler);
buttonClosePopup.addEventListener('click', () => closePopup(popupEdit));
buttonOpenPopup.addEventListener('click', handlerPopupEdit);

// Открытия закрытия нового элемента
buttonCloseNewelement.addEventListener('click', () => closePopup(popupElement));
buttonOpenNewelement.addEventListener('click', () => openPopup(popupElement));

// Закрытия popup Image
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));

// Обробочик отправки формы
newElementForm.addEventListener('submit', formElementSubmitHandler);

// Загрузим начальные карточки
initialCards.forEach((card) => {
    elements.prepend(createCard(card));
})