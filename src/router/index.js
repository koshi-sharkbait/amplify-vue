import * as vueRouter from 'vue-router';
import Home from '@/components/Home.vue';
import Chat from '@/components/Chat.vue';
import AI from '@/components/AI.vue';
import Geo from '@/components/Geo.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    props: true,
  },
  {
    path: '/ai',
    name: 'ai',
    component: AI,
  },
  {
    path: '/geo',
    name: 'geo',
    component: Geo,
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;
