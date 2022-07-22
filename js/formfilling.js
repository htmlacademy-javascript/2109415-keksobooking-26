import { clearFilters, clearForm, clearMap } from './util.js';
import {setOnMainPinMove} from './map.js';
const MIN_PRICE = {
  'bungalow' : '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const formElement = document.querySelector('.ad-form');
const titleField = formElement.querySelector('#title');
const submitButton = formElement.querySelector('.ad-form__submit');
const resetButton = formElement.querySelector('.ad-form__reset');

const pristine = new Pristine(
  formElement,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error-text',
  },
  true
);

setOnMainPinMove(document.querySelector('.ad-form').querySelector('#address').value);

function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(titleField, validateTitle);

titleField.addEventListener('keydown', () => {
  pristine.validate();
});

const typeField = formElement.querySelector('#type');
const priceField = formElement.querySelector('#price');
priceField.setAttribute('min', MIN_PRICE[typeField.value]);

const sliderElement = document.querySelector('.ad-form__slider');
function validatePrice(value) {
  return isFinite(+value) && +value > priceField.min;
}

function getPriceErrorMessage(){
  return `Не менее  ${priceField.min} рублей за ночь`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

priceField.addEventListener('keyup', () => {
  sliderElement.noUiSlider.set(priceField.value);
  pristine.validate();
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: +priceField.max,
  },
  start: +priceField.max / 2,
  step: 10,
  connect: 'lower',
});
sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
  pristine.validate();
});

typeField.addEventListener('change', () => {
  priceField.setAttribute('min', MIN_PRICE[typeField.value]);
  pristine.validate();
});

const quantityRoomField = formElement.querySelector('#room_number');
const quantityGuestField = formElement.querySelector('#capacity');
const roomGuestOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['any']
};

function onUnitChange() {
  pristine.validate();
}

function validateRoomGuest() {
  return roomGuestOption[quantityRoomField.value].includes(quantityGuestField.value);
}

function getRoomGuestErrorMessage() {
  return 'Недостаточно комнат для указанного количества гостей';
}

quantityRoomField.addEventListener('change', onUnitChange);
quantityGuestField.addEventListener('change', onUnitChange);

pristine.addValidator(quantityRoomField, validateRoomGuest, '');
pristine.addValidator(quantityGuestField, validateRoomGuest, getRoomGuestErrorMessage);

const timeinElement = formElement.querySelector('#timein');
const timeoutElement = formElement.querySelector('#timeout');
timeinElement.addEventListener('change', () => {timeoutElement.value = timeinElement.value;});
timeoutElement.addEventListener('change', () => {timeinElement.value = timeoutElement.value;});


function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}
function confirmForm(cb) {
  formElement.addEventListener('submit', async (evt) => {
    // debugger;
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      // debugger;
      await cb(new FormData(evt.target));
      // debugger;
      unblockSubmitButton();
    }
  });
}

function setOnResetClick(cb) {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearForm();
    clearFilters();
    clearMap();
    if(cb){cb();}
  });
}
export { confirmForm, setOnResetClick };
