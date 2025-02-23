import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import routes from './authRoute'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path:'/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    ...routes,
    ],
});

router.beforeEach((to, from, next) => {
  const user_role = sessionStorage.getItem('user_role') || null;
  const token = sessionStorage.getItem('auth_token') || null;
  if (to.meta.requiresAuth) {
    if (!token) {
      next('/'); // Redirect to login if not authenticated
    } else {
      if (to.meta.role && to.meta.role !== user_role) {
        next('/'); // Redirect unauthorized users to a generic location
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router
