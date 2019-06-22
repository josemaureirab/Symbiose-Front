<template>
  <div id="guest-edit">
    <v-container>
      <guest-update/>
    </v-container>
  </div>
</template>

<script>

import GuestUpdate from '@/components/guest/update'

export default {
  name: 'guest-edit',
    components: {
      'guest-update': GuestUpdate,
    },
    data() {
      return {
        
      }
    },
}
</script>