
function getRandomNumber(min, max, precision = 0) {
  if (min >= max) {
    return;
  }
  return (
    Math.trunc((Math.random() * (max - min) + min) * 10 ** precision) /
    10 ** precision
  );
}

function getRandomArrayArray(data) {
  const copiedData = data.slice();
  const randomArrayElements = [];
  let lengthResult = getRandomNumber(0, copiedData.length-1);
  while (lengthResult--) {
    randomArrayElements.push(copiedData.splice(getRandomNumber(0, copiedData.length-1),1));
  }
  return randomArrayElements;
}
function getRandomArrayElement(data) {
  return  data[getRandomNumber(0, data.length-1)];
}

export {getRandomNumber};
export {getRandomArrayArray};
export {getRandomArrayElement};
