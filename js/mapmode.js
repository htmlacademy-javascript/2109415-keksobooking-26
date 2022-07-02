const formElement = document.querySelector('.ad-form');
formElement.classList.add('ad-form--disable');

for (const child of formElement.children){
  child.setAttribute('disabled', '');
}

const mapFilterElement = document.querySelector('.map__filters');
mapFilterElement.classList.add('map__filters--disable');

for (const child of mapFilterElement.children){
  child.setAttribute('disabled', '');
}
const mapElement = document.querySelector('.map__canvas');
// mapElement.addEventListener('load', () => {
formElement.classList.remove('ad-form--disable');

for (const child of formElement.children){
  child.removeAttribute('disabled');
}

mapFilterElement.classList.remove('map__filters--disable');

for (const child of mapFilterElement.children){
  child.removeAttribute('disabled');
}
// });
