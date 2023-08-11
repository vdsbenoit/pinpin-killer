import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { useStore } from '@/services/store';



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs'
  },
  {
    name: 'forbidden',
    path: '/forbidden',
    component: () => import ('../views/ForbiddenPage.vue'),
  },
  {
    name: 'onboarding',
    path: '/onboarding',
    component: () => import ('../views/OnboardingPage.vue'),
  },
  {
    name: 'rules',
    path: '/rules',
    component: () => import ('../views/RulesPage.vue'),
  },
  {
    name: 'validation',
    path: '/validation',
    component: () => import ('../views/ValidationPage.vue'),
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        name: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  },
  { 
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import ('../views/NotFoundPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from) => {
  const store = useStore();
  if (to.name === "forbidden" || to.name === "404") return true;
  if (store.checkSalt()) {
    if (store.newbie && to.name != "onboarding") return { name: 'onboarding'};
    return true
  } else {
    if (to.query.salt) {
      store.qrSalt = `${to.query.salt}`
      console.log(`saved salt '${to.query.salt}' in the store`)
      return { name: 'tab1'}; 
    } 
    else {
      return { name: 'forbidden'}; 
    }
  }
})

export default router
