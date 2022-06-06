function getRandomNumber (min, max, precision) {
  if (min >= max){
    //console.log('wrong range!');
    return;
  }
  return Math.trunc(((Math.random() * (max - min) + min) * 10 ** precision)) / 10 ** precision;
}

getRandomNumber (0, 1, 1);
