<template>
  <div id="checkin-collapse">
    <v-layout align-center justify-end fill-height class="mb-3">
      <v-flex xs12 sm6 md3 order-md4 order-sm2>
        <v-btn class="goBackButton" color="info" block :loading="loader" @click="goBack">
          Volver
          <v-icon dark>arrow_back</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-expansion-panel v-model="panel" :readonly="readonly" :expand="expand" dark v-if="reservedRoom.reservation">
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Reservación a nombre de: {{ reservedRoom.reservation.guest.firstName + ' ' + reservedRoom.reservation.guest.lastName }}</div>
          <div>Tipo de habitación: {{ getRoomType }}</div>
          <div>Estado de check-in: {{ getCheckinStatus }}</div>
          <v-btn v-show="isChecked()" color="success" round @click="editReservedRoom">
            Check-in
            <v-icon dark class="ml-2">playlist_add_check</v-icon>
          </v-btn>
          <v-btn v-show="!isChecked()" color="warning" round @click="editReservedRoom">
            Editar Check-in
            <v-icon dark class="ml-3">edit</v-icon>
          </v-btn>
        </template>
        <v-card> 
          <v-layout align-center justify-space-around row fill-height>
            <v-flex>
              <v-card-text class="lighten-3">Nombre: {{ reservedRoom.reservation.guest.firstName + ' ' + reservedRoom.reservation.guest.lastName }}</v-card-text>
            </v-flex>
            <v-flex>
              <v-card-text class="lighten-3">Fecha de nacimiento: {{ reservedRoom.reservation.guest.birthDate }}</v-card-text>
            </v-flex>
            <v-flex v-show="confirmButton">
              <v-card-text class="lighten-3">
                <v-btn color="success" :disabled="!isChecked()" block v-on:click="confirmReserverGuest(reservedRoom.reservation.guest.id)">
                  Confirmar
                  <v-icon dark class="ml-1">done</v-icon>
                </v-btn>
              </v-card-text>
            </v-flex>
            <v-flex v-show="!confirmButton">
              <v-card-text class="lighten-3">
                <v-btn color="red" :disabled="!isChecked()" block @click="unconfirmReserverGuest(reservedRoom.reservation.guest.id)">
                  Quitar
                  <v-icon dark>delete</v-icon>
                </v-btn>
              </v-card-text>
            </v-flex>
          </v-layout>

          <!-- Guests en la tabla intermedia -->
          <div v-for="guest in reservedRoom.guestSet" :key="guest.id">
            <v-layout align-center justify-space-around row fill-height v-show="compareGuest(guest.id)">
              <v-flex>
                <v-card-text class="lighten-3">Nombre: {{ guest.firstName + ' ' + guest.lastName }}</v-card-text>
              </v-flex>
              <v-flex>
                <v-card-text class="lighten-3">Fecha de nacimiento: {{ guest.birthDate }}</v-card-text>
              </v-flex>
              <v-flex>
                <v-card-text class="lighten-3">
                  <v-btn color="red" :disabled="!isChecked()" block @click="deleteGuestFromRoom(guest.id)">
                    Quitar
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </v-card-text>
              </v-flex>
            </v-layout>
          </div>

          <v-card-text class="lighten-3">
            <v-btn color="success" :disabled="!shouldAddGuest()" block @click="addNewGuest">
              Agregar un nuevo huésped
              <v-icon dark class="ml-2">person_add</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <guest-store v-show="showAddGuest" :isReservation="false" :isCheckin="true"/>
    <reservation-store v-show="showAddGuest" :isCheckin="true"/>
  </div>
</template>

<script>

import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import GuestStore from '@/components/guest/store'
import ReservationStore from '@/components/reservation/store'

