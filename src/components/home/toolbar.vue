<template>
  <v-toolbar id="core-toolbar" dark fixed app flat prominent :clipped-left="clipped">
    <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
    <v-btn
      icon
      @click.stop="miniVariant = !miniVariant"
    >
      <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
    </v-btn>
    <v-btn
      icon
      @click.stop="clipped = !clipped"
    >
      <v-icon>web</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <!-- <v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          label="Buscar..."
          hide-details
          color="purple"
        /> -->
        <!-- <router-link
          v-ripple
          class="toolbar-items"
          to="/"
        >
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </router-link> -->
        <!-- <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition">
          <router-link
            v-ripple
            slot="activator"
            class="toolbar-items"
            to="/admin/notifications"
          >
            <v-badge
              color="error"
              overlap
            >
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </router-link>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title
                  v-text="notification"
                />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu> -->
        <!-- <router-link
          v-ripple
          class="toolbar-items"
          to="/admin/user-profile"
        >
          <v-icon color="tertiary">mdi-account</v-icon>
        </router-link> -->
      </v-flex>
    </v-toolbar-items>
    <!-- <v-btn
      icon
      @click.stop="rightDrawer = !rightDrawer"
    >
      <v-icon>menu</v-icon>
    </v-btn> -->
  </v-toolbar>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'admin-toolbar',
  data() {
    return {
      notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
      ],
      responsive: false,
      responsiveInput: false
    }
  },
  computed: {
    ...mapState([
      'miniVariant',
      'rightDrawer',
      'clipped',
      'drawer',
      'title',
      'fixed'
    ]),
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
    rightDrawer: {
      get () {
        return this.$store.state.rightDrawer;
      },
      set (payload) {
        this.$store.commit('updateRightDrawer', payload)
      }
    },
    title: {
      get () {
        return this.$store.state.title;
      },
      set (payload) {
        this.$store.commit('updateTitle', payload)
      }
    },
    fixed: {
      get () {
        return this.$store.state.fixed;
      },
      set (payload) {
        this.$store.commit('updateFixed', payload)
      }
    },
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
