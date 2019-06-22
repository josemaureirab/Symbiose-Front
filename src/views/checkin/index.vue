<template>
  <v-container>
    <checkin-show/>
  </v-container>
</template>

<script>

import CheckinShow from '@/components/checkin/show'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'checkin-index',
  components: {
    'checkin-show': CheckinShow,
  },
  created() {
    this.getReservedRooms();
  },
  computed: {
    ...mapState([
      'reservedRooms',
    ]),
  },
  methods: {
    ...mapActions([
      'getReservedRooms'
    ]),
  },
}
</script>

<style>

</style>
