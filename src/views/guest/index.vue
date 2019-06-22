<template>
  <div id="guest-index">
    <v-container>
      <guest-store :guests="this.guests" :isReservation="false"/>
      <v-divider></v-divider>
      <guest-show class="mt-5" :guests="this.guests"></guest-show>
    </v-container>
  </div>
</template>

<script>

import GuestShow from '@/components/guest/show'
import GuestStore from '@/components/guest/store'
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'guest-index',
  components: {
    'guest-show': GuestShow,
    'guest-store': GuestStore,
  },
  data() {
    return {
      //
    }
  },
  created() {
    this.getGuests();
    this.updateClientSelect(false);
  },
  computed: {
    ...mapState([
      'guests',
    ]),
  },
  methods: {
    ...mapActions([
      'getGuests',
    ]),
    ...mapMutations([
      'updateClientSelect',
    ]),
  },
}
</script>