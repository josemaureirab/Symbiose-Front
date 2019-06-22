<template>
  <div>
		<v-layout row wrap>
        <v-flex mb-5 xs4 v-for="room in rooms" :key="room.id">
          <v-card class="mx-auto ml-2" color="blue" dark max-width="300">
            <v-card-title>
              <span class="title font-weight-bold">Room: {{ room.name }}</span>
            </v-card-title> 
            <v-card-text>
              <span class="title font-weight-light">Número: {{ room.number }}</span>
            </v-card-text>
            <v-card-text>
              <span class="title font-weight-light">Estado: {{ room.status }}</span>
            </v-card-text>
            <v-card-text v-if="room.roomType != null">
             <span class="title font-weight-light">Tipo: {{ room.roomType.description }}</span>  
            </v-card-text>
            <v-flex class="text-xs-center">
              <v-btn round color="primary" :to="{name: 'rooms_edit', params: {id: room.id}}">Editar<v-icon dark>edit</v-icon></v-btn>
              <v-btn round color="red" @click="deleteRoom(room)">Eliminar<v-icon dark>delete</v-icon></v-btn>      
            </v-flex>
          </v-card>    
        </v-flex>
      </v-layout>
  </div>        
</template>

<script>

import axios from 'axios'
import moment from 'moment'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Rooms',
  data () {
    return {
			name: '',
			number: '',
			smoke: '',
			status: '',
			roomType: '',
      loader: false
    }
	},
	methods: {
		deleteRoom (payload){
      try { 
        axios
          .delete(this.serverURL + `/rooms/delete/${payload.id}`)
          .then(response => {
              console.log('La habitacion ha sido eliminado.')
              this.getRooms()         
          })
          .catch(e => {
            this.getRooms()
            console.log(e)
            console.log(e.response)
          })
      } catch (error) {
        this.getRooms()  
        console.log(error)
      }
    }
	},
  computed: {
    ...mapState([
      'serverURL',
      'rooms',
      'room'
    ]),
  }	
}
</script>