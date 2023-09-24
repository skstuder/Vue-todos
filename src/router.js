import { createRouter, createWebHistory } from "vue-router";
import Home from "../src/views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
];
const router = createRouter({
    //history fix
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
export default router;
