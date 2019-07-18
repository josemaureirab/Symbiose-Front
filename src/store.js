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
    logueado :'no',
    /* General Stuffs */
    serverURL: 'http://localhost:9000',
    //serverURL: 'http://projecthunter.tk:8080/symbiose',
    proposalList: [],
    clientsList: [],
    usersList: [],
    proposalId: {},
    proposalIdStr: "",
    proposal: {},
    client: {},
    user: {},
    loader: false,
    /* Template Stuffs */
    clipped: false,
    drawer: true,
    fixed: false,
    drawerItems: [
      {icon: 'mdi-clipboard-outline', title: 'Propuestas', to: '/' },
      { icon: 'mdi-account', title: 'Usuarios', to: '/users' },
      { icon: 'fas fa-mug-hot', title: 'Clientes', to: '/clients' },
      { icon: 'fas fa-plus-square', title: 'Agregar Propuesta', to: '/createProposal' }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'Administrador de propuestas - Project Hunter',
    sidebarBackgroundColor: 'rgba(27, 27, 27, 0.74)'
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
    updateProposalId(state, payload) {
      state.proposalId = payload
    },
    updateLogueado(state, payload) {
      state.logueado = payload
    },
    updateUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async getAllProposals() {
      try {
        await axios
          .get(this.state.serverURL + '/proposals/')
          .then(response => {
            //console.log(response)
            //console.log(response.data)
            const proposals = response.data
            if (proposals.length != 0) {
              this.state.proposalList = proposals
              var proplist = this.state.proposalList;
              //console.log(proplist)
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
    async getAllClients() {
      try {
        await axios
          .get(this.state.serverURL + '/clients/')
          .then(response => {
            //console.log(response)
            //console.log(response.data)
            const clients = response.data
            if (clients.length != 0) {
              this.state.clientsList = clients
            } else {
              console.log('No se han encontrado clientes')
            }
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async getAllUsers() {
      try {
        await axios
          .get(this.state.serverURL + '/users/')
          .then(response => {
            //console.log(response)
            //console.log(response.data)
            const users = response.data
            if (users.length != 0) {
              this.state.usersList = users
            } else {
              console.log('No se han encontrado usuarios')
            }
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
      async createProposal() {
      try {
        await axios
          .get(this.state.serverURL + '/proposals/create')
          .then(response => {
              this.state.proposal = response.data
              console.log("create proposal")
              console.log(response.data)
          })
          .catch(e => {
            console.log(e.response)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async getProposal() {
      try {
        await axios
          .get(this.state.serverURL + `/proposals/${this.state.proposalId}`)
          .then(response => {
            var proposal = response.data;
            if (proposal.length != 0) {
              this.state.proposal = proposal
            } else {
              console.log('No hay productos o no se puede acceder a ellos');
            }
          })
          .catch(e => {
            //console.log(e.response);
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
