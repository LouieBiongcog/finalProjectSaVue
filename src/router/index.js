import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Dashboard from '../components/Dashboard.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;