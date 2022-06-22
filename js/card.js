import { createArrayOfObjects } from './data.js';

const mapElement = document.querySelector('.map__canvas');

const houseTypes = [];
for (const element of document.querySelector('#housing-type').childNodes) {
  if (element.outerText) {
    houseTypes.push({ value: element.value, label: element.label });
  }
}
const offerForm = document
  .querySelector('#card')
  .content.querySelector('.popup');
const similarOffers = createArrayOfObjects(2);

similarOffers.forEach((item) => {
  const offerElement = offerForm.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = item.offer.title;
  offerElement.querySelector(
    '.popup__text--address'
  ).textContent = `${item.location.lat}; ${item.location.lng};`;
  offerElement.querySelector(
    '.popup__text--price'
  ).textContent = `${item.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = houseTypes.find(
    (element) => {
      if (element.value === item.offer.type) {
        return element;
      }
    }
  ).label;
  offerElement.querySelector(
    '.popup__text--capacity'
  ).textContent = `${item.offer.rooms} комнат(a)(ы) для ${item.offer.guests} гостя(ей)`;
  offerElement.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

  const featureTypeList = offerElement.querySelector('.popup__features');
  while (featureTypeList.firstChild) {
    featureTypeList.removeChild(featureTypeList.firstChild);
  }
  item.offer.features.forEach((element) => {
    featureTypeList.innerHTML += `<li class="popup__feature popup__feature--${element}"></li>`;
  });

  if (!item.offer.description) {
    offerElement.querySelector('.popup__description').classList.add('hidden');
  } else {
    offerElement.querySelector('.popup__description').textContent =
      item.offer.description;
  }
  offerElement.removeChild(offerElement.lastChild);
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
    offerElement.appendChild(photoItem);
  });

  offerElement.querySelector('.popup__avatar').src = item.author.avatar;

  // console.log(houseTypes.find((element) => {if(element.value === item.offer.type) {return element.label;}}));

  mapElement.appendChild(offerElement);
});
