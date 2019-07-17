<template>
  <div id="home">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="user in usersList" :key="user.firstName" sm12 xs12 lg4>
          <users-allusers :user="user"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations, mapActions } from "vuex";
import Users from '@/components/users/allusers'

export default {
  name: 'user',
  components: {
    'users-allusers': Users,
  },
  data: function () {
    return {
    }
  },
  created() {
    this.getAllUsers()
  },
  computed: {
    ...mapState(["usersList"]),
  },
  methods: {
    ...mapActions(["getAllUsers"])
  }
}
</script>