<template>
  <v-container fluid grid-list-md>
    <v-card v-if="reservedRoom != null || reservedRoom != ''">
      <v-card-title><h4>Recibo</h4></v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Nº Habitación:</v-list-tile-content>
          <v-list-tile-content class="align-end" v-if="reservedRoom.room != null">{{ reservedRoom.room.number }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Nombre Reservante:</v-list-tile-content>
          <v-list-tile-content class="align-end" v-if="reservedRoom.reservation != null">{{ reservedRoom.reservation.guest.firstName + ' ' + reservedRoom.reservation.guest.lastName }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Costo Habitación:</v-list-tile-content>
          <v-list-tile-content class="align-end" v-if="reservedRoom.reservation != null">{{ reservedRoom.reservation.price }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Costo Servicios:</v-list-tile-content>
          <v-list-tile-content class="align-end"></v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'checkout-info',
	data(){
		return{

    }
  },
  computed: {
    ...mapState([
      'reservedRoom',
    ]),
    reservedRoom: {
      get () {
        return this.$store.state.reservedRoom;
      },
      set (payload) {
        this.$store.commit('updateReservedRoom', payload)
      }
    },
  },
}
</script>
