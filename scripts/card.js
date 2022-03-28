import { handlerPopupImage } from "./index.js";

export default class Card {
    constructor(data, templateCard, cardSelector){
        this._image = data.link;
        this._name = data.name;
        this._cardSelector = document.querySelector(cardSelector); // шаблон для создания карточек
        this._cardImage = templateCard.itemImage;
        this._cardTitle = templateCard.itemTitle;
        this._cardLike = templateCard.likeBtn;
        this._cardDelete = templateCard.deleteBtn;
    }

    _getTemplate() {
        const cardElement = this._cardSelector.content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._card.querySelector(this._cardLike).addEventListener('click', () => this._likeCardHandler());
        this._card.querySelector(this._cardDelete).addEventListener('click', () => this._deleteCardHandler());
        this._card.querySelector(this._cardImage).addEventListener("click", () => { handlerPopupImage(this._name,this._image) });
    }

    _likeCardHandler(){
        this._card.querySelector(this._cardLike).classList.toggle('element__heart_active');

    }
    _deleteCardHandler() {
        this._card.remove();
    }
    createCard() {
        // создадим карточку
        this._card = this._getTemplate();

        // Установим эвенты
        this._setEventListeners();

        // зададим поля карточки
        this._card.querySelector(this._cardImage).alt = this._name;
        this._card.querySelector(this._cardImage).src = this._image;
        this._card.querySelector(this._cardTitle).textContent = this._name;
        return this._card;
    }
}