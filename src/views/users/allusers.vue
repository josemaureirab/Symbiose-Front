<template>
  <div id="home">
    <v-container grid-list-md text-xs-center>
        <v-text-field
        box
        label="Buscar usuario"
        prepend-inner-icon="search"
        v-model="searchedUser"
        v-on:keyup="searchByName"
      ></v-text-field>
      <v-layout row wrap>
        <v-flex v-for="user in finalUserList" :key="user.firstName" sm12 xs12 lg4>
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
      searchedUser: '',
      finalUserList: ''
    }
  },
  created() {
    this.getUsers()
  },
  computed: {
    ...mapState(["usersList"]),
  },
  methods: {
    ...mapActions(["getAllUsers"]),
    async getUsers () {
      await this.getAllUsers()
      this.finalUserList = this.usersList
    },
  searchByName () {
      this.finalUserList = this.usersList.filter(user => {
        return ((user.firstName.toLowerCase()).includes(this.searchedUser.toLowerCase()) || (user.lastName.toLowerCase()).includes(this.searchedUser.toLowerCase()))
      })
    }
  }
}
</script>