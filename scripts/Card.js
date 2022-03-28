export default class Card {
    constructor(data, templateCard, cardSelector,handlerPopupImage){
        this._image = data.link;
        this._name = data.name;
        this._cardElement = document.querySelector(cardSelector); // шаблон для создания карточек
        this._cardImage = templateCard.itemImage;
        this._cardTitle = templateCard.itemTitle;
        this._cardLike = templateCard.likeBtn;
        this._cardDelete = templateCard.deleteBtn;
        this._handlerPopupImage = handlerPopupImage;
    }

    _getTemplate() {
        const cardElement = this._cardElement.content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._likeCardHandler();
        });
        this._card.querySelector(this._cardDelete).addEventListener('click', () => this._deleteCardHandler());
        this._card.querySelector(this._cardImage).addEventListener("click", () => { this._handlerPopupImage(this._name,this._image) });
    }

    _likeCardHandler(){
         this._likeButton.classList.toggle('element__heart_active');
    }
    _deleteCardHandler() {
        this._card.remove();
        this._card = null;
    }
    createCard() {
        // создадим карточку
        this._card = this._getTemplate();
        // Кнопка Лайка
        this._likeButton = this._card.querySelector(this._cardLike);
        // Установим эвенты
        this._setEventListeners();

        // зададим поля карточки
        this._card.querySelector(this._cardImage).alt = this._name;
        this._card.querySelector(this._cardImage).src = this._image;
        this._card.querySelector(this._cardTitle).textContent = this._name;
        return this._card;
    }
}
