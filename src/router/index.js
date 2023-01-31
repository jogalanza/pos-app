import { createRouter, createWebHashHistory } from 'vue-router'
import { useStore } from "vuex"
import { Cookies } from 'quasar'

const store = useStore()

  const routes = [
  {
    path: '/',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../layout/Main.vue'),
    children: [
      { 
        path: '/main/pos',
        name: 'POS',
        meta: { roles: [1] },
        component: () => import('../views/POS.vue'),
      },
      { 
        path: '/main/dashboard',
        name: 'Dashboard',
        meta: { roles: [1] },
        component: () => import('../views/Dashboard.vue'),
      },
      { 
        path: '/main/profile',
        name: 'Profile',
        component: () => import('../components/MyProfile.vue'),
      },
      { 
        path: '/main/reports',
        name: 'Reports',
        meta: { roles: [1] },
        component: () => import('../views/Reports.vue'),
      },
      { 
        path: '/main/masterfiles/employees',
        name: 'Employee',
        meta: { roles: [1] },
        component: () => import('../components/Masterfiles/Employees.vue'),
      },
      //Inventory
      { 
        path: '/main/inventory/stocks',
        name: 'Products',
        meta: { roles: [1] },
        component: () => import('../components/Inventory/ProductsBoard.vue'),
      },
      { 
        path: '/main/inventory/category',
        name: 'ItemCategory',
        meta: { roles: [1] },
        component: () => import('../components/Inventory/ItemCategory.vue'),
      },
      { 
        path: '/main/inventory/location',
        name: 'InventoryLocation',
        meta: { roles: [1] },
        component: () => import('../components/Inventory/InventoryLocation.vue'),
      },
      { 
        path: '/main/preferences',
        name: 'Preferences',
        meta: { roles: [1] },
        component: () => import('../components/Common/Preferences.vue'),
      },
      {
        path: '/unauthorized',
        name: 'Unauthorized',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/Unauthorized.vue')
      },
      { 
        path: '/:catchAll(.*)',
        name: 'Child404',
        component: () => import('../views/Error404.vue'),
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'Error404',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Error404.vue')
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
  });

router.beforeEach((to, from, next) => {
  //console.log('router beforeEach', to, from, store)
  if (to.fullPath !== '/') Cookies.set('_t', "a", { expires: window.invapp.to !== undefined && window.invapp.to !== null ? window.invapp.to : '5m' })
  if (to.meta.roles !== undefined && store !== undefined && to.meta.roles.indexOf(store.getters['user/getUserRole']) === -1) next({name: 'Unauthorized'})
  else next()
})

export default router