export default {
  name: 'checkin-collapse',
  components: {
    'guest-store': GuestStore,
    'reservation-store': ReservationStore
  },
  data() {
    return {
      checkinStatusString: '',
      addGuestButton: true,
      checkinStatus: true,
      checkinButton: true,
      confirmButton: true,
      guestCounter: 0
    }
  },
  created () {
    /* Restarting Variables */
    this.checkinStatusString = ''
    this.addGuestButton = true
    this.checkinStatus = true
    this.checkinButton = true
    this.confirmButton = true
    this.guestCounter = 0
    this.reservedRoom = {}
    this.reservedRoomId = ''
    this.room = {}
    this.roomId = ''
    this.guestId = ''
    this.showAddGuest = false
    this.readonly = true
    this.expand = true
    this.panel = [ true ]
    this.$store.commit('decryptReservedRoomId', this.$route.params.id)
    this.getReservedRoom(this.reservedRoomId)
  },
  methods: {
    ...mapActions([
      'getReservedRoom',
      'updateReservedRoom',
      'updateHostedAt',
      'deleteHostedAt',
      'getRoom',
      'goBack'
    ]),
    editReservedRoom () {
      if (this.checkinButton) {
        this.reservedRoom.checkIn = moment().format("YYYY-MM-DD")
        this.updateReservedRoom()
        this.checkinButton = !this.checkinButton
      }
      else {
        this.checkinButton = !this.checkinButton
      }
    },
    confirmReserverGuest (payload) {
      this.guestId = payload
      if (this.confirmButton) {
        this.updateHostedAt()
        this.confirmButton = false
      }
      else {
        this.updateHostedAt();
        this.confirmButton = true
      }
    },
    unconfirmReserverGuest (payload) {
      this.guestId = payload
      if (this.confirmButton) {
        this.deleteHostedAt()
        this.confirmButton = true
      }
      else {
        this.deleteHostedAt();
        this.confirmButton = false
      }
    },
    deleteGuestFromRoom (payload) {
      this.guestId = payload
      this.deleteHostedAt()
    },
    compareGuest (payload) {
      if (this.reservedRoom.reservation.guest.id === payload) {
        return false
      }
      else {
        return true
      }
    },
    addNewGuest () {
      this.$store.commit('updateCollapsePanel', false)
    },
    isChecked () {
      console.log(!this.checkinButton);
      console.log(this.checkinStatus);
      console.log((!this.checkinButton && this.checkinStatus));
      if (!this.checkinButton && this.checkinStatus) {
        return true
      }
      else if(!this.checkinButton === false && this.checkinStatus === false) {
        return true
      }
      else {
        return false
      }
    },
    shouldAddGuest () {
      this.maxByRoomType()
      if ((!this.checkinButton && this.checkinStatus) && this.addGuestButton) {
        return true
      }
      else {
        return false
      }
    },
    maxByRoomType () {
      if(this.room != null && this.room.roomType != null) {
        this.getGuestCounter
        /* Matrimonial */
        if(this.room.roomType.id === 15) {
          if (this.guestCounter === 2) {
            this.addGuestButton = false
          }
          else {
            this.addGuestButton = true
          }
        }
        /* Presidencial */
        else if(this.room.roomType.id === 16) {
          if (this.guestCounter === 4) {
            this.addGuestButton = false
          }
          else {
            this.addGuestButton = true
          }
        }
        /* Triple */
        else if(this.room.roomType.id === 14){
          if (this.guestCounter === 3) {
            this.addGuestButton = false
          }
          else {
            this.addGuestButton = true
          }
        }
        /* Doble */
        else if(this.room.roomType.id === 13){
          if (this.guestCounter === 2) {
            this.addGuestButton = false
          }
          else {
            this.addGuestButton = true
          }
        }
        /* Simple */
        else if(this.room.roomType.id === 12){
          if (this.guestCounter === 1) {
            this.addGuestButton = false
          }
          else {
            this.addGuestButton = true
          }
        }
        else {
          this.addGuestButton = true
        }
      }
    },
    confirmReserverGuestInRoom () {
      let reserverGuest = this.reservedRoom.guestSet.filter(guest => {
            return (this.reservedRoom.reservation.guest.id === guest.id)
          })
      if(reserverGuest.length != 0){
        this.confirmButton = false
      }
      else {
        this.confirmButton = true
      }
    },
  },
  computed: {
    ...mapState([
      'loader',
      'reservedRoom',
      'reservedRoomId',
      'room',
      'roomId',
      'guestId',
      'showAddGuest',
      'readonly',
      'expand',
      'panel'
    ]),
    getGuestCounter () {
      this.guestCounter = 0
      this.reservedRoom.guestSet.forEach(guest => {
        this.guestCounter++        
      });
    },
    getCheckinStatus () {
      this.confirmReserverGuestInRoom()
      if(this.reservedRoom.checkIn === null) {
        this.checkinStatus = false
        return this.checkinStatusString = 'No realizado'
      }
      else {
        this.checkinStatus = true
        return this.checkinStatusString = 'Realizado'
      }
    },
    getRoomType() {
      if(this.room != null && this.room.roomType != null) {
        /* Matrimonial */
        if(this.room.roomType.id === 15) {
          return 'Matrimonial (2)'
        }
        /* Presidencial */
        else if(this.room.roomType.id === 16) {
          return 'Presidencial (4)'
        }
        /* Triple */
        else if(this.room.roomType.id === 14){
          return 'Triple (3)'
        }
        /* Doble */
        else if(this.room.roomType.id === 13){
          return 'Doble (2)'
        }
        /* Simple */
        else if(this.room.roomType.id === 12){
          return 'Simple (1)'
        }
        else {
          return 'Ha ocurrido un error'
        }
      }
    },
    guestId: {
      get () {
        return this.$store.state.guestId
      },
      set (payload) {
        this.$store.commit('updateGuestId', payload)
      }
    },
    room: {
      get () {
        return this.$store.state.room
      },
      set (payload) {
        this.$store.commit('updateRoom', payload)
      }
    },
    roomId: {
      get () {
        return this.$store.state.roomId
      },
      set (payload) {
        this.$store.commit('updateRoomId', payload)
      }
    },
    readonly: {
      get () {
        return this.$store.state.readonly
      },
      set (payload) {
        this.$store.commit('updateReadonly', payload)
      }
    },
    panel: {
      get () {
        return this.$store.state.panel
      },
      set (payload) {
        this.$store.commit('updatePanel', payload)
      }
    },
    reservedRoom: {
      get () {
        return this.$store.state.reservedRoom
      },
      set (payload) {
        this.$store.commit('updateReservedRoom', payload)
      }
    },
    reservedRoomId: {
      get () {
        return this.$store.state.reservedRoomId
      },
      set (payload) {
        this.$store.commit('updateReservedRoomId', payload)
      }
    },
    showAddGuest: {
      get () {
        return this.$store.state.showAddGuest
      },
      set (payload) {
        this.$store.commit('updateShowAddGuest', payload)
      }
    },
    expand: {
      get () {
        return this.$store.state.expand
      },
      set (payload) {
        this.$store.commit('updateExpand', payload)
      }
    },
  },
}
</script>
