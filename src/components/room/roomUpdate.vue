<template>
  <div class="roomsadd">
    <v-container fluid>
    <form @submit.prevent="editRoom(room,{number, status, smoke, roomType})">  
        <v-text-field
          v-model="number"
          v-validate="'required|max:20'"
          :counter="20"
          :error-messages="errors.collect('number')"
					:placeholder="''+room.number"
          type="number"
          data-vv-name="number"
          required
        ></v-text-field>
        <v-select
          v-model="status"
          v-validate="'required'"
          :items="items"
          :placeholder="room.status"
          :error-messages="errors.collect('status')"
          data-vv-name="status"
          required
        ></v-select>
        <v-select
          v-model="smoke"
          v-validate="'required'"
          :items="itemsH"
          :error-messages="errors.collect('status')"
					:placeholder="newSmoke"
          data-vv-name="smoke"
          required
        ></v-select>   
        <v-checkbox
          v-model="checkbox"
          v-validate="'required'"
          :error-messages="errors.collect('checkbox')"
          value="1"
          label="Confirmar"
          data-vv-name="checkbox"
          type="checkbox"
          required
        ></v-checkbox>  
          <v-btn round color="success" dark type="submit">
            <span>Guardar cambios</span><v-icon dark>save</v-icon>
          </v-btn>
          <v-btn round @click="clear" color="warning">Limpiar <v-icon dark>clear</v-icon></v-btn>
          <v-btn round color="info" to="/rooms">
            <span>Volver</span><v-icon dark>keyboard_backspace</v-icon>
          </v-btn>        
      </form>
    </v-container>
  </div>
</template>

<script>

/* eslint-disable */

import axios from 'axios';
import moment from 'moment'; // Trabajo del tipo de dato Date (fechas).
import router from '@/router';
import { mapState } from 'vuex';
import { round } from '@amcharts/amcharts4/.internal/core/utils/Math';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

Vue.use(VeeValidate);

export default {
	name: 'RoomsAdd',
	components: {

  },

  mixins: [validationMixin],

  validations: {
    checkbox: {
      checked (val) {
        return val
      }
    }
  },
  $_veeValidate: {
    validator: 'new'
  },  
	data(){
		return{
			room: {},
      number: '',
      smoke: '',
      status: '',
      newSmoke: '',
      checkbox: '',
			roomType: '',
      items: [
        'Disponible',
				'Reservada',
				'En mantención',
				'Ocupada'
      ],
      itemsH: [
        'Sí',
        'No'
      ],      			
      dictionary: {
        custom: {
          number: {
            required: () => 'El campo número no puede estar vacío',
            max: 'La cantidad de caracteres en el campo no puede ser mayor a 20'
            // custom messages
          },            
          status: {
            required: () => 'Debe elegir una opción',
            // custom messages
          },         
          checkbox: {
            required: 'La confirmación es requerida'
          }
        }
      }
    }
	},
  created() {
    this.getRoom(this.$route.params.id);
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
  },
	methods: {
    getRoom(id) {
      try {
        axios
          .get(this.serverURL + `/rooms/${id}`)
          .then(response => {
            var room = response.data;
            var newSmoke = '';
            if (room.smoke === true) {
              newSmoke = 'Sí';
            }
            else{
              newSmoke = 'No';
            }
            if (room) {
              this.room = {
                number: room.number,
								status: room.status,
                smoke: room.smoke						
              }
                this.number = room.number,
								this.status = room.status,
                this.smoke = newSmoke	
            }
            else {
              console.log('No hay habitaciones o no se puede acceder a ellas');
            }
          })
          .catch(e => {
            console.log(e.response);
          })
      } catch (error) {
        console.log(error)
      }
    },
    editRoom(id, payload) {
      this.loader = true;
      var newSmoke = '';
			if (payload.smoke === 'Sí') {
				newSmoke = true;
			}
			else{
				newSmoke = false;
			}
      this.room = {
        number: payload.number,
        status: payload.status,
        smoke: newSmoke,
      }
      try { 
        axios
          .put(this.serverURL + `/rooms/edit/${this.$route.params.id}`, this.room)
          .then(response => {
              this.loader = false;
              router.push({ name: 'rooms' })
              this.loader = false;
              console.log('La habitación ha sido actualizada.');
          })
          .catch(e => {
            console.log(e);
          })
      } catch (error) {
        console.log(error)
      }
    },
    changeLoader(payload){
			this.loader = payload;
    },
    submit () {
      this.$validator.validateAll()
    },
    clear () {
      this.number = ''
      this.status = null
      this.smoke = null
      this.checkbox = null
      this.$validator.reset()
    }
	},
	computed: {
    ...mapState([
      'serverURL',
    ]),
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('La confirmación es requerida')
      return errors
    }
  }  
  ,
}
</script>