let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 2
  });

  const infoWindow = new google.maps.InfoWindow();

  map.addListener('click', (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.setContent(`Latitude: ${event.latLng.lat()}, Longitude: ${event.latLng.lng()}`);
    infoWindow.open(map);
  });
}

function placeMarker() {
  const markerName = document.getElementById('markerName').value;
  const markerLatitude = parseFloat(document.getElementById('markerLatitude').value);
  const markerLongitude = parseFloat(document.getElementById('markerLongitude').value);
  const marker = new google.maps.Marker({
    position: { lat: markerLatitude, lng: markerLongitude },
    map: map,
    title: markerName
  });
}

function getDirections() {
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);

  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    },
    function(response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }
  );
}

function placeCircle() {
  const circleLatitude = parseFloat(document.getElementById('circleLatitude').value);
  const circleLongitude = parseFloat(document.getElementById('circleLongitude').value);
  const circleRadius = parseFloat(document.getElementById('circleRadius').value);
  const circle = new google.maps.Circle({
    center: { lat: circleLatitude, lng: circleLongitude },
    map: map,
    radius: circleRadius
  });
}

function placeRectangle() {
  const rectangleLatitude = parseFloat(document.getElementById('rectangleLatitude').value);
  const rectangleLongitude = parseFloat(document.getElementById('rectangleLongitude').value);
  const rectangleWidth = parseFloat(document.getElementById('rectangleWidth').value);
  const rectangleHeight = parseFloat(document.getElementById('rectangleHeight').value);
  const rectangle = new google.maps.Rectangle({
    bounds: {
      north: rectangleLatitude + rectangleHeight / 2,
      south: rectangleLatitude - rectangleHeight / 2,
      east: rectangleLongitude + rectangleWidth / 2,
      west: rectangleLongitude - rectangleWidth / 2
    },
    map: map
  });
}

function placePolygon() {
  const coordinates = document.getElementById('polygonCoordinates').value.split(' ');
  const path = [];

  for (let i = 0; i < coordinates.length; i++) {
    const latLng = coordinates[i].split(',');
    path.push({ lat: parseFloat(latLng[0]), lng: parseFloat(latLng[1]) });
  }

  const polygon = new google.maps.Polygon({
    paths: path,
    map: map
  });
}

function placePolyline() {
  const coordinates = document.getElementById('polylineCoordinates').value.split(' ');
  const path = [];

  for (let i = 0; i < coordinates.length; i++) {
    const latLng = coordinates[i].split(',');
    path.push({ lat: parseFloat(latLng[0]), lng: parseFloat(latLng[1]) });
  }

  const polyline = new google.maps.Polyline({
    path: path,
    map: map
  });
}
