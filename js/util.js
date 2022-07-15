const ALERT_SHOW_TIME = 3000;
function getRandomNumber(min, max, precision = 0) {
  if (min >= max) {
    return;
  }
  return (
    Math.trunc((Math.random() * (max - min) + min) * 10 ** precision) /
    10 ** precision
  );
}

function getRandomArrayArray(data) {
  const copiedData = data.slice();
  const randomArrayElements = [];
  let lengthResult = getRandomNumber(0, copiedData.length-1);
  while (lengthResult--) {
    randomArrayElements.push(copiedData.splice(getRandomNumber(0, copiedData.length-1),1));
  }
  return randomArrayElements;
}
function getRandomArrayElement(data) {
  return  data[getRandomNumber(0, data.length-1)];
}

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

function alertSendindToServerOn() {
  const errorMessageTemplateElement = document.querySelector('#error');
  const errorMessageElement = errorMessageTemplateElement.content.querySelector('.error');
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
  const successMessageElement = successMessageTemplateElement.content.querySelector('.success');
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

export {alertMapOn, getRandomNumber, getRandomArrayArray, getRandomArrayElement, showSuccessSendindToServer ,alertSendindToServerOn};
