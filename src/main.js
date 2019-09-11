const coordinates = [
  ["epicodus", 47.6088442, -122.3370567],
  ["international District", 47.5993455, -122.3303012],
  ["westlake", 47.6278669, -122.339465],
  ["uw", 47.6569384, -122.3048254],
  ["space needle", 47.6186148,  -122.3554563]
];
var marker = null;

const addMarker = function(location, map) {
 // Add the marker at the clicked location, and add the next-available label
 // from the array of alphabetical characters.
   if(marker){
     console.log(true);
     marker.setVisible(false);
   }
     marker = new google.maps.Marker({
     position: location,
     label: "Your Guess",
     map: map
   });
   console.log(marker.getPosition().toString());
 }
const generateMap = function() {
  const locationIndex = Math.floor(Math.random() * 5);
  const place = {lat: coordinates[locationIndex][1], lng: coordinates[locationIndex][2]};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 1,
    streetViewControl: false
  });
  google.maps.event.addListener(map, 'click', function(event) {
   addMarker(event.latLng, map);
 });

  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: place,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  //map.setStreetView(panorama);
}
//distance calculation from:
//https://www.movable-type.co.uk/scripts/latlong.html
//calculateDistance(47.6088442, -122.3370567, 47.6278669, -122.339465)
const calculateDistance = function(x1, y1, x2, y2){
  let radius = 6371e3; //in meters
  let lat1 = x1.toRadians();
  let lng1 = y1.toRadians();
  let lat2 = x2.toRadians();
  let lng2 = y2.toRadians();
  let deltaLat = (x2 - x1).toRadians();
  let deltaLng = (y2 - y1).toRadians();

  let a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
          Math.cos(lat1) * Math.cos(lat2) *
          Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  let distance = radius * c;

  return distance;
}
$(document).ready(function(){
  console.log(true);
  generateMap();
  $("#guessbutton").click(function(event){
    event.preventDefault();
    $(".modal").modal("show");
  });
  $("#modal-close").click(function(event){
    event.preventDefault();
    $(".modal").modal("hide");
  });
});
