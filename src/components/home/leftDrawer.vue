<template>
  <v-navigation-drawer
  id="app-drawer"
  app
  dark
  floating
  persistent
  mobile-break-point="991"
  width="300"
  :mini-variant.sync="miniVariant"
  :clipped="clipped"
  v-model="drawer"
  fixed
  >
    <v-img
      :src="image"
      :gradient="sidebarOverlayGradiant"
      height="100%"
    >
      <v-layout
        class="fill-height"
        column
      >
        <v-list>
          <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-avatar color="#00acac">
              <v-icon dark>account_circle</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title class="ml-3 title">
            {{userName}}
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-if="responsive"
        >
          
        </v-list-tile>
        <v-list-tile
          v-for="(item, i) in drawerItems"
          :key="i"
          :to="item.to"
          :active-class="color"
          avatar
          class="v-list-item"
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="item.title"
          />
        </v-list-tile>
        </v-list>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'admin-leftDrawer',
  data() {
    return {
      color: 'warning',
      image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
      responsive: false,
      usuarioActual: ""
    }
  },
  created() {
    //this.usuarioActual = this.userName;
    //console.log(this.usuarioActual)
    //console.log("hola")
  },
  computed: {
    ...mapState([
      'miniVariant',
      'clipped',
      'drawer',
      'drawerItems',
      'userName'
    ]),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (payload) {
        this.setDrawer(payload)
      }
    },
    sidebarOverlayGradiant () {
      return `${this.$store.state.sidebarBackgroundColor}, ${this.$store.state.sidebarBackgroundColor}`
    },
    user: {
      get () {
        return this.$store.state.userName;
      }
    },
    miniVariant: {
      get () {
        return this.$store.state.miniVariant;
      },
      set (payload) {
        this.$store.commit('updateMiniVariant', payload)
      }
    },
    clipped: {
      get () {
        return this.$store.state.clipped;
      },
      set (payload) {
        this.$store.commit('updateClipped', payload)
      }
    },
    drawer: {
      get () {
        return this.$store.state.drawer;
      },
      set (payload) {
        this.$store.commit('updateDrawer', payload)
      }
    },
    drawerItems: {
      get () {
        return this.$store.state.drawerItems;
      },
      set (payload) {
        this.$store.commit('updateDrawerItems', payload)
      }
    },
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
    this.usuarioActual=this.$store.state.user
  },
  methods: {
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },

  }
}
</script>

<style lang="scss">
  #app-drawer {
    a:hover{
      color: black;
      background-color: #01acac !important;
    }
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }

    div.v-responsive.v-image > div.v-responsive__content {
      overflow-y: auto;
    }
  }
</style>
