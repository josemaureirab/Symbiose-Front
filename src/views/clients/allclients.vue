<template>
  <div id="home">
    <v-container grid-list-md text-xs-center>
      

      <v-layout row wrap>jhgahjah
        <v-flex v-for="client in finalClientList" :key="client.idStr" sm12 xs12 lg4>
          <clients-allclients :client="client"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations, mapActions } from "vuex";
import Clients from '@/components/clients/allclients'

export default {
  name: 'client',
  components: {
    'clients-allclients': Clients,
  },
  data: function () {
    return {
    }
  },
  created() {
    this.getClients()
  },
  computed: {
    ...mapState(["clientsList"]),
  },
  methods: {
    ...mapActions(["getAllClients"]),
    async getClients () {
      await this.getAllClients()
      this.finalClientList = this.clientsList
    },
  searchByName () {
      this.finalClientList = this.clientsList.filter(user => {
        return ((client.name.toLowerCase()).includes(this.searchedClient.toLowerCase()))
      })
    }
  }
}
</script>