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

var gradient = {1: '#e50023', 1.5: '#dd2b00', 2: '#d57500', 2.5: '#ceb900',
  less3: '#94c600', perfect3: '#4bbf00' };

 $.getJSON("data.JSON", function(routeData) {
   var colour;
    for (i = 1; i < 4; i++) {
      if (parseFloat(routeData[i][6]) == 1) {
        colour = gradient['1'];
      } else if (parseFloat(routeData[i][6]) < 1 && parseFloat(routeData[i][6]) <= 1.5) {
        colour = gradient['1.5'];
      } else if (parseFloat(routeData[i][6]) < 1.5 && parseFloat(routeData[i][6]) <= 2) {
        colour = gradient['2'];
      } else if (parseFloat(routeData[i][6]) < 2 && parseFloat(routeData[i][6]) <= 2.5) {
        colour = gradient['2.5'];
      } else if (parseFloat(routeData[i][6]) < 2.5 && parseFloat(routeData[i][6]) < 3) {
        colour = gradient['less3'];
      } else if (parseFloat(routeData[i][6]) == 3) {
        colour = gradient['perfect3'];
      }
      console.log(routeData[i][1] + ": " + colour + " rating: " + routeData);
      var path = [
        {lat: parseFloat(routeData[i][7]), lng: parseFloat(routeData[i][8])},
        {lat: parseFloat(routeData[i][9]), lng: parseFloat(routeData[i][10])},
        {lat: parseFloat(routeData[i][11]), lng: parseFloat(routeData[i][12])},
      ];
      var line = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: colour,
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      line.setMap(map);
    }
 });


}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
