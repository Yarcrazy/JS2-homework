"use strict";

(function ($) {
  $(function () {
    $.ajax({
      'url': 'http://localhost:3000/fields',
      'dataType': 'json',
      success: function(items) {
        items = items.map(function(item) {
          var field = new Field(item.id, item.tag, item.type, item.textError);
          field.renderHeader();
          field.render();
          field.setAttr();
          return field;
        });
        $('#date').datepicker();
        $('#send').on('click', function () {
          var $dialog = $('#dialog');
          console.log(!$dialog.html());
          $dialog.empty();
          items.forEach(function(item) {
            if (item.isValidate(item.id)) {
              item.tag.setAttribute('style', 'border: green 3px solid');
            } else {
              item.tag.setAttribute('style', 'border: red 3px solid');
              $(item.tag).effect('bounce', 500);
              $dialog.append(item.getErrorP());
            }
          });
          if ($dialog.html()) {
            $dialog.dialog({
              modal: true,
              buttons: {
                'Ok': function() {
                  $(this).dialog( "close" );
                }
              }
            });
          }
        });
      }
    });
  });
})(jQuery);