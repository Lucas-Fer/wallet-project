const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const cotacaoAPI = () => fetch(API_URL).then((response) => response.json());

export default cotacaoAPI;

// console.log(cotacaoAPI());
