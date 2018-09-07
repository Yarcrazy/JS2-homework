"use strict";

window.onload = function() {
  //используем ajax запросы для тренировки
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/text');
  xhr.send();

  //при изменении состояния запроса
  xhr.onreadystatechange = function () {
    //если запрос в состоянии выполнено, то выполняем
    if (xhr.readyState === XMLHttpRequest.DONE) {
      //первичный текст получаем из db.json
      var item = JSON.parse(xhr.responseText);
      //создаем первое текстовое поле, отрисовываем и добавляем первичный текст
      var block = new LargeText('1', 'textarea', item.text);
      block.render();
      block.addText();

      //создаем кнопку "Transform" и добавляем ее в форму
      var button = document.createElement('button');
      button.textContent = 'Transform';
      var form = document.getElementById('form');
      form.appendChild(button);

      //создаем второе текстовое поле для результата преобразования текста и отрисовываем его
      var formatText = new LargeText('2', 'textarea', item.text);
      formatText.render();

      //при нажатии на кнопку выполняем
      button.addEventListener('click', function () {
        //берем текст из первого поля, трансформируем и добавляем во второе поле
        block.text = block.tag.value;
        formatText.text = block.format();
        formatText.addText();
      });
    }
  };
};