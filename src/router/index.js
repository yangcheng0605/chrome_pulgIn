import { createRouter, createWebHashHistory } from 'vue-router'
import Cookies from 'js-cookie';
const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('@/components/iframe/index.vue')
  },
  {
    path: '/iframe_login',
    name: 'iframe_login',
    title: 'iframe_login',
    component: () => import('@/components/iframe/iframeLogin.vue')
  },
  {
    path: '/nxcc',
    name: 'nxcc',
    component: () => import('@/components/iframe/index.vue'),
    meta: {
        pageId: "nxcc",
        title: "nxcc",
    }
  },
  {
    path: '/iframe_google',
    name: 'iframe_google',
    component: () => import('@/components/iframe/google.vue'),
    meta: {
        pageId: "iframe_google",
        title: "Google",
    }
  },
  {
    path: '/iframe_redirect',
    name: 'iframe_redirect',
    component: () => import('@/components/iframe/redirect.vue'),
    meta: {
        pageId: "iframe_redirect",
        title: "Login",
    }
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach(async (to, from, next) => {
//   // 设置头部返回按钮
//   const token = Cookies.get("plat_token")
//   if (token) {
//     next()
//   } else {
//     if (from.path != '/nxcc') {
//       if (from.path == '/iframe_google') {
//         to.path == '/nxcc' ? next() : next({ path: '/iframe_google' })
//       } else if (from.path == '/iframe_login') {
//         to.path == '/nxcc' ? next() : next({ path: '/iframe_login' })
//       } else {
//         to.meta && to.meta.pageId ? toNext(to, from, next) : next({ path: '/login' });
//       }
//     } else {
//       if (to.path == '/iframe_google' || to.path == '/iframe_login') {
//         next()
//       } else {
//         next({ path: '/nxcc' });
//       }
//     }
//   }
// });

export default router
