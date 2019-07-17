<template>
  <div id="clients-edit">
    <v-container>
      <clients-update/>
    </v-container>
  </div>
</template>

<script>

import ClientsUpdate from '@/components/clients/update'

export default {
  name: 'clients-edit',
    components: {
      'clients-update': ClientsUpdate,
    },
    data() {
      return {
        
      }
    },
}
</script>