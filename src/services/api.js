// Fichero src/services/api.js
const callToApi = () => {
  return fetch(
    'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
  )
    .then((response) => response.json())
    .then((data) => {
      const result = {
        quote: data.quote,
        character: data.character,
      };
      return result;
    });
};

export default callToApi;
