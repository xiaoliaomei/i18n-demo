import Vue from 'vue';
import App from '_src/App.vue';
import i18n from '/lang'
window.$vm = new Vue({
  render: (h) => h(App),
  i18n
}).$mount('#app');