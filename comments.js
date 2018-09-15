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
          text: item.text,
          class: item.status
        });

        // Создаем кнопки одобрить и отклонить, если у комментария статус отсутствует (undefined)
        if (item.status === undefined) {
          var $btnApprove = $('<button />', {
            text: 'approve', 'data-id': item.id, class: 'grade'
          });
          var $btnDecline = $('<button />', {
            text: 'decline', 'data-id': item.id, class: 'grade'
          });

          // Добавляем кнопки в li
          $li.append($btnApprove);
          $li.append($btnDecline);
        }

        // Создаем и добавляем кнопку очистить к каждому комментарию
        var $btnClear = $('<button />', {
          text: 'clear', 'data-id': item.id, class: 'clear'
        });
        $li.append($btnClear);

        // Добавляем li к ul
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

    // При нажатии на Clear удаляем комментарий из json
    $('#comments').on('click', '.clear', function() {
      var id = $(this).attr('data-id');
      $.ajax({
        url: 'http://localhost:3000/comments/' + id,
        type: 'DELETE',
        success: function() {
          buildComments();
        }
      })
    });

    // При нажатии на кнопку оценки добавляем в json статус одобрено или отклонено и отрисовываем комментарии
    $('#comments').on('click', '.grade', function() {
      var id = $(this).attr('data-id');
      var grade = $(this).text();
      $.ajax({
        url: 'http://localhost:3000/comments/' + id,
        type: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          status: grade
        }),
        success: function() {
          buildComments();
        }
      })
    });
  })
})(jQuery);
