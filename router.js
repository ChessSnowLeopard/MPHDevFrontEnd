import { createRouter, createWebHistory } from 'vue-router';
import CoordinatorDashboard from './src/views/CoordinatorDashboard.vue';
import CoordinatorParticipants from './src/views/CoordinatorParticipants.vue';
import KeyTest from './src/views/KeyTest.vue';
import KeyProgress from './src/views/KeyProgress.vue';

const routes = [
  { path: '/', component: CoordinatorDashboard },
  { path: '/participants', component: CoordinatorParticipants },
  { path: '/keytest', component: KeyTest },
  { path: '/key-progress', component: KeyProgress },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
