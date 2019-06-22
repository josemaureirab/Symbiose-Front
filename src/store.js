import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
const Cryptr = require('cryptr');
const cryptr = new Cryptr('9513RusskyHusky');

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
    pagination: {
      descending: true,
      page: 1,
      rowsPerPage: 8,
      sortBy: 'fat',
      totalItems: 0,
      rowsPerPageItems: [1, 2, 4, 8, 16]
    },
    items: [],
    /* General Stuffs */
    serverURL: 'http://localhost:9000',
    proposalList: [],
    loader: false,
    /* Template Stuffs */
    clipped: false,
    drawer: true,
    fixed: false,
    drawerItems: [
      {icon: 'mdi-clipboard-outline', title: 'Propuestas', to: '/' },
      { icon: 'mdi-account', title: 'Usuarios', to: '/rooms' },
      { icon: 'mdi-view-dashboard', title: 'Estádisticas', to: '/guests' },
      /* { icon: 'fas fa-check-double', title: 'Check-out', to: '/checkout'},
      { icon: 'fas fa-check', title: 'Check-in', to: '/checkin' },
      { icon: 'mdi-clipboard-outline', title: 'Reservas', to: '/reservations' } */
    ],
    notebooks: [
      {
        name: 'Set Mug Posavasos Gryffindor – Harry Potter',
        price: 16990,
        image: 'https://i0.wp.com/www.mymstore.cl/wp-content/uploads/2019/02/PicsArt_02-21-12.03.08.jpg?resize=250%2C250',
        stars: 5,
        totalReviews: 230,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'Pop Sirius Black Dog #73 – Harry Potter',
        price: 10990,
        image: 'https://i1.wp.com/www.mymstore.cl/wp-content/uploads/2019/02/PicsArt_02-20-11.53.04.jpg?resize=250%2C250',
        stars: 1,
        totalReviews: 1,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'Pop Orion #394 – Summoners War',
        price: 10990,
        image: 'https://i2.wp.com/www.mymstore.cl/wp-content/uploads/2019/02/PicsArt_02-20-11.48.39.jpg?resize=250%2C250',
        stars: 4,
        totalReviews: 340,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'Pop Voldemort #6 – Harry Potter',
        price: 10990,
        image: 'https://i2.wp.com/www.mymstore.cl/wp-content/uploads/2018/11/PicsArt_11-27-06.59.31.jpg?resize=250%2C250',
        stars: 3,
        totalReviews: 30,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'Notebook Lenovo Ideapad 320 Intel® Core i5-7200u 8GB',
        price: 2259,
        image: 'https://images-americanas.b2w.io/produtos/01/00/item/132381/3/132381386G1.png',
        stars: 5,
        totalReviews: 230,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'Notebook Dell Alienware - i7 16GB',
        price: 14000,
        image: 'https://images-submarino.b2w.io/produtos/01/00/sku/34470/9/34470934G1.jpg',
        stars: 2,
        totalReviews: 248,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'Smartphone Xiaomi Mi A1 dual Android one 7.1',
        price: 1199,
        image: 'https://images-americanas.b2w.io/produtos/01/00/sku/29296/2/29296259G1.jpg',
        stars: 0,
        totalReviews: 0,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'Smartphone Moto G 5S Dual Chip Android 7.0',
        price: 929,
        image: 'https://images-americanas.b2w.io/produtos/01/00/item/132474/0/132474081G1.png',
        stars: 1,
        totalReviews: 11,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'iPhone 8 Dourado 64GB Tela 4.7" IOS 11',
        price: 3949,
        image: 'https://images-americanas.b2w.io/produtos/01/00/item/132651/7/132651745G1.jpg',
        stars: 1,
        totalReviews: 2,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'Smartphone Samsung Galaxy S7 Edge',
        price: 1943,
        image: 'https://images-americanas.b2w.io/produtos/01/00/item/125911/8/125911828G1.png',
        stars: 5,
        totalReviews: 310,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'Smartphone Motorola Moto G6 Plus',
        price: 1699,
        image: 'https://images-americanas.b2w.io/produtos/01/00/item/133453/1/133453185G1.jpg',
        stars: 2,
        totalReviews: 42,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      },
      {
        name: 'Smartphone Motorola Moto Z3 Play',
        price: 2999,
        image: 'https://images-submarino.b2w.io/produtos/01/00/item/133666/1/133666164G1.jpg',
        stars: 0,
        totalReviews: 1,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
      }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'Administrador de propuestas - Project Hunter',
    sidebarBackgroundColor: 'rgba(27, 27, 27, 0.74)',
    /* Guests Stuffs */
    guests: [],
    guest: {},
    guestId: '',
    storeGuestSuccess: false,
    updateGuestSuccess: false,
    deleteGuestSuccess: false,
    storeGuestError: false,
    updateGuestError: false,
    deleteGuestError: false,
    /* Reservations Stuffs */
    reservations: [],
    reservation: {},
    clientSelect: false,
    /* Reserved Room Stuffs */
    reservationId: '',
    reservedRoomId: '',
    reservedRoom: {},
    reservedRooms: [],
    reservedRoomIndicator: false,
    searchReservedRoom: '',
    /* Room Stuffs */
    type: '',
    minPrice: '',
    maxPrice: '',
    rooms: [],
    room: {},
    roomId: '',
    filtredRooms: [],
    itemsSmoke: [
      'Sí',
      'No'
    ],
    itemsType: [
      'Simple',
      'Doble',
      'Triple',
      'Matrimonial',
      'Presidencial'
    ],
    /* Checkin */
    showAddGuest: false,
    readonly: true,
    expand: true,
    panel: [ true ]
	},
  mutations: {
    setPagination (state, payload) {
      state.pagination = payload
    },
    _setItems (state, { items, totalItems }) {
      state.items = items
      Vue.set(state.pagination, 'totalItems', totalItems)
    },
    /* General Stuffs */
    updateLoader (state, payload) {
      state.loader = payload
    },
    /* Template Stuffs */
    updateClipped (state, payload) {
      state.clipped = payload
    },
    updateDrawer (state, payload) {
      state.drawer = payload
    },
    updateFixed (state, payload) {
      state.fixed = payload
    },
    updateMiniVariant (state, payload) {
      state.miniVariant = payload
    },
    updateDrawerItems (state, payload) {
      state.drawerItems = payload
    },
    updateRightDrawer (state, payload) {
      state.rightDrawer = payload
    },
    updateRight (state, payload) {
      state.right = payload
    },
    updateTitle (state, payload) {
      state.title = payload
    },
    /* Guests Stuffs */
    /* Encryption */
    encryptGuestId (state, payload) {
      state.guestId = cryptr.encrypt(payload)
    },
    decryptGuestId (state, payload) {
      state.guestId = cryptr.decrypt(payload)
    },
    /* End Encryption */
    updateGuestId (state, payload) {
      state.guestId = payload
    },
    updateGuest (state, payload) {
      state.guest = payload
    },
    updateStoreGuestSuccess (state, payload) {
      state.storeGuestSuccess = payload
    },
    updateUpdateGuestSuccess (state, payload) {
      state.updateGuestSuccess = payload
    },
    updateDeleteGuestSuccess (state, payload) {
      state.deleteGuestSuccess = payload
    },
    updateStoreGuestError (state, payload) {
      state.storeGuestError = payload
    },
    updateUpdateGuestError (state, payload) {
      state.updateGuestError = payload
    },
    updateDeleteGuestError (state, payload) {
      state.deleteGuestError = payload
    },
    /* Reservation Stuffs */
    updateClientSelect (state, payload) {
      state.clientSelect = payload
    },
    updateReservationId (state, payload) {
      state.reservationId = payload
    },
    updateReservations (state, payload) {
      state.reservations = payload
    },
    updateReservation (state, payload) {
      state.reservation = payload
    },
    /* Reservation Room Stuffs */
    updateType (state, payload) {
      state.type = payload
    },
    updateMinPrice (state, payload) {
      state.minPrice = payload
    },
    updateMaxPrice (state, payload) {
      state.maxPrice = payload
    },
    updateDateIni (state, payload) {
      state.dateIni = payload
    },
    updateDateOut (state, payload) {
      state.dateOut = payload
    },
    updateNumber (state, payload) {
      state.number = payload
    },
    updateStatus (state, payload) {
      state.status = payload
    },
    updateRoom (state, payload) {
      state.room = payload
    },
    updateRoomId(state, payload) {
      state.roomId = payload
    },
    updateReservedRoomId (state, payload) {
      state.reservedRoomId = payload
    },
    /* Encryption */
    encryptReservedRoomId (state, payload) {
      state.reservedRoomId = cryptr.encrypt(payload)
    },
    decryptReservedRoomId (state, payload) {
      state.reservedRoomId = cryptr.decrypt(payload)
    },
    /* End Encryption */
    updateReservedRoom (state, payload) {
      state.reservedRoom = payload
    },
    updateReservedRooms (state, payload) {
      state.reservedRooms = payload
    },
    updateSearchReservedRoom (state, payload) {
      state.searchReservedRoom = payload
    },
    updateReservedRoomIndicator (state, payload) {
      state.reservedRoomIndicator = payload
    },
    /* Check-in */
    updateCollapsePanel (state, payload) {
      state.showAddGuest = !payload
      state.readonly = payload
      state.expand = payload
      state.panel = [ payload ]
    },
    updateExpand (state, payload) {
      state.expand = payload
    },
    updatePanel (state, payload) {
      state.panel = payload
    },
    updateReadonly(state, payload) {
      state.readonly = payload
    },
    updateShowAddGuest(state, payload) {
      state.showAddGuest = payload
    },
  },
  actions: {
    async getAllProposals() {
      try {
        await axios
          .get(this.state.serverURL + '/proposals/')
          .then(response => {
            console.log(response)
            console.log(response.data)
            const proposals = response.data
            if (proposals.length != 0) {
              this.state.proposalList = proposals
              console.log(this.state.proposalList)
            } else {
              console.log('No se han encontrado propuestas')
            }
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },

    // DESDE ACÁ CÓDIGO ANTIGUO

    queryItems (context) {
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = context.state.pagination
        setTimeout(() => {/* Filtro de reservas según nombre del reservante */
          let items = this.state.reservedRooms.filter(reservedRoom => {
            return (reservedRoom.dateIni != null)
          })
          items = items.filter(reservedRoom => {
            return (reservedRoom.reservation.guest.firstName.toLowerCase() + ' ' + reservedRoom.reservation.guest.lastName.toLowerCase()).includes(this.state.searchReservedRoom.toLowerCase())
          })
          const totalItems = items.length
          if (sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]
              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }
          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }
          context.commit('_setItems', { items, totalItems })
          resolve()
        }, 1000)
      })
    },
    /* Rutas */
    goBack ({ commit }) {
      commit('updateLoader', true)
      router.go(-1)
      commit('updateLoader', false)
    },
    goAhead ({ commit }) {
      commit('updateLoader', true)
      router.go(1)
      commit('updateLoader', false)
    },
    /* Guests Stuffs */
    /* Guest.index */
    async getGuests ({ commit, dispatch }) {
      try {
        commit('updateLoader', true)
        await axios
          .get(this.state.serverURL + '/guests/')
          .then(response => {
            const guests = response.data
            if (guests.length != 0) {
              commit('updateLoader', false)
              this.state.guests = guests
            }
            else {
              console.log('No hay huéspedes alojándose.')
            }
          })
          .catch(e => {
            console.log(e)
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
    /*  Guest.show */
    async getGuest ({ commit }) {
      try {
        commit('updateLoader', true)
        await axios
          .get(this.state.serverURL + `/guests/${this.state.guestId}`)
          .then(response => {
            const guest = response.data
            if (guest.length != 0) {
              commit('updateLoader', false)
              this.state.guest = {
                firstName: guest.firstName,
                lastName: guest.lastName,
                email: guest.email,
              }
            }
            else {
              console.log('No hay huéspedes o no se puede acceder a ellos')
            }
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
    /* Guest.store */
    storeGuest ({ commit, dispatch }, isReservation) {
      commit('updateLoader', true)
      try {
        axios
          .post(this.state.serverURL + '/guests/create', this.state.guest)
          .then(response => {
            console.log(response)
            this.state.guest = response.data
            commit('updateLoader', false)
            console.log('El huésped ha sido creado con éxito')
            if (!isReservation) {
              commit('updateStoreGuestSuccess', true)
              router.push({ name: 'guests' })
              dispatch('getGuests')
              this.state.guest = {}
            }
            else {
              commit('updateStoreGuestSuccess', true)
              router.push({ name: 'reservations_room', params: { id: this.state.guest.id } })
              this.state.guest = {}
              dispatch('getGuests')
            }
          })
          .catch(e => {
            commit('updateStoreGuestError', true)
            console.log(e.response);
          })
      } catch (error) {
        commit('updateStoreGuestError', true)
        this.guest = ''
        console.log(error)
      }
    },
    /* Guest.update */
    async updateGuest ({ commit }) {
      commit('updateLoader', true)
      try {
        axios
          .put(this.state.serverURL + `/guests/edit/${this.state.guestId}`, this.state.guest)
          .then(response => {
            commit('updateLoader', false)
            commit('updateUpdateGuestSuccess', true)
            router.push({ name: 'guests' });
            console.log('El huésped ha sido actualizado.')
          })
          .catch(e => {
            commit('updateUpdateGuestError', true)
            console.log(e)
          })
      } catch (error) {
        commit('updateUpdateGuestError', true)
        console.log(error)
      }
    },
    /* Guest.delete */
    async deleteGuest ({ commit, dispatch }, payload) {
      commit('updateLoader', true)
      try {
        await axios
          .delete(this.state.serverURL + `/guests/delete/${payload.id}`)
          .then(response => {
            commit('updateLoader', false)
            commit('updateDeleteGuestSuccess', true)
            console.log('El huésped ha sido eliminado con éxito.')
            dispatch('getGuests')
          })
          .catch(e => {
            commit('updateDeleteGuestError', true)
            dispatch('getGuests')
            console.log(e.response)
          })
      } catch (error) {
        commit('updateDeleteGuestError', true);
        commit('getGuests')
        console.log(error)
      }
    },
    /* Reservation.index */
    async getReservations ({ commit }) {
      try {
        commit('updateLoader', true)
        await axios
          .get(this.state.serverURL + '/reservations/')
          .then(response => {
            const reservations = response.data
            if (reservations.length != 0) {
              commit('updateLoader', false)
              this.state.reservations = reservations
            }
            else {
              console.log('No hay reservas.')
            }
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async storeReservation ({ commit }) {
      commit('updateLoader', true)
      try {
        await axios
          .post(this.state.serverURL + `/reservations/create/${this.state.guest.id}`, this.state.reservation)
          .then(response => {
            const newReservation = response.data
            router.push({ name: 'reservations_room', params: { id: newReservation.id } })
            this.state.reservation = {}
            commit('updateLoader', false)
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        this.state.reservation = ''
        console.log(error)
      }
    },
    /* Reserved Room Stuffs*/ 
    /*  ReservedRooms.index */
    async getReservedRooms () {
      try {
        await axios
          .get(this.state.serverURL + '/reservedRooms/')
          .then(response => {
            const reservedRooms = response.data
            if (reservedRooms.length != 0) {
              this.state.reservedRooms = reservedRooms
            }
            else {
              console.log('No hay reservación de habitaciones o no se puede acceder a ellas');
            }
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
    /* ReservedRoom.show */
    getReservedRoom ({ commit, dispatch }) {
      try {
        commit('updateLoader', true);
        axios
          .get(this.state.serverURL + `/reservedRooms/${this.state.reservedRoomId}`)
          .then(response => {
            const reservedRoom = response.data
            if (reservedRoom.length != 0) {
              this.state.reservedRoom = reservedRoom
              this.state.roomId = reservedRoom.room.id
              dispatch('getRoom')
              commit('updateLoader', false)
            }
            else {
              console.log('No hay reservación de habitaciones o no se puede acceder a ellas');
            }
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
    /* ReservedRoom.store */
    async storeReservedRoom () {
       try {
        await axios
          .post(this.state.serverURL + `/reservedRooms/create/${this.state.reservationId}`, this.state.reservedRoom)
          .then(response => {
            if (this.state.reservedRoomIndicator){
              this.state.reservedRoom = {}
              this.state.type = ''
              this.state.minPrice = ''
              this.state.maxPrice = ''
              router.push({ name: 'home' })
            }
            else {
              this.state.reservedRoom = {}
              this.state.type = ''
              this.state.minPrice = ''
              this.state.maxPrice = ''
            }
          })
          .catch(e => {
            this.state.reservedRoom = {}
            this.state.type = ''
            this.state.minPrice = ''
            this.state.maxPrice = ''
            console.log(e);
            console.log(e.response)
          })
      } catch (error) {
        this.state.reservedRoom = {};
        console.log(error)
      }
    },
    async updateReservedRoom ({ commit }) {
      commit('updateLoader', true)
      try {
        axios
          .put(this.state.serverURL + `/reservedRooms/edit/${this.state.reservedRoomId}`, this.state.reservedRoom)
          .then(response => {
            commit('updateLoader', false)
            console.log('La habitación reservada ha sido actualizada.')
          })
          .catch(e => {
            console.log(e)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async updateHostedAt ({ commit, dispatch }) {
      commit('updateLoader', true)
      try {
        axios
          .post(this.state.serverURL + `/reservedRooms/match/${this.state.reservedRoomId}/guest/${this.state.guestId}`)
          .then(response => {
            commit('updateLoader', false)
            dispatch('getReservedRoom')
            console.log('El huésped ha sido agregado a la habitación exitosamente')
          })
          .catch(e => {
            console.log(e)
          })
      } catch (error) {
        console.log(error)
      }
    },
    /* Guest.delete */
    async deleteHostedAt({ commit, dispatch }) {
      commit('updateLoader', true)
      try {
        await axios
          .post(this.state.serverURL + `/reservedRooms/dematch/${this.state.reservedRoomId}/guest/${this.state.guestId}`)
          .then(response => {
            commit('updateLoader', false)
            dispatch('getReservedRoom')
            console.log('El huésped ha sido eliminado de la habitación exitosamente')
          })
          .catch(e => {
            console.log(e)
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
    /* Room Stuffs */
    async getRooms () {
      try {
        await axios
          .get(this.state.serverURL + '/rooms/')
          .then(response => {
            const rooms = response.data
            if (rooms.length != 0) {
              this.state.rooms = rooms
            }
            else {
              console.log('No se han encontrado habitaciones')
            }
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async getRoom({ commit }) {
      commit('updateLoader', true)
      try {
        await axios
          .get(this.state.serverURL + `/rooms/${this.state.roomId}`)
          .then(response => {
            const room = response.data
            if (room.length != 0) {
              this.state.room = room
            }
            else {
              console.log('No se han encontrado la habitación')
            }
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async filter () {
      try {
        await axios
          .get(this.state.serverURL + `/rooms/description/${this.state.type}/price/${this.state.minPrice}/${this.state.maxPrice}/date/${this.state.reservedRoom.dateIni}/${this.state.reservedRoom.dateOut}`, this.state.filter)
          .then(response => {
            const filtredRooms = response.data
            if (filtredRooms.length != 0) {
              this.state.filtredRooms = filtredRooms
            }
            else {
              console.log('No hay habitaciones')
            }
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {
    loading (state) {
      return state.loading
    },
    pagination (state) {
      return state.pagination
    },
    items (state) {
      return state.items
    }
  }
})
