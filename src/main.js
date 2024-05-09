import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'font-awesome/css/font-awesome.min.css';


import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount("#app");


