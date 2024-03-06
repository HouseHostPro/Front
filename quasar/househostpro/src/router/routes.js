
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/loginPage.vue'),meta: { showSomePart: true } },
      { path: 'users', component: () => import('pages/UsersPage.vue'),meta: { showSomePart: true } },
      { path: 'user/:id', component: () => import('pages/FormUserPage.vue'),meta: { showSomePart: true } },
      { path: 'user', component: () => import('pages/FormUserPage.vue'),meta: { showSomePart: true } },
      { path: 'login', component: () => import('pages/LoginPage.vue'), meta: { showSomePart: false } },
      { path: 'dominis', component: () => import('pages/DominisPage.vue'),meta: { showSomePart: true }},
      { path: 'dominis/:id_user', component: () => import('pages/DominisPage.vue'),meta: { showSomePart: true }},
      { path: 'domini/:id', component: () => import('pages/FormDominiPage.vue'),meta: { showSomePart: true }},
      { path: 'domini', component: () => import('pages/FormDominiPage.vue'),meta: { showSomePart: true }},
      { path: 'configuracions', component: () => import('pages/ConfiguracioPage.vue'),meta: { showSomePart: true }},
      { path: 'configuracions/:id_propietat', component: () => import('pages/ConfiguracioPage.vue'),meta: { showSomePart: true }},
      { path: 'configuracio', component: () => import('pages/FormConfiguracioPage.vue'),meta: { showSomePart: true }},
      { path: 'configuracio/:id', component: () => import('pages/FormConfiguracioPage.vue'),meta: { showSomePart: true }},
      { path: 'reserves', component: () => import('pages/ReservesPage.vue'),meta: { showSomePart: true }},
      { path: 'reserves/:id_user', component: () => import('pages/ReservesPage.vue'),meta: { showSomePart: true }},
      { path: 'reserves/:id_propietat', component: () => import('pages/ReservesPage.vue'),meta: { showSomePart: true }},
      { path: 'reserva',component: () => import('pages/FormReservasPage.vue'),meta: { showSomePart: true }},
      { path: 'reserva/:id',component: () => import('pages/FormReservasPage.vue'),meta: { showSomePart: true }},
      { path: 'preutemporadas/:id_propietat', component: () => import('pages/PreuTemporadaPage.vue'),meta: { showSomePart: true }},
      { path: 'preutemporada', component: () => import('pages/FormPreuTemporadaPage.vue'),meta: { showSomePart: true }},
      { path: 'preutemporada/:id', component: () => import('pages/FormPreuTemporadaPage.vue'),meta: { showSomePart: true }},
      { path: 'serveis', component: () => import('pages/ServeiPage.vue'),meta: { showSomePart: true }},
      { path: 'serveis/:id_propietat', component: () => import('pages/ServeiPage.vue'),meta: { showSomePart: true }},
      { path: 'servei', component: () => import('pages/FormServeiPage.vue'),meta: { showSomePart: true }},
      { path: 'servei/:id', component: () => import('pages/FormServeiPage.vue'),meta: { showSomePart: true }},
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
