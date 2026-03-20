import {translations} from './data.js';

document.querySelectorAll('[t-id]').forEach(el => {
    const key = el.getAttribute('t-id');
    const lang = navigator.language.split('-')[0]; 
    el.textContent = translations[lang][key] || el.textContent;
});