import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

// import '@pnotify/core/dist/Material.css';
import { alert, error } from '@pnotify/core';
import {  defaults } from '@pnotify/core';

import getRefs from './js/refs.js';
import fetchCountries from './js/fetchCountries.js';
import { renderList, renderMarkup } from './js/render-markup';

import debounce from 'lodash.debounce';
defaults.animateSpeed = 'fast';
const refs = getRefs();

refs.inputRef.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
 resetCard();
  const valueInput = e.target.value;

  if (valueInput !== '') {
    fetchCountries(valueInput)
      .then(data => {
        onResponse(data);
      })
      .catch(error => {
        console.error(error);
      })
      
  }
}

function onResponse(countries) {
  const cl = countries.length;

  if (cl > 10) {
    return onAlert();
  } else if (cl >= 2 && cl <= 10) {
    return renderList(countries);
  } else if (cl === 1) {
    resetListRef();
    return renderMarkup(countries);
  }
  onError();
}

function resetListRef() {
  refs.listRef.innerHTML = '';
}
function resetCard() {
  refs.cardRef.innerHTML = '';
}

function onError() {
  error({
    text: 'There is no such country',
    type: ' error',
    animateSpeed: 'fast',
  });
}

function onAlert() {
  alert({
    text: 'Too many matches found.',
    type: 'info',
    animateSpeed: 'fast',
  });
}
