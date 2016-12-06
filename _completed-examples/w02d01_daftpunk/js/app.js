window.onload = function() {
  var buttons = document.getElementsByTagName('a');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      var fileName = this.id;
      new Audio('../sounds/' + fileName + '.wav').play();
    });
  }
};
