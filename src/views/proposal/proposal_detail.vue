<template>
  <div id="proposal_detail">
    <home-proposalDetail/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ProposalDetail from '@/components/home/proposalDetail'

export default {
  name: 'home',
  components: {
    'home-proposalDetail': ProposalDetail
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
