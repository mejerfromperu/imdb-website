import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Ensure you import the router if you're using Vue Router

const app = createApp(App);

app.use(router); // Ensure Vue Router is registered
app.mount('#app');
