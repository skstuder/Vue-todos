import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./assets/css/normalize.css";
import "./assets/css/style.css";

const app = createApp(App);

app.use(router).mount("#app");
