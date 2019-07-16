<template>
  <div>
		<v-layout row wrap>
        <v-flex mb-5 xs4 v-for="guest in guests" :key="guest.id">
          <v-card class="mx-auto ml-2" color="blue" dark max-width="300">
            <v-card-title>
              <span class="title font-weight-bold">Nombre: {{ guest.firstName }}</span>
            </v-card-title> 
            <v-card-text>
              <span class="title font-weight-light">Apellido: {{ guest.lastName }}</span>
            </v-card-text>
						<v-card-text>
              <span class="title font-weight-light"></span>
            </v-card-text>
            <v-flex class="text-xs-center">
              <v-btn round dark :loading="loader" color="primary" @click="toUpdate(guest.id)">Editar<v-icon dark>edit</v-icon></v-btn>
						  <v-btn round :loading="loader" color="red" @click="deleteGuest(guest)">Eliminar<v-icon dark>delete</v-icon></v-btn>
            </v-flex>
          </v-card>    
        </v-flex>
      </v-layout>
  </div>        
</template>

<script>

import router from '@/router'
import { mapActions, mapState } from 'vuex';

export default {
  name: 'client-show',
  props: ['clients'],
  data () {
    return {

    }
	},
	// methods: {
  //   ...mapActions([
  //     'deleteGuest',
  //   ]),
  //   toUpdate(payload) {
  //     this.$store.commit('encryptGuestId', payload)
  //     router.push({ name: 'guests_edit', params: { id: this.guestId } })
  //   }
	// },
  // computed: {
  //   ...mapState([
  //     'serverURL',
  //     'guestId',
  //     'loader'
  //   ]),
  // }	
}
</script>