<template>
  <div id="proposal_edit">
    <home-proposalEdit/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ProposalEdit from '@/components/home/proposals/proposalEdit'

export default {
  name: 'home',
  components: {
    'home-proposalEdit': ProposalEdit
  }
}
</script>