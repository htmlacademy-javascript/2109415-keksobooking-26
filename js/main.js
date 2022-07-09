// import './card.js';
import './formfilling.js';
import './mapmode.js';
import './map.js';
import { initMap, createAdPinMarkers } from './map.js';
import {createArrayOfObjects} from './data.js';
initMap({lat: 35.6895, lng: 139.692,});
createAdPinMarkers(createArrayOfObjects(10));

// // console.log(createArrayOfObjects(10));
