const mapElement = document.querySelector('.map__canvas');
const adFormElement = document.querySelector('.ad-form');

const getNonactiveMode = function(){
  mapElement.textContent = '';
  adFormElement.classList.add('ad-form--disabled');
};
