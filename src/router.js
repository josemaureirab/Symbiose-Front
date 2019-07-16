import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue')
    },  
    /* clients */
    {
      path: '/clients',
      name: 'clients',
      component: () => import('@/views/clients/index.vue')
    },
    {
      path: '/clients_edit/:id',
      name: 'clients_edit',
      component: () => import('@/views/clients/edit.vue')
    },
    {
      path: '/proposal_detail/:id',
      name: 'proposal_detail',
      component: () => import('@/views/proposal/proposal_detail.vue')
    },
    {
      path: '/proposal_edit/:id',
      name: 'proposal_edit',
      component: () => import('@/views/proposal/proposal_edit.vue')
    },
    {
      path: '/createProposal',
      name: 'proposal_create',
      component: () => import('@/views/proposal/proposal_create.vue')
    },
    {
      path: '/addFiles',
      name: 'proposal_files',
      component: () => import('@/views/proposal/proposal_files.vue')
    }
  ]
})