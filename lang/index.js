// 国际化
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import zh from './languages/zh.json';
import en from './languages/en.json';

Vue.use(VueI18n);
const messages = {
  zh: {
    ...zh,
  },
  en: {
    ...en,
  },
};
const i18n = new VueI18n({
    locale: localStorage.getItem('hwI18n') || 'zh',
    messages,
  });
// Vue.use(i18n);
// window.i18n = i18n;
export default i18n;
