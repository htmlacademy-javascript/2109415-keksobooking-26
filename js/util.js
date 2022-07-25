import { putMainPinToStart } from './map.js';

const ALERT_SHOW_TIME = 3000;

function alertMapOn(message) {
  const mapElement = document.querySelector('.map');
  const alarmElement = document.createElement('div');
  alarmElement.textContent = message;
  alarmElement.classList.add('map__alarm');
  mapElement.append(alarmElement);
  setTimeout(() => {
    alarmElement.remove();
  }, ALERT_SHOW_TIME);
}

function clearForm() {
  const formElement = document.querySelector('.ad-form');
  formElement.querySelector('#title').value = '';
  formElement.querySelector('#address').value = '';
  formElement.querySelector('#type').value = 'flat';
  formElement.querySelector('#price').value = '50000.00';
  formElement.querySelector('#timein').value = '12:00';
  formElement.querySelector('#timeout').value = '12:00';
  formElement.querySelector('#room_number').value = '1';
  formElement.querySelector('#capacity').value = '1';
  for (const child of formElement.querySelector('.features').children){
    child.checked = false;
  }
  formElement.querySelector('#description').value = '';
  if(formElement.querySelector('.ad-form__photo--pic')){
    formElement.querySelector('.ad-form__photo--pic').remove();}
}

function clearFilters(){
  const filterForm = document.querySelector('.map__filters');
  filterForm.querySelector('#housing-type').value = 'any';
  filterForm.querySelector('#housing-price').value = 'any';
  filterForm.querySelector('#housing-rooms').value = 'any';
  filterForm.querySelector('#housing-guests').value = 'any';
  filterForm.querySelector('#filter-wifi').checked = false;
  filterForm.querySelector('#filter-dishwasher').checked = false;
  filterForm.querySelector('#filter-parking').checked = false;
  filterForm.querySelector('#filter-washer').checked = false;
  filterForm.querySelector('#filter-elevator').checked = false;
  filterForm.querySelector('#filter-conditioner').checked = false;
}

function clearMap(){
  if(document.querySelector('.leaflet-popup-content')){
    document.querySelector('.leaflet-popup-content').remove();
  }
  putMainPinToStart();
}

function alertSendindToServerOn() {
  const errorMessageTemplateElement = document.querySelector('#error');
  const errorMessageElement = errorMessageTemplateElement.content.querySelector('.error').cloneNode(true);
  document.querySelector('body').append(errorMessageElement);
  window.addEventListener('click', alertSendindToServerOff);
  window.addEventListener('keydown', (event) => {
    if(event.code === 'Escape') {alertSendindToServerOff();}
  });
}
function alertSendindToServerOff() {
  const errorMessageElement = document.querySelector('.error');
  window.removeEventListener('click', alertSendindToServerOff);
  window.removeEventListener('keydown', alertSendindToServerOff);
  errorMessageElement.remove();
}
function showSuccessSendindToServer(){
  const successMessageTemplateElement = document.querySelector('#success');
  const successMessageElement = successMessageTemplateElement.content.querySelector('.success').cloneNode(true);
  clearForm();
  document.querySelector('body').append(successMessageElement);
  window.addEventListener('click', closeSuccesSendindToServer);
  window.addEventListener('keydown', (event) => {
    if(event.code === 'Escape') {closeSuccesSendindToServer();}
  });
}
function closeSuccesSendindToServer() {
  const successMessageElement = document.querySelector('.success');
  window.removeEventListener('click', closeSuccesSendindToServer);
  window.removeEventListener('keydown', closeSuccesSendindToServer);
  successMessageElement.remove();
}
function debounce (callback, timeoutDelay = 500) {
  let timeoutID;
  return (...rest) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export {debounce, clearForm, alertMapOn,   showSuccessSendindToServer ,alertSendindToServerOn, clearFilters, clearMap};

