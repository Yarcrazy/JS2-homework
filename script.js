"use strict";

function builtCities() {
  $.ajax({
    "url": "http://localhost:3000/cities",
    "dataType": "json",
    success: function(cities) {
      var $select = $('<select />', {
        id: 'cities'
      });
      cities.forEach(function(city) {
        var $option = $('<option />', {
          text: city.name
        });
        $select.append($option);
      });
      $('#cityLabel').append($select);
    }
});
}

(function($) {
  $(function() {
    builtCities();
  })
})(jQuery);