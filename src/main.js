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
 }
const generateMap = function() {
  const locationIndex = Math.floor(Math.random() * 5);
  const place = {lat: coordinates[locationIndex][1], lng: coordinates[locationIndex][2]};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 2,
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
  return locationIndex;
  //map.setStreetView(panorama);
}
const toRadians = function(num){
  return num * (Math.PI / 180);
}
//distance calculation from:
//https://www.movable-type.co.uk/scripts/latlong.html
//calculateDistance(47.6088442, -122.3370567, 47.6278669, -122.339465)
const calculateDistance = function(x1, y1, x2, y2){
  let radius = 6371e3; //in meters
  // console.log(x1, y1, x2, y2);
  let lat1 = toRadians(x1);
  let lng1 = toRadians(y1);
  let lat2 = toRadians(x2);
  let lng2 = toRadians(y2);
  let deltaLat = toRadians((x2 - x1));
  let deltaLng = toRadians((y2 - y1));

  let a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
          Math.cos(lat1) * Math.cos(lat2) *
          Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  let distance = radius * c;

  return distance;
}
$(document).ready(function(){
  let placeIndex = generateMap();
  $("#guessbutton").click(function(event){
    event.preventDefault();
    let markerCoords = marker.getPosition().toString();
    let markerX = marker.getPosition().lat();
    let markerY = marker.getPosition().lng();
    console.log(calculateDistance(coordinates[placeIndex][1], coordinates[placeIndex][2], markerX, markerY));
    $(".modal").modal("show");
  });
  $("#modal-close").click(function(event){
    event.preventDefault();
    $(".modal").modal("hide");
  });
});
