function initialize() {
  var input = document.getElementById('event_location');
  var autocomplete = new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);

autocomplete.addListener('place_changed', () => {
  let place = autocomplete.getPlace();
  console.log(place.geometry.location);
});
