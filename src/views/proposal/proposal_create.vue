<template>
  <div id="proposal_create">
    <home-proposalCreate/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ProposalCreate from '@/components/home/proposals/proposalCreate'

export default {
  name: 'home',
  components: {
    'home-proposalCreate': ProposalCreate
  }
}
</script>
