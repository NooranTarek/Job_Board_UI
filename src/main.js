import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";



const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);


const pinia = createPinia();

app.use(pinia).use(router).mount("#app");
