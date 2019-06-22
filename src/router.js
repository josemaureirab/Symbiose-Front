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
    /* rooms */
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('@/views/room/roomIndex.vue')
    },
    {
      path: '/rooms_edit/:id',
      name: 'rooms_edit',
      component: () => import('@/views/room/roomEdit.vue')
    },     
    /* guests */
    {
      path: '/guests',
      name: 'guests',
      component: () => import('@/views/guest/index.vue')
    },
    {
      path: '/guests_edit/:id',
      name: 'guests_edit',
      component: () => import('@/views/guest/edit.vue')
    },
    /* reservations */        
    {
      path: '/reservations',
      name: 'reservations',
      component: () => import('@/views/reservation/index.vue')
    }, 
    // {
    //   path: '/reservations_add',
    //   name: 'reservations_add',
    //   component: () => import('@/views/reservation/reservationRoom.vue')
    // },
    {
      path: '/reservations_edit/:id',
      name: 'reservations_edit',
      component: () => import('@/views/reservation/edit.vue')
    },
    {
      path: '/reservations_room/:id',
      name: 'reservations_room',
      component: () => import('@/views/reservation/room.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/checkout/index.vue')
    },
         
    /* check-in */
    {
      path: '/checkin',
      name: 'checkin',
      component: () => import('@/views/checkin/index.vue')
    }, 
    {
      path: '/checkin_create/:id',
      name: 'checkin_create',
      component: () => import('@/views/checkin/create.vue')
    },     
  ]
})
