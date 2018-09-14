"use strict";

function Comments(id) {
  this.id = id;
}

Comments.prototype.renderNew = function(text) {
  var $ul = $('#comments');
  var $li = $('<li />', {
    text: text + '',
    id: this.id,
  });
  var $btnApprove = $('<button />', {
    text: 'approve',
    class: 'btnApp',
  });
  var $btnDecline = $('<button />', {
    text: 'decline',
    class: 'btnApp',
  });
  $li.append($btnApprove, $btnDecline);
  $ul.append($li);
  $ul.data('last-id', this.id);
};

(function($) {
  $(function() {
    // При нажатии на кнопку отправить добавляем комментарий в json и отрисовываем
    $('#send').on('click', function() {
      var currentComm = +$('#comments').data('last-id') + 1;
      var text = $('#textarea').text();
      $.ajax({
        url: 'http://localhost:3000/comments/',
        type: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          id: currentComm,
          text: text,
        }),
      });
      var comment = new Comments(currentComm);
      comment.renderNew(text);
      console.log($('#textarea').text());
    });
  })
})(jQuery);
