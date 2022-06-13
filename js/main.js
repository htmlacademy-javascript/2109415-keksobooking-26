const PRICE_MIN = 20;
const PRICE_MAX = 100;
const ROOMS_MIN = 1;
const ROOMS_MAX = 7;
const GUESTS_MIN = 1;
const GUESTS_MAX = 15;
const LAT_MIN = 35.65;
const LAT_MAX = 35.70;
const LNG_MIN = 139.7;
const LNG_MAX = 139.8;
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

function getRandomArrayArray(data) {
  const serviceArr = data.slice();
  const result = [];
  let lengthResult = getRandomNumber(0, serviceArr.length-1);
  while (lengthResult--) {
    result.push(serviceArr.splice(getRandomNumber(0, serviceArr.length-1),1));
  }
  return result;
}
function getRandomArrayElement(data) {
  return  data[getRandomNumber(0, data.length-1)];
}

function createObject(number) {
  const obj = {
    author: {
      avatar: `img/avatars/user${number !== 10 ? '0' :''}${number}.png`,
    },
    offer: {
      title: `someTitle${number}`,
      adress: '{{location.lat}}, {{location.lng}}',
      price: getRandomNumber (PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement (APPARTAMENTS_TYPES),
      rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomNumber(GUESTS_MIN,GUESTS_MAX),
      checkin: getRandomArrayElement(CHECKINS_TYPES),
      checkout: getRandomArrayElement(CHECKOUTS_TYPES),
      features: getRandomArrayArray(FEATURES_TYPES),
      description: `some description${number}`,
      photos: getRandomArrayArray(PHOTOS_TYPES),
    },
    location: {
      lat: getRandomNumber (LAT_MIN, LAT_MAX, 5),
      lng: getRandomNumber (LNG_MIN, LNG_MAX, 5)
    }
  };
  return obj;
}

function createArrayOfObjects(value) {
  const newArr = [];
  while (value) {
    newArr.push(createObject(value--));
  }
  return newArr;
}

createArrayOfObjects(10);
