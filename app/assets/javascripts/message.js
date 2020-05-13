$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main-chat__message-data">
          <div class="main-chat__message-data__upper-info">
            <div class="main-chat__message-data__upper-info-talker">
              ${message.user_name}
            </div>
            <div class="main-chat__message-data__upper-info-data">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__message-text">
            <p class="main-chat__message-text">
              ${message.content}
            </p>
          </div>
          <div class="main-chat__message-text">
            <img src="${message.image}">
          </div>`
        return html;
    } else {
      var html =
        `<div class="main-chat__message-data">
          <div class="main-chat__message-data__upper-info">
            <div class="main-chat__message-data__upper-info-talker">
              ${message.user_name}
            </div>
            <div class="main-chat__message-data__upper-info-data">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__message-text">
            <p class="main-chat__message-text">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.main-chat__message-list').append(html);
      $('form')[0].reset();
    })
    .always(function(){
      $(".new-message__input-box__submit").prop("disabled", false);
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});
