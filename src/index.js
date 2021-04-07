import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/Material.css';
import { alert, error } from '@pnotify/core';

import getRefs from './js/refs.js';
import fetchCountries from './js/fetchCountries.js';
import { renderList, renderMarkup } from './js/render-markup';

import debounce from 'lodash.debounce';

const refs = getRefs();

refs.inputRef.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  e.preventDefault();

  const valueInput = e.target.value;

  if (valueInput !== '') {
    fetchCountries(valueInput).then(onResponse);
  }
}
console.log(refs);

function onResponse(countries) {
  const cl = countries.length;
  if (cl > 10) {
    return onAlert();
  } else if (cl >= 2 && cl <= 10) {
    return renderList(countries);
  } else if (cl === 1) {
    onFinally();
    return renderMarkup(countries);
  }
  onError();
}

function onFinally() {
  refs.listRef.innerHTML = '';

  setTimeout(() => {
    refs.inputRef.innerHTML = '';
  }, 600);
}

function onError() {
  error({
    text: 'There is no such country',
    type: ' error',
  });
}

function onAlert() {
  alert({
    text: 'Too many matches found.',
    type: 'info',
  });
}
