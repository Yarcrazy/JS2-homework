"use strict";

// function Comments(id) {
//   this.id = id;
// }
//
// Comments.prototype.renderNew = function(text) {
//   var $ul = $('#comments');
//   var $li = $('<li />', {
//     text: text + '',
//     id: this.id
//   });
//   console.log($li);
//   var $btnApprove = $('<button />', {
//     text: 'approve',
//     class: 'btnApp'
//   });
//   var $btnDecline = $('<button />', {
//     text: 'decline',
//     class: 'btnApp'
//   });
//   $li.append($btnApprove, $btnDecline);
//   $ul.append($li);
//   $ul.data('last-id', this.id);
// };

function buildComments() {
  var $ul = $('#comments');
  // Очищаем комментарии
  $ul.empty();
  // Отправляем запрос на получение списка комментариев
  $.ajax({
    url: 'http://localhost:3000/comments',
    dataType: 'json',
    success: function(comments) {
      // Перебираем комментарии
      comments.forEach(function(item) {
        // Создаем комментарий в списке
        var $li = $('<li />', {
          text: item.text
        });

        // Создаем кнопки одобрить и отклонить
        var $btnApprove = $('<button />', {
          text: 'approve',
          'data-id': item.id
        });
        var $btnDecline = $('<button />', {
          text: 'decline',
          'data-id': item.id
        });

        // Добавляем все в dom
        $li.append($btnApprove);
        $li.append($btnDecline);
        $ul.append($li);
      });
      $ul.attr('data-last-id', comments.length);
    }
  })
}

(function($) {
  $(function() {
    buildComments();
    // При нажатии на кнопку отправить добавляем комментарий в json и отрисовываем
    $('#send').on('click', function() {
      var nextComm = +$('#comments').attr('data-last-id') + 1;
      var text = $('#textarea').val();
      $.ajax({
        url: 'http://localhost:3000/comments/',
        type: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          id: nextComm,
          text: text
        }),
        success: function() {
          buildComments();
        }
      });
    });

    $('#clear').on('click', function() {
      $.ajax({
        url: 'http://localhost:3000/comments',
        type: 'DELETE',
        success: function() {
          buildComments();
        }
      })
    })
  })
})(jQuery);
