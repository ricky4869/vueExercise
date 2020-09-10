import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    children: [
      {
        path:'',
        name: 'HomePage',
        component: () => import('../views/HomePage.vue')
      },
      {
        path:'aboutpage',
        name: 'AboutPage',
        component: () => import('../views/AboutPage.vue')
      },
      {
        path: 'cartpage',
        name: 'CartPage',
        component: () => import('../views/CartPage.vue')
      },
      {
        path: 'pay/:orderId',
        name: 'Pay',
        component: () => import('../views/Pay.vue')
      },
      {
        path:'productspage',
        name: 'ProductsPage',
        component: () => import('../views/ProductsPage.vue'),
        children:[
          {
            path: ':active',
            name: 'AllProducts',
            component: () => import('../views/AllProducts.vue')
          },
          {
            path: 'product/:productId',
            name: 'GetProduct',
            component: () => import('../views/GetProduct.vue')
          },
        ]
      }
    ],
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue'),
    // meta: { requiresAuth: true },
    children:[
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/admin/Products.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/admin/Order.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cupons',
        name: 'Cupons',
        component: () => import('../views/admin/Cupons.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'fakeorder',
        name: 'FakeOrder',
        component: () => import('../views/admin/FakeOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'checkout/:orderId',
        name: 'Checkout',
        component: () => import('../views/admin/Checkout.vue'),
        meta: { requiresAuth: true },
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition){
    return { x: 0, y: 0 }
  }
})

export default router
