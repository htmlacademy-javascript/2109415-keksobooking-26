const APPARTAMENTS_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKINS_TYPES = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUTS_TYPES = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES_TYPES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS_TYPES = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function getRandomNumber(min, max, precision = 0) {
  if (min >= max) {
    //console.log('wrong range!');
    return;
  }
  return (
    Math.trunc((Math.random() * (max - min) + min) * 10 ** precision) /
    10 ** precision
  );
}

function getRandomArrayArray(input) {
  const arr = input.slice();
  const result = [];
  let lengthResult = getRandomNumber(0, arr.length-1);
  while (lengthResult--) {
    result.push(arr.splice(getRandomNumber(0, arr.length-1),1));
  }
  return result;
}
function getRandomArrayElement(arr) {
  return  arr[getRandomNumber(0, arr.length-1)];
}

function createObject(number) {
  let obj = {
    author: {
      avatar: `img/avatars/user${number !== 10 ? `0` :''}${number}.png`,
    },
    offer: {
      title: `someTitle${number}`,
      adress: '{{location.lat}}, {{location.lng}}',
      price: getRandomNumber (20, 100),
      type: getRandomArrayElement (APPARTAMENTS_TYPES),
      rooms: getRandomNumber(1, 7),
      guests: getRandomNumber(1,15),
      checkin: getRandomArrayElement(CHECKINS_TYPES),
      checkout: getRandomArrayElement(CHECKOUTS_TYPES),
      features: getRandomArrayArray(FEATURES_TYPES),
      description: `some description${number}`,
      photos: getRandomArrayArray(PHOTOS_TYPES),
    },
    location: {
      lat: getRandomNumber (35.65, 35.7, 5),
      lng: getRandomNumber (139.7, 139.8, 5)
    }
  };
  return obj;
}

function createArrayOfObjects(value) {
  const arr = [];
  while (value) {
    arr.push(createObject(value--));
  }
  return arr;
}

createArrayOfObjects(10);
