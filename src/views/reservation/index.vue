<template>
  <div id="reservation-index">
    <v-container>
      <guest-store :isReservation="true"/>
      <reservation-store v-if="clientSelect"/>
    </v-container>
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex'
import GuestStore from '@/components/guest/store'
import ReservationStore from '@/components/reservation/store'

export default {
  name: 'reservation-index',
  components: {
    'guest-store': GuestStore,
    'reservation-store': ReservationStore
  },
  data () {
    return {
      //
    }
  },
  created () {
    this.getGuests()
    this.updateClientSelect(false)
  },
  computed: {
    ...mapState([
      'clientSelect',
      'guests'
    ]),
  },
  methods: {
  ...mapActions([
    'getGuests'
    ]),
  ...mapMutations([
    'updateClientSelect'
    ])
  }
}
</script>