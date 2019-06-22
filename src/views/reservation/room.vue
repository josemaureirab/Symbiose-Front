<template>
  <div id="reservation-room">
    <v-container>
      <room-reservation/>
    </v-container>
  </div>
</template>

<script>

import RoomReservation from '@/components/reservation/roomReservation'

export default {
  name: 'reservation-room',
    components: {
      'room-reservation': RoomReservation,
    },
    data() {
      return {
        //
      }
    },
}
</script>