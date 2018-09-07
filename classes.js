"use strict";

/**
 * Класс текстовых полей
 * @param {string} id идентификатор
 * @param {string} tag тег для создания DOM элемента
 * @param {string} text текст поля
 * @constructor
 */
function LargeText(id, tag, text) {
  this.id = id;
  this.tag = document.createElement(tag);
  this.text = text;
}

/**
 * Метод отрисовывает объект поля в форму
 */
LargeText.prototype.render = function() {
  var form = document.getElementById('form');
  form.appendChild(this.tag);
};

/**
 * Метод добавляет текст в текстовое поле
 */
LargeText.prototype.addText = function() {
  this.tag.textContent = this.text;
};

/**
 * Метод форматирует текст согласно некоторого правила
 * @returns {string} возвращает измененный текст
 */
LargeText.prototype.format = function() {
  //сначала меняем все ' на ", потом " не окруженные словесными символами меняем обратно
  return this.text.replace(/\b"\b/g, '\'').replace(/'/g, '\"');
};