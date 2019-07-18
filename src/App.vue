<template>
  <v-app id="app" v-if="this.logueado === 'si'">
      <home-leftDrawer/>
      <home-toolbar/>
      <v-content>
        <v-container>
          <router-view/>
        </v-container>
      </v-content>
      <home-drawer/>
      <home-footer/>
    </v-app> 
    <v-app id="app" v-else>
      <v-content>
        <v-container>
          <login/>
        </v-container>
      </v-content>
    </v-app> 
</template>

<script>

import Toolbar from '@/components/home/toolbar'
import LeftDrawer from '@/components/home/leftDrawer'
import Drawer from '@/components/home/drawer'
import Footer from '@/components/home/footer'
import Login from '@/views/Login.vue'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    'home-toolbar': Toolbar,
    'home-leftDrawer': LeftDrawer,
    'home-drawer': Drawer,
    'home-footer': Footer,
    'login': Login
  },
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapState([
      'logueado'
    ])
  }
}
</script>