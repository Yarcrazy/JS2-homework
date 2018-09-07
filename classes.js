"use strict";

function Field(id, tag, type, textError) {
  this.id = id;
  this.tag = document.createElement(tag);
  this.type = type;
  this.textError = textError;
  this.parent = document.getElementById('form');
  this.div = document.createElement('div');
}

Field.prototype.render = function() {
  this.parent.appendChild(this.div).appendChild(this.tag);
};

Field.prototype.renderHeader = function() {
  var header = document.createElement('h5');
  header.textContent = this.id;
  this.parent.appendChild(header);
};

Field.prototype.renderError = function() {
  var errorField = document.createElement('p');
  errorField.textContent = this.textError;
  this.div.appendChild(errorField);
};

Field.prototype.setAttr = function() {
  this.tag.setAttribute('type', this.type);
  this.tag.setAttribute('id', this.id);
};

Field.prototype.isValidate = function(id) {
  var regExp = /.*/;
  switch (id) {
    case 'Name':
      regExp = /[a-zA-Z]/;
      break;
    case 'Phone':
      regExp = /\+7\(\d{3}\)\d{3}-\d{4}/;
      break;
    case 'Email':
      regExp = /[\.-]?[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
      break;
  }
  return regExp.test(document.getElementById(id).value);
};

