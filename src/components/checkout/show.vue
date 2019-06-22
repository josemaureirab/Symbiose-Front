<template>
  <div>
    <v-container fluid>
    <form>
        <v-autocomplete
            label="Selecciona al cliente"
            :items="filteredReservedRooms"
            v-model="reservedRoom"
            item-text="`${data.item.room.number}, ${data.item.reservation.guest.firstName + ' ' + data.item.reservation.guest.lastName}`"
            item-value="`${data.item}`"
            :menu-props="{maxHeight:'auto'}"
            no-data-text="No se encuentran habitaciones reservadas"
          >
            <template slot="selection" slot-scope="data" v-show="!data.item.dateIni === null">
              {{data.item.room.number}}, {{data.item.reservation.guest.firstName + ' ' + data.item.reservation.guest.lastName}}
            </template>
            <template slot="item" slot-scope="data">
              <v-list-tile-content>
                <v-list-tile-title v-html="`${data.item.room.number}, ${data.item.reservation.guest.firstName + ' ' + data.item.reservation.guest.lastName}`">
                </v-list-tile-title>
              </v-list-tile-content>
            </template>
          </v-autocomplete>
           
      </form>
    <checkout-info v-if="reservedRoom != null"/>
    </v-container>
  </div>        
</template>

<script>

import CheckoutInfo from '@/components/checkout/info'
import { mapActions, mapState } from 'vuex';

export default {
  name: 'checkout-show',
  components: {
    'checkout-info': CheckoutInfo,
  },
  data () {
    return {

    }
  },
  created() {

  },
	methods: {

  },
  computed: {
    ...mapState([
      'reservedRoom',
      'reservedRooms'
    ]),
    filteredReservedRooms () {
      if(this.reservedRooms != null){
        const filteredReservedRooms = this.reservedRooms.filter(reservedRoom => {
          return (reservedRoom.dateIni != null)
        })
        return filteredReservedRooms
      }
    },
    reservedRoom: {
      get () {
        return this.$store.state.reservedRoom;
      },
      set (payload) {
        this.$store.commit('updateReservedRoom', payload)
      }
    },
    reservedRooms: {
      get () {
        return this.$store.state.reservedRooms;
      },
      set (payload) {
        this.$store.commit('updateReservedRooms', payload)
      }
    },
  }	
}
</script>