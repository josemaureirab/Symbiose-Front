<template>
  <div id="home">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="proposal in proposalList" :key="proposal.id" sm12 xs12 lg4>
          <home-proposals :proposals="proposal"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Proposals from '@/components/home/proposals'

export default {
  name: 'home',
  components: {
    'home-proposals': Proposals
  },
  created() {
    this.getAllProposals()
  },
  computed: {
    ...mapState(["proposalList"])
  },
  methods: {
    ...mapActions(["getAllProposals"]),
  }
}
</script>


