$(() => {

  function stateProvider() {
    this.el = $('.ui-view');

    this.states = {
      home: {
        template: `<h1>Home<h1>`
      },
      about: {
        template: `<h1>About</h1>`
      }
    };

    this.render('home');

    // Setting up some events for anything with a class
    // of .ui-sref. Expects a data-state property to assign
    // the state
    $('.ui-sref').on('click', (e) => {
      e.preventDefault();
      const state = $(e.target).data('state');
      if (!this.states[state]) {
        return alert('No state setup');
      } else {
        this.render(state);
      }
    });
  }

  stateProvider.prototype.render = function(state){
    $(this.el).html(this.states[state].template);
  };

  // Constructor function
  new stateProvider();
});
