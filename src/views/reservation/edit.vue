<template>
  <div id="reservation-edit">
    <v-container>
      <reservation-store/>
    </v-container>
  </div>
</template>

<script>

import ReservationStore from '@/components/reservation/store'

export default {
  name: 'reservation-edit',
    components: {
      'reservation-store': ReservationStore,
    },
    data() {
      return {
        
      }
    },
}
</script>