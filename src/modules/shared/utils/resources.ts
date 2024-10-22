import sharedEnTranslation from '../lang/en.json';
import sharedNlTranslation from '../lang/nl.json';
import registerEnTranslation from '../../register/lang/en.json';
import registerNlTranslation from '../../register/lang/nl.json';

const resources = {
  en: {
    register: { ...registerEnTranslation },
    shared: { ...sharedEnTranslation },
  },
  nl: {
    register: { ...registerNlTranslation },
    shared: { ...sharedNlTranslation },
  },
};

export default resources;
