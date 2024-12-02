import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../components/Dashboard.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
