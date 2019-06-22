<template>
  <div>
		<v-layout row wrap>
        <v-flex mb-5 xs4 v-for="reservation in reservations" :key="reservation.id">
          <v-card class="mx-auto ml-2" color="green" dark max-width="300">
            <v-card-title>
              <span class="title font-weight-bold">Id: {{ reservation.id }}</span>
            </v-card-title> 
            <v-card-text>
              <span class="title font-weight-light">Fecha de Entrada: {{ reservation.dateIni }}</span>
            </v-card-text>
            <v-card-text>
              <span class="title font-weight-light">Fecha de Salida: {{ reservation.dateOut }}</span>
            </v-card-text>
            <v-card-text>
              <span class="title font-weight-light">Hecha por: {{ reservation.madeBy }}</span>
            </v-card-text>
            <v-card-text>
              <span v-if="reservation.guest != null" class="title font-weight-light">Huésped: {{ reservation.guest.firstName}} {{reservation.guest.lastName}}</span>
            </v-card-text>
            <v-btn round color="primary" :to="{name: 'reservations_edit', params: {id: reservation.id}}">Editar</v-btn>
            <v-btn round color="red" @click="deleteReservation(reservation)">Eliminar</v-btn>
          </v-card>    
        </v-flex>
      </v-layout>
  </div>        
</template>

<script>

/* eslint-disable */

import axios from 'axios'; // Consultas al Backend
import moment from 'moment'; // Trabajo del tipo de dato Date (fechas).
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Reservations',
  data () {
    return {
            reservations: [],
            id: '',
            dateIni: '',
            dateOut: '',
            madeBy: '',
            guest: '',
      loader: false
    }
	},
	created(){
		this.getReservations();
	},
	methods: {
		getReservations(){
			try{
				this.changeLoader(true);
				console.log(this.serverURL)				
				axios
					.get(this.serverURL + '/reservations/')
					.then(response => {
						const reservations = response.data;
						if (reservations.length != 0){
							this.changeLoader(false);
							this.reservations = reservations;
						}
						else{
							console.log('No hay reservaciones. Salu2')
						}
					})
					.catch(e => {
						console.log(e.response);
					})
			} catch(error){
				console.log(error)
			}
		},
    changeLoader(payload) {
			this.loader = payload;
		},
		deleteReservation(payload){
      try { 
        axios
          .delete(this.serverURL + `/reservations/delete/${payload.id}`)
          .then(response => {
              console.log('La reservación ha sido eliminado.');
              this.getReservations();              
          })
          .catch(e => {
            this.getReservations();  
            console.log(e.response);
          })
      } catch (error) {
        this.getReservations();  
        console.log(error)
      }
    }
	},
	
  computed: {
    ...mapState([
      'serverURL',
    ]),
  }	
}
</script>