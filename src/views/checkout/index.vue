<template>
  <v-container>
    <checkout-show/>
  </v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import CheckoutShow from '@/components/checkout/show'

export default {
  name: 'checkout-index',
  components: {
    'checkout-show': CheckoutShow,
  },
  created() {
    this.getReservedRooms();
  },
  methods: {
    ...mapActions([
      'getReservedRooms'
    ]),
  },
  computed: {

  }
}

</script>

<style>

</style>
