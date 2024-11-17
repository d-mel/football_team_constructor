import { createApp } from 'vue';
import store from './store';
import './assets/style/global.scss';
import App from './App.vue';

createApp(App).use(store).mount('#app');
