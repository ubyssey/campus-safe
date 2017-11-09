// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var map, heatmap, infoWindow;
 var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 49.263068, lng: -123.244414},
    mapTypeId: 'satellite'
  });
  var userMarker = new google.maps.Marker({
          position: {lat: -25.363, lng: 131.044},
          map: map,
          icon: im
  });
  //Make
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      userMarker.setPosition(pos);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, userMarker, map.getCenter());
    });
  } else {
    handleLocationError(false, userMarker, map.getCenter());
  }

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map,
    radius: 10,
    opacity: 1.5,
    dissipating: true, 
  });
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

// Heatmap data: 500 Points
function getPoints() {

  //MAIN MALL
  var locations = new Array(101);
  var startLat = 49.259566;
  var startLon = -123.248518;
  var endLat = 49.268877;
  var endLon =  -123.256107;
  var incLat = Math.abs((startLat - endLat) / 100);
  console.log(incLat);
  var incLon = Math.abs((startLon - endLon) / 100);
  console.log(incLon);
  for (var i = 0; i < 100; i++) {
    locations[i] = {location: new google.maps.LatLng(startLat+=incLat, startLon-=incLon), weight: .3};
  }

  //Wreck Beach
  //var locations = new Array(100);
  locations[101] = {location: new google.maps.LatLng(49.262518, -123.261965), weight: 3};
  return locations;
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
