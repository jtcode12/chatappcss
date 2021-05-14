'use strict';

class Message {
  constructor (content, authorid, timestamp) {
    this.content = content;
    this.authorid = authorid;
    this.timestamp = timestamp;
  }
}

function genRandomMs () {
  // Returns a random number between 0 and 10 seconds, in milliseconds
  return Math.floor(Math.random() * 1e4);
}

function prettifyDate (timestamp) {
  // Returns the date in hh:mm am/pm format
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(timestamp).toLocaleTimeString('en-US', options);
}

function showMessage (msg) {
  const { content, authorid, timestamp } = msg;
  const $HtmlMsg = $(`
    <div class="message ${authorid === 'Big Bird' ? 'right' : 'left'}">
      <div class="message-text">${content}</div>
      <div class="message-time">${prettifyDate(Number(timestamp))} ${authorid}</div>
    </div>
  `);
  $('.messages-container').append($HtmlMsg);
}

function simulateIncomingMessages () {
  setTimeout(() => {

    $.get('https://cw-quotes.herokuapp.com/api/quotes/random', data => {

      const msg = new Message(data.result.text, 'Hoot Hoot the wise owl', Date.now());

      $.ajax({
        url: 'http://localhost:3000/message',
        type: 'POST',
        data: JSON.stringify(msg),
        contentType: 'application/json',
      });

      showMessage(msg);
      scrollToBottom ();

    });
  }, genRandomMs());
}

function scrollToBottom () {
  const $messages = $('.messages-container');
  $messages.animate({
    scrollTop: $messages[0].scrollHeight
  });
}

/******************************************************/



$(() => {

  $.get('http://localhost:3000/message', (data) => {
    //console.log(data);
    data.forEach(showMessage);
  });


  $('#msg-form').on('submit',(e) => {

    e.preventDefault();
    const content = $('#text').val();
    if (content) {

      $('#text').val('');
      const msg = new Message(content, 'Big Bird', Date.now());
      $.ajax({
        url: 'http://localhost:3000/message',
        type: 'POST',
        data: JSON.stringify(msg),
        contentType: 'application/json',
      });

      showMessage(msg);
      scrollToBottom ();
      simulateIncomingMessages();
    }
  });
});
