import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ApiComponent from './components/ApiComponent.vue';
import HelloWorld from './components/HelloWorld.vue';

// Define routes
const routes = [
  { path: '/', component: HelloWorld }, // Home page (App.vue with custom content)
  { path: '/search', component: ApiComponent }, // Search page
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create and mount the app with router
const app = createApp(App);
app.use(router);
app.mount('#app');