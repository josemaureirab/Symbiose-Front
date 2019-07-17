<template>
  <v-card>
    <v-snackbar
      v-model="storeGuestSuccess"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Cerrar <i class="ml-2 fas fa-times"></i>
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: ['text', 'color', 'timeout'],
  data() {
    return {
      mode: '',
    }
  },
  computed: {
    ...mapState([
      'storeGuestSuccess'
    ]),
    storeGuestSuccess: {
      get () {
        return this.$store.state.storeGuestSuccess;
      },
      set (payload) {
        this.$store.commit('updateStoreGuestSuccess', payload)
      }
    },
  },
}
</script>

<style>
  .fas {
    font-size: 16px;
  }
</style>
