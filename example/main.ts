import { createApp } from "vue";
import App from "./app.vue";
import { Button } from "ant-design-vue";
const app = createApp(App);
app.use(Button);
app.mount("#app");
