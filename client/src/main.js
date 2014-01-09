import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';
import store from './store';
import AWS from 'aws-sdk';

Vue.use(AWS);

Vue.use(Vuetify);

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
});
