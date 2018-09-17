"use strict";

function builtCities() {
  var $select = $('<select />');
  $.ajax({
    "url": "http://localhost:3000/cities",
    "dataType": "json",
    success: function() {

    }
});
}