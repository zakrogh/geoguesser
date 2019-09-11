const coordinates = [
  ["epicodus", 47.6088442, -122.3370567],
  ["international District", 47.5993455, -122.3303012],
  ["westlake", 47.6278669, -122.339465],
  ["uw", 47.6569384, -122.3048254],
  ["space needle", 47.6186148,  -122.3554563]
];
var marker = null;

function addMarker(location, map) {
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
function generateMaps() {
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
