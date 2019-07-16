<template>
  <div id="proposal_files">
    <home-proposalFiles/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ProposalFiles from '@/components/home/proposals/proposalFiles'

export default {
  name: 'home',
  components: {
    'home-proposalFiles': ProposalFiles
  }
}
</script>
