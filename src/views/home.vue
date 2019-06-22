<template>
  <div id="home">
    <home-proposals/>
  </div>
</template>

<script>

import Proposals from '@/components/home/proposals'

export default {
  name: 'home',
  components: {
    'home-proposals': Proposals
  }
}
</script>
