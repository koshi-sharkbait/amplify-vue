import * as vueRouter from 'vue-router';
import Home from '@/components/Home.vue';
import Chat from '@/components/Chat.vue';

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
  }
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;
