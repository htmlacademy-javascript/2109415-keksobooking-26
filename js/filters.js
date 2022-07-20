import { getData } from './load.js';
import { createAdPinMarkers } from './map.js';
import { alertMapOn, debounce } from './util.js';

const LENGTH_OF_OFFERS = 10;
const FILTERING_DELAY = 500;

const filterForm = document.querySelector('.map__filters');


function setFiltersOn (){
  filterForm.querySelector('#housing-type').addEventListener('change', () => {debounce(makeFiltering(),FILTERING_DELAY);} );
  filterForm.querySelector('#housing-price').addEventListener('change', () => {debounce(makeFiltering(),FILTERING_DELAY);});
  filterForm.querySelector('#housing-rooms').addEventListener('change', () => {debounce(makeFiltering(),FILTERING_DELAY);});
  filterForm.querySelector('#housing-guests').addEventListener('change', () => {debounce(makeFiltering(),FILTERING_DELAY);});
  filterForm.querySelector('#filter-wifi').addEventListener('change', () => {debounce(makeFiltering(),FILTERING_DELAY);});
  filterForm.querySelector('#filter-dishwasher').addEventListener('change', () => {debounce(makeFiltering(),FILTERING_DELAY);});
  filterForm.querySelector('#filter-parking').addEventListener('change', () => {debounce(makeFiltering(),FILTERING_DELAY);});
  filterForm.querySelector('#filter-washer').addEventListener('change', () => {debounce(makeFiltering(),FILTERING_DELAY);});
  filterForm.querySelector('#filter-elevator').addEventListener('change', () => {debounce(makeFiltering(),FILTERING_DELAY);});
  filterForm.querySelector('#filter-conditioner').addEventListener('change', () => {debounce(makeFiltering(),FILTERING_DELAY);});

}

function makeFiltering(){
  getData(createAdPinMarkers, alertMapOn);
}
function filterOutOffers (offers) {
  const filtredOffers =[];
  while (filtredOffers.length < LENGTH_OF_OFFERS && offers.length){
    const offer = offers.pop();
    const housingtypeElementvalue = filterForm.querySelector('#housing-type').value;
    const priceElementvalue = filterForm.querySelector('#housing-price').value;
    const roomsElementvalue = filterForm.querySelector('#housing-rooms').value;
    const guestsElementvalue = filterForm.querySelector('#housing-guests').value;
    if (( housingtypeElementvalue === offer.offer.type || housingtypeElementvalue === 'any') &&
    (priceElementvalue === 'any' ||
    ((priceElementvalue === 'middle') && (+offer.offer.price >= 10000) && (+offer.offer.price <= 50000)) ||
    ((priceElementvalue === 'low') && (+offer.offer.price < 10000))||
    ((priceElementvalue === 'high') && (+offer.offer.price > 50000))) &&
    (roomsElementvalue === 'any'|| +roomsElementvalue === +offer.offer.rooms)&&
    (guestsElementvalue === 'any' || +guestsElementvalue === +offer.offer.guests)&&
    (!filterForm.querySelector('#filter-wifi').checked || (offer.offer.features && offer.offer.features.includes('wifi')))&&
    (!filterForm.querySelector('#filter-dishwasher').checked || (offer.offer.features && offer.offer.features.includes('dishwasher')))&&
    (!filterForm.querySelector('#filter-parking').checked || (offer.offer.features && offer.offer.features.includes('parking')))&&
    (!filterForm.querySelector('#filter-washer').checked || (offer.offer.features && offer.offer.features.includes('washer')))&&
    (!filterForm.querySelector('#filter-elevator').checked || (offer.offer.features && offer.offer.features.includes('elevator')))&&
    (!filterForm.querySelector('#filter-conditioner').checked || (offer.offer.features && offer.offer.features.includes('conditioner')))
    ){
      filtredOffers.push(offer);
    }
  }

  return filtredOffers;
}

export {filterOutOffers, setFiltersOn};
