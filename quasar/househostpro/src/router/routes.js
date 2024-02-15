
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/loginPage.vue') },
      { path: 'users', component: () => import('pages/UsersPage.vue') },
      { path: 'user/:id', component: () => import('pages/FormUserPage.vue') },
      { path: 'user', component: () => import('pages/FormUserPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
