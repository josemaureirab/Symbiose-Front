<template>
  <div id="room-edit">
    <v-container>
      <room-update/>
    </v-container>
  </div>
</template>

<script>

import RoomUpdate from '@/components/room/roomUpdate'

export default {
  name: 'room-edit',
    components: {
			'room-update': RoomUpdate,
    },
    data() {
      return {
        
      }
    },
}

</script>