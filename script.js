import {translations} from './data.js';

const supportedLanguages = ['pt', 'en'];
const fallbackLanguage = 'pt';
const storageKey = 'cci-language';

const getInitialLanguage = () => {
    const storedLanguage = localStorage.getItem(storageKey);
    if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
        return storedLanguage;
    }

    const browserLanguage = navigator.language.split('-')[0];
    if (supportedLanguages.includes(browserLanguage)) {
        return browserLanguage;
    }

    return fallbackLanguage;
};

const getDictionary = (language) => translations[language] || translations[fallbackLanguage];

const applyTextTranslations = (dictionary) => {
    document.querySelectorAll('[t-id]').forEach((element) => {
        const key = element.getAttribute('t-id');
        if (!key) {
            return;
        }

        element.textContent = dictionary[key] || element.textContent;
    });
};

const syncLanguageButtons = (language) => {
    document.querySelectorAll('.lang-btn').forEach((button) => {
        const isActive = button.getAttribute('data-lang') === language;
        button.classList.toggle('active', isActive);
    });
};

const applyLanguage = (language) => {
    const finalLanguage = supportedLanguages.includes(language) ? language : fallbackLanguage;
    const dictionary = getDictionary(finalLanguage);

    document.documentElement.lang = finalLanguage;
    applyTextTranslations(dictionary);
    syncLanguageButtons(finalLanguage);

    localStorage.setItem(storageKey, finalLanguage);
};

const wireLanguageSwitcher = () => {
    document.querySelectorAll('.lang-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const nextLanguage = button.getAttribute('data-lang');
            if (!nextLanguage) {
                return;
            }

            applyLanguage(nextLanguage);
        });
    });
};

wireLanguageSwitcher();
applyLanguage(getInitialLanguage());