"use strict";

window.onload = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/fields');
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var items = JSON.parse(xhr.responseText);
      items = items.map(function(item) {
        var field = new Field(item.id, item.tag, item.type, item.textError);
        field.renderHeader();
        field.render();
        field.setAttr();
        return field;
      });
      document.getElementById('Send').addEventListener('click', function() {
        items.forEach(function(item) {
          if (item.isValidate(item.id)) {
            item.tag.setAttribute('style', 'border: green 3px solid');
          } else {
            item.tag.setAttribute('style', 'border: red 3px solid');
            item.renderError();
          }
        });
      });
    }
  };
};