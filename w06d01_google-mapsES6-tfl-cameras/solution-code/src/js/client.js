const googleMap = googleMap || {};
const google = google;

googleMap.addInfoWindowForCamera = function(camera, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: `<img src="http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/${ camera.file }"><p>${ camera.location }</p>`
    });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(15);
  });
};

googleMap.createMarkerForCamera = function(camera) {
  const latlng = new google.maps.LatLng(camera.lat, camera.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: '/images/marker.png',
    animation: google.maps.Animation.DROP
  });

  this.addInfoWindowForCamera(camera, marker);
};

googleMap.loopThroughCameras = function(data) {
  $.each(data.cameras, (index, camera) => {
    setTimeout(() => {
      googleMap.createMarkerForCamera(camera);
    }, index * 50);
  });
};

googleMap.getCameras = function() {
  $.get('http://localhost:3000/cameras').done(this.loopThroughCameras);
};

googleMap.mapSetup = function() {
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.getCameras();
};

$(googleMap.mapSetup.bind(googleMap));
