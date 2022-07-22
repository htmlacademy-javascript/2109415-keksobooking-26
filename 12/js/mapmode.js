const formElement = document.querySelector('.ad-form');
const mapFilterElement = document.querySelector('.map__filters');

function turnOnDisableMode() {
  formElement.classList.add('ad-form--disable');

  for (const child of formElement.children) {
    child.setAttribute('disabled', '');
  }
  mapFilterElement.classList.add('map__filters--disable');
  for (const child of mapFilterElement.children) {
    child.setAttribute('disabled', '');
  }
}

function tournOffDisableMode() {
  formElement.classList.remove('ad-form--disable');
  for (const child of formElement.children) {
    child.removeAttribute('disabled');
  }
  mapFilterElement.classList.remove('map__filters--disable');
  for (const child of mapFilterElement.children) {
    child.removeAttribute('disabled');
  }
  // });
}

export{turnOnDisableMode, tournOffDisableMode};
