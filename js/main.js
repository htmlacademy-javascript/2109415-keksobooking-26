import {confirmForm, setOnResetClick} from './formfilling.js';
import {turnOnDisableMode} from './mapmode.js';
import './avatar.js';
import './filters.js';
import  './map.js';
import { initMap, createAdPinMarkers, START_COORDINATE, setOnMainPinMove} from './map.js';
import { getData, sendData } from './load.js';
import { alertMapOn, alertSendindToServerOn, showSuccessSendindToServer } from './util.js';
import { setFiltersOn } from './filters.js';

turnOnDisableMode();
initMap(START_COORDINATE);
getData(createAdPinMarkers, alertMapOn);
confirmForm(async(data) => {
  await sendData(showSuccessSendindToServer, alertSendindToServerOn, data);
});
setFiltersOn();
setOnResetClick();
setOnMainPinMove();
