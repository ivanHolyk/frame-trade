import { createRouter, createWebHistory } from 'vue-router'
import MarketView from '@/views/MarketView.vue'
import UserView from '@/views/UserView.vue'
import LoginView from '@/views/LoginView.vue'
import OrdersView from '@/views/OrdersView.vue'
import ItemView from '@/views/ItemView.vue'
import ItemsView from '@/views/ItemsView.vue'
import LogoutView from '@/views/LogoutView.vue'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/market',
      name: 'market',
      component: MarketView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/user',
      children: [
        {
          path: ':username',
          name: 'userWithUsername',
          // props: true,
          component: UserView,
          children: [
            {
              path: 'orders',
              name: 'userOrders',
              props: { isUserOrders: true },
              component: OrdersView
            }
          ]
        }
      ]
    },

    {
      path: '/orders',
      name: 'orders',
      component: OrdersView
    },
    {
      path: '/item',
      name: 'items',
      component: ItemsView,
      children: [
        {
          path: ':id/:urlName',
          name: 'item',
          component: ItemView,
          props: true,
          children: [
            {
              path: 'orders',
              name: 'itemOrders',
              props: true,
              component: OrdersView
            }
          ]
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  console.log('does user requiers auth?')
  console.log(store.requiresAuth)
  console.log('to', to)
  console.log('from', from)
  console.log('redirect from', from.redirectedFrom)

  if (store.requiresAuth && to.path !== '/login') {
    // next('/login')
    next()
  } else {
    next()
  }
})
// router.beforeEach((to, from) => {
//   console.log(to)
//   console.log(from)
//   console.log(from.redirectedFrom)
// })
export default router
