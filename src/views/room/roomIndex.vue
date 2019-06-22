<template>
  <div id="room-index">
    <v-container>
      <!-- <room-store/>
      <v-divider></v-divider> -->
      <room-show class="mt-5"></room-show>
    </v-container>
  </div>
</template>

<script>  

import { mapState, mapActions } from 'vuex'
import RoomShow from '@/components/room/roomShow'
import RoomStore from '@/components/room/roomStore'

export default {
  name: 'room-index',
  components: {
    'room-show': RoomShow,
    'room-store': RoomStore
  },
  data () {
    return {
      //
    }
  },
  created() {
    this.getRooms();
  },
  methods: {
    ...mapActions([
      'getRooms',
    ]),
  },
}
</script>