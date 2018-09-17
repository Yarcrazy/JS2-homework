"use strict";

(function($) {
  $(function() {
    $('#head').on('click', 'li', function() {
      var id = $(this).attr('data-id');
      $('#head .list.active, .content.active').removeClass('active');
      $(this).addClass('active');
      $('#' + id).addClass('active');
    });
  })
})(jQuery);