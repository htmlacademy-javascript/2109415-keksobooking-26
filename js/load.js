async function getData(onSuccess, onError) {
  return await fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) { return response.json(); }
      throw new Error(`${response.status} ${response.statusText}`);
    })

    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });

}

async function sendData(onSuccess, onError, body) {
  return await fetch('https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {  return onSuccess(); }
      throw new Error('Не удалось отправить форму.Попробуйте ещё раз');
    })
    .catch((err) => {
      onError(err);
    });
}

export { getData, sendData };
