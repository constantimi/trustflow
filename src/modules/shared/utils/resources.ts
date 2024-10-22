import sharedEnTranslation from '../lang/en.json';
import sharedNlTranslation from '../lang/nl.json';
import dashboardEnTranslation from '../../dashboard/lang/en.json';
import dashboardNlTranslation from '../../dashboard/lang/nl.json';

const resources = {
  en: {
    dashboard: { ...dashboardEnTranslation },
    shared: { ...sharedEnTranslation },
  },
  nl: {
    dashboard: { ...dashboardNlTranslation },
    shared: { ...sharedNlTranslation },
  },
};

export default resources;
