const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__pic');

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const pictureFileChooser = document.querySelector('.ad-form__input');
const picturePreview = document.querySelector('.ad-form__photo');
pictureFileChooser.addEventListener('change', () => {
  const file = pictureFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const pictureElement = document.createElement('img');
    pictureElement.width = '40';
    pictureElement.height = '44';
    pictureElement.alt = 'Миникартинка предлагаемого жилья';
    pictureElement.classList.add('ad-form__photo--pic');
    pictureElement.src = URL.createObjectURL(file);

    picturePreview.append(pictureElement);
  }
});
