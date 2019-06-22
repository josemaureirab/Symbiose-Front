<template>
  <v-footer dark :fixed="fixed" app>
    <span class="ml-3">RedGroup&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'admin-footer',
  computed: {
    ...mapState([
      'fixed',
    ]),
    fixed: {
      get () {
        return this.$store.state.fixed;
      },
      set (payload) {
        this.$store.commit('updateMiniFixed', payload)
      }
    },
  },
}
</script>

<style>

</style>
