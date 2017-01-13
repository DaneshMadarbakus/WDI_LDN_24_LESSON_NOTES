$(init);

function init(){
  const $main = $('main');

  $.get('http://localhost:3000/api/places').done(data => {
    data.forEach(place => {
      $.get(`http://localhost:3000/api/places/${place.name}`).done(data => {
        $main.append(`
          <div class="row">
            <div class="columns three">
              ${place.name}
            </div>
            <div class="columns nine">
              ${place.nickname} is ${data.temperature} degrees with ${data.skytext}
            </div>
          </div>
          `);
      });
    });
  });
}
