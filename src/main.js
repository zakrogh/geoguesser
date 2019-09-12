import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const coordinates = [
  ["epicodus", 47.6088442, -122.3370567],
  ["international District", 47.5993455, -122.3303012],
  ["westlake", 47.6278669, -122.339465],
  ["uw", 47.6569384, -122.3048254],
  ["space needle", 47.6186148,  -122.3554563]
];
var marker = null;

const addMarker = function(location, map, label) {
    marker = new google.maps.Marker({
    position: location,
    label: {text: label, color: "black"},
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
   });
 }
const generateMap = function() {
  const locationIndex = Math.floor(Math.random() * 5);
  const place = {lat: coordinates[locationIndex][1], lng: coordinates[locationIndex][2]};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6, lng: -122.35},
    zoom: 11,
    streetViewControl: false
  });
  google.maps.event.addListener(map, 'click', function(event) {
    if(marker){
      marker.setVisible(false);
    }
   addMarker(event.latLng, map, "Your Guess");
 });

  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: place,
        pov: {
          heading: 34,
          pitch: 10
        },
        addressControl: false,
        showRoadLabels: false
      });
  return locationIndex;

}
const toRadians = function(num){
  return num * (Math.PI / 180);
}
//distance calculation from:
//https://www.movable-type.co.uk/scripts/latlong.html
const calculateDistance = function(x1, y1, x2, y2){
  let radius = 6371e3; //in meters
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
const calculateZoom = function(distance){
  let zoom = 0;
  if(distance < 300){
    zoom = 17;
  }else if(distance < 1000){
    zoom = 15;
  }else if (distance < 5000) {
    zoom = 13;
  }else if(distance < 15000){
    zoom = 10;
  }else{
    zoom = 5;
  }
  return zoom;
}

const resultMap = function(placeIndex, markerX, markerY, distance) {
  let zoom = calculateZoom(distance);
  const place = {lat: (coordinates[placeIndex][1] + markerX) / 2, lng: (coordinates[placeIndex][2] + markerY) / 2};
  var map = new google.maps.Map(document.getElementById('map-result'), {
    center: place,
    zoom: zoom,
    streetViewControl: false
  });
  let distancePathCoords = [
    {lat: coordinates[placeIndex][1], lng: coordinates[placeIndex][2]},
    {lat: markerX, lng: markerY}
  ];
  var distancePath = new google.maps.Polyline({
    path: distancePathCoords,
    geodesic: true,
    strokeColor: '#000',
    strokeWeight: 2
  });
  addMarker({lat: markerX, lng: markerY}, map, "Your Guess");
  addMarker({lat: coordinates[placeIndex][1], lng: coordinates[placeIndex][2]}, map, "Place");
  distancePath.setMap(map);
};
const calculateScore = function(distance){
  return Math.floor(20000000 / distance);
}

$(document).ready(function(){
  let placeIndex = generateMap();
  $("#guessbutton").click(function(event){
    event.preventDefault();
    let markerCoords = marker.getPosition().toString();
    let markerX = marker.getPosition().lat();
    let markerY = marker.getPosition().lng();
    const distance = calculateDistance(coordinates[placeIndex][1], coordinates[placeIndex][2], markerX, markerY).toFixed(2);
    $(".map-area").hide();
    $("#guessbutton").hide();
    $("#distance").text(distance);
    $("#score").text(calculateScore(distance));
    resultMap(placeIndex, markerX, markerY, distance);
    $(".modal").modal("show");
  });
  $(".modal").on("hidden.bs.modal", function(){
    location.reload();
  });
  $("#modal-close").click(function(event){
    event.preventDefault();
    $(".modal").modal("hide");
  });
});
