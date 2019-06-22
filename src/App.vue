<template>
  <v-app id="app">
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
</template>

<script>

import Toolbar from '@/components/home/toolbar'
import LeftDrawer from '@/components/home/leftDrawer'
import Drawer from '@/components/home/drawer'
import Footer from '@/components/home/footer'

export default {
  name: 'App',
  components: {
    'home-toolbar': Toolbar,
    'home-leftDrawer': LeftDrawer,
    'home-drawer': Drawer,
    'home-footer': Footer,
  },
  data () {
    return {
      //
    }
  }
}
</script>