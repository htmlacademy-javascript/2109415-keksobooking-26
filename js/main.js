import {confirmForm, setOnResetClick} from './formfilling.js';
import './mapmode.js';
import './map.js';
import { initMap, createAdPinMarkers, START_COORDINATE } from './map.js';
import { getData, sendData } from './load.js';
import { alertMapOn, alertSendindToServerOn, showSuccessSendindToServer } from './util.js';
initMap(START_COORDINATE);
getData(createAdPinMarkers, alertMapOn);
confirmForm(async(data) => {
  await sendData(showSuccessSendindToServer, alertSendindToServerOn, data);
});

setOnResetClick();
