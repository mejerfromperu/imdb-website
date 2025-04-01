// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import ApiComponent from "./components/ApiComponent.vue";
import AddTitleComponent from "./components/AddTitleComponent.vue";
import AddNameComponent from "./components/AddNameComponent.vue";
import DeleteTitleComponent from "./components/DeleteTitleComponent.vue";
import UpdateTitleComponent from "./components/UpdateTitleComponent.vue";
import TitleSearchComponent from "./components/TitleSearchComponent.vue";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/search-name", component: ApiComponent },
  { path: "/search-title", component: TitleSearchComponent },
  { path: "/add-name", component: AddNameComponent },
  { path: "/add-title", component: AddTitleComponent },
  { path: "/update-title", component: UpdateTitleComponent },
  { path: "/delete-title", component: DeleteTitleComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
