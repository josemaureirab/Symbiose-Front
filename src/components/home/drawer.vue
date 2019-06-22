<template>
  <v-navigation-drawer
    temporary
    :right="right"
    v-model="rightDrawer"
    fixed
  >
    <v-list>
      <v-list-tile @click.native="right = !right">
        <v-list-tile-action>
          <v-icon light>compare_arrows</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'admin-drawer',
  computed: {
    ...mapState([
      'rightDrawer',
      'right',
    ]),
    rightDrawer: {
      get () {
        return this.$store.state.rightDrawer;
      },
      set (payload) {
        this.$store.commit('updateRightDrawer', payload)
      }
    },
    right: {
      get () {
        return this.$store.state.right;
      },
      set (payload) {
        this.$store.commit('updateRight', payload)
      }
    },
  },
}
</script>

<style>

</style>
