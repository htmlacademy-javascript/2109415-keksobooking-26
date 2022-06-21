import { createArrayOfObjects } from './data.js';

const map = document.querySelector('.map__canvas');

const houseTypes = [];
for (const element of document.querySelector('#housing-type').childNodes) {
  if (element.outerText) {
    houseTypes.push({ value: element.value, label: element.label });
  }
}
const offerWizard = document
  .querySelector('#card')
  .content.querySelector('.popup');
const similarWizards = createArrayOfObjects(2);
// console.log(similarWizards);

similarWizards.forEach((item) => {
  const wizardElement = offerWizard.cloneNode(true);
  wizardElement.querySelector('.popup__title').textContent = item.offer.title;
  wizardElement.querySelector(
    '.popup__text--address'
  ).textContent = `${item.location.lat}; ${item.location.lng};`;
  wizardElement.querySelector(
    '.popup__text--price'
  ).textContent = `${item.offer.price} ₽/ночь`;
  wizardElement.querySelector('.popup__type').textContent = houseTypes.find(
    (element) => {
      if (element.value === item.offer.type) {
        return element;
      }
    }
  ).label;
  wizardElement.querySelector(
    '.popup__text--capacity'
  ).textContent = `${item.offer.rooms} комнат(a)(ы) для ${item.offer.guests} гостя(ей)`;
  wizardElement.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

  const featureTypeList = wizardElement.querySelector('.popup__features');
  while (featureTypeList.firstChild) {
    featureTypeList.removeChild(featureTypeList.firstChild);
  }
  item.offer.features.forEach((element) => {
    featureTypeList.innerHTML += `<li class="popup__feature popup__feature--${element}"></li>`;
  });

  if (!item.offer.description) {
    wizardElement.querySelector('.popup__description').classList.add('hidden');
  } else {
    wizardElement.querySelector('.popup__description').textContent =
      item.offer.description;
  }
  wizardElement.removeChild(wizardElement.lastChild);
  item.offer.photos.forEach((element) => {
    const photoItem = document.createElement('div');
    photoItem.innerHTML = `
    <div class="popup__photos">
    <img
      src="${element}"
      class="popup__photo"
      width="45"
      height="40"
      alt="Фотография жилья"
    />
    </div>`;
    wizardElement.appendChild(photoItem);
  });

  wizardElement.querySelector('.popup__avatar').src = item.author.avatar;

  // console.log(houseTypes.find((element) => {if(element.value === item.offer.type) {return element.label;}}));

  map.appendChild(wizardElement);
});
