import { turnOnDisableMode } from './mapmode.js';
import { tournOffDisableMode } from './mapmode.js';
import {createCardElement} from './card.js';
import { filterOutOffers } from './filters.js';
const START_COORDINATE = {lat: 35.6895, lng: 139.692,};
turnOnDisableMode();
const map = L.map('map-canvas').on('load', tournOffDisableMode);
const markerGroup = L.layerGroup().addTo(map);
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {START_COORDINATE},
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

function initMap (coordinate) {
  map.setView(coordinate, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);
  mainPinMarker.setLatLng(coordinate).addTo(map);
}

function createAdPinMarkers (offers) {
  // debugger;
  markerGroup.clearLayers();
  offers = filterOutOffers(offers);
  offers.forEach((offer) => {
    const marker = L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon: adPinIcon,
    }
    );
    marker.addTo(markerGroup).bindPopup(createCardElement(offer));
  });
}
function setOnMap (cb) {
  map.on('load', cb);
}

function setOnMainPinMove (cb) {
  mainPinMarker.on('move', (evt) =>cb(evt.target.getLating()));

}

export {initMap, setOnMap, createAdPinMarkers, setOnMainPinMove, START_COORDINATE};
