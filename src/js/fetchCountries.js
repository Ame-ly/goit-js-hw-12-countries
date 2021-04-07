const URL = 'https://restcountries.eu/rest/v2/name/';

export default function fetchCountries(countryName) {
  return fetch(`${URL}${countryName}`)
    .then(r => r.json())
    .catch(error => console.log(error));
}

// data.filter(country => country.name.includes('uk'));