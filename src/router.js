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

    //Users
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/users/allusers.vue')
    },
    //Clients
    {
      path: '/client',
      name: 'client_detail',
      component: () => import('@/views/clients/index.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('@/views/clients/clients.vue')
    },
    {
      path: '/allclients',
      name: 'allclients',
      component: () => import('@/views/clients/allclients.vue')
    },
    {
      path: '/clients_edit/:id',
      name: 'clients_edit',
      component: () => import('@/views/clients/edit.vue')
    },

    //Proposals
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
    },
    {
      path: '/trace',
      name: 'trace',
      component: () => import('@/views/trace.vue')
    }
  ]
})