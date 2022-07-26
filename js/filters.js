import { getData } from './load.js';
import { createAdPinMarkers } from './map.js';
import { alertMapOn, debounce } from './util.js';

const LENGTH_OF_OFFERS = 10;
const FILTERING_DELAY = 500;
const CHEAP_PRICE = 10000;
const EXPENSIVE_PRICE = 50000;

const filterForm = document.querySelector('.map__filters');


function setFiltersOn (){
  filterForm.addEventListener('change', () => {debounce(() => makeFiltering(),FILTERING_DELAY)();} );
}

function makeFiltering(){
  getData(createAdPinMarkers, alertMapOn);
}
function filterOutOffers (offers) {
  const filtredOffers =[];
  while (filtredOffers.length < LENGTH_OF_OFFERS && offers.length){
    const offer = offers.pop();
    if (checkHouseType(offer.offer.type) &&
    checkPrice(parseInt(offer.offer.price, 10)) &&
    checkRooms(parseInt(offer.offer.rooms, 10))&&
    checkGuests(parseInt(offer.offer.guests, 10))&&
    checkFeatures(offer.offer.features)
    ){
      filtredOffers.push(offer);
    }
  }
  return filtredOffers;
}

function checkRooms(room){
  const roomsElementvalue = filterForm.querySelector('#housing-rooms').value;
  return (roomsElementvalue === 'any'|| parseInt(roomsElementvalue, 10) === room);
}

function checkGuests(guest){
  const guestsElementvalue = filterForm.querySelector('#housing-guests').value;
  return (guestsElementvalue === 'any' || parseInt(guestsElementvalue, 10) === guest);
}

function checkHouseType(type) {
  const housingtypeElementvalue = filterForm.querySelector('#housing-type').value;
  return ( housingtypeElementvalue === type || housingtypeElementvalue === 'any');
}

function checkPrice(price){
  const priceElementvalue = filterForm.querySelector('#housing-price').value;
  return   (priceElementvalue === 'any' ||
  ((priceElementvalue === 'middle') && (price >= CHEAP_PRICE) && (price <= EXPENSIVE_PRICE)) ||
  ((priceElementvalue === 'low') && (price < CHEAP_PRICE)) ||
  ((priceElementvalue === 'high') && (price > EXPENSIVE_PRICE)));
}

function checkFeatures(features){
  return (!filterForm.querySelector('#filter-wifi').checked || (features && features.includes('wifi')))&&
  (!filterForm.querySelector('#filter-dishwasher').checked || (features && features.includes('dishwasher')))&&
  (!filterForm.querySelector('#filter-parking').checked || (features && features.includes('parking')))&&
  (!filterForm.querySelector('#filter-washer').checked || (features && features.includes('washer')))&&
  (!filterForm.querySelector('#filter-elevator').checked || (features && features.includes('elevator')))&&
  (!filterForm.querySelector('#filter-conditioner').checked || (features && features.includes('conditioner')));
}

export {filterOutOffers, setFiltersOn};
