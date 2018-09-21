"use strict";

function hello() {
  console.log('Hello', getName());
}
hello();
function getName() {
  return prompt('Как Вас зовут?');
}