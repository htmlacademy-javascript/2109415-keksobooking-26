const formElement = document.querySelector('.ad-form');
const titleField = formElement.querySelector('#title');

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

function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(titleField, validateTitle);

titleField.addEventListener('keydown', () => {
  pristine.validate();
});

const priceField = formElement.querySelector('#price');

function validatePrice(value) {
  return isFinite(+value);
}

pristine.addValidator(priceField, validatePrice);

priceField.addEventListener('keyup', () => {
  pristine.validate();
});

const quantityRoomField = formElement.querySelector('#room_number');
const quantityGuestField = formElement.querySelector('#capacity');
const roomGuestOption = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 1 гостя', 'для 2 гостей'],
  '3 комнаты': ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
  '100 комнат': ['не для гостей']
};

function onUnitChange() {
  pristine.validate();
}

function validateRoomGuest(){
  return roomGuestOption[quantityRoomField.value].includes(quantityGuestField.value);
}

function getRoomGuestErrorMessage(){
  return `Не достаточно комнат ${quantityGuestField.value}`;
}

quantityRoomField.addEventListener('change', onUnitChange);
quantityGuestField.addEventListener('change', onUnitChange);

pristine.addValidator(quantityRoomField, validateRoomGuest, '');
pristine.addValidator(quantityGuestField, validateRoomGuest, getRoomGuestErrorMessage);

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()){
    formElement.submit();
  }
});
