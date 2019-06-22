<template>
  <div id="reservation-room">
    <v-container fluid>
    <form @submit.prevent="submit()">
				<v-select
          v-model="type"
          v-validate="'required'"
          :items="itemsType"
          placeholder="Simple"
          label="Tipo de habitación"
          data-vv-name="tipo"
          required
          v-on:change="getFilteredRooms"
        ></v-select>  
        <v-text-field
					type="number"
          v-model="minPrice"
          v-validate="'required|max:20'"
          :counter="20"
          :error-messages="errors.collect('precio_min')"
          placeholder=0
          label="Precio mínimo"
          data-vv-name="precioMin"
          required
          v-on:change="getFilteredRooms"
        ></v-text-field>
				<v-text-field
					type="number"
          v-model="maxPrice"
          v-validate="'required|max:20'"
          :counter="20"
          :error-messages="errors.collect('precio_max')"
          placeholder=99999999
          label="Precio máximo"
          data-vv-name="Precio máximo"
          required
          v-on:change="getFilteredRooms"
        ></v-text-field>				
        <v-layout row wrap>
          <v-flex xs12 sm6 md4>
            <v-menu
              ref="inicio"
              v-model="start"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              required
              full-width
              min-width="290px"
              v-on:change="getFilteredRooms"
              :min="today"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="reservedRoom.dateIni"
                  label="Fecha de Ingreso"
                  prepend-icon="event"
                  required
                  v-on="on"
                  :min="today"
                  v-on:change="getFilteredRooms"
                ></v-text-field>             
              </template>
              <v-date-picker 
              v-model="reservedRoom.dateIni" 
              :min="today"
              no-title
              required 
              scrollable
              v-on:change="getFilteredRooms"
              >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="inicio = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.inicio.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              required
              :min="minDate"
              v-on:change="getFilteredRooms"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="reservedRoom.dateOut"
                  label="Fecha de salida"
                  prepend-icon="event"
                  required
                  :min="minDate"
                  v-on="on"
                  v-on:change="getFilteredRooms"
                ></v-text-field>     
              </template>
              <v-date-picker 
              v-model="reservedRoom.dateOut" 
              no-title 
              required 
              scrollable
              :min="minDate"
              v-on:change="getFilteredRooms"
              >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>    

        <v-autocomplete
          label="Selecciona la habitación"
          :items="filtredRooms"
          v-model="reservedRoom.room"
          item-text="`${data.item.number}`"
          item-value="`${data.item.number}`"
          :menu-props="{maxHeight:'auto'}"
          v-on:click="getFilteredRooms"
        >
          <template slot="selection" slot-scope="data">
            {{ data.item.number}}
          </template>
          <template slot="item" slot-scope="data">
              <v-list-tile-content>
                <v-list-tile-title v-html="`${data.item.number}`">
                </v-list-tile-title>
              </v-list-tile-content>
            </template>
        </v-autocomplete>
        <v-btn block color="primary" type="submit" @click="reservedRoomIndicator = false">
					<span>Finalizar reserva y seguir reservando</span><v-icon>redo</v-icon>
				</v-btn>
        <v-divider class="my-4"></v-divider>
        <center>
          <v-btn color="success" type="submit" @click="reservedRoomIndicator = true">
            <span>Finalizar Reserva</span> <v-icon>check</v-icon>
          </v-btn>
          <v-btn dark color="red" to="/">
            <span>Cancelar Reserva</span> <v-icon>cancel</v-icon>
          </v-btn>
        </center>
      </form>
    </v-container>
  </div>
</template>

<script>

import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'reserved-room',
  data(){
		return{
      today: '',
      minDate: '',
      date: '',
      menu: '',
      start: '',
      checkbox: '',
      dictionary: {
        custom: {
          tipo: {
            required: () => 'Debe elegir un tipo de habitación',
            // custom messages
          },            
          precioMin: {
            required: () => 'El campo nombre no puede estar vacío',
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
  created() {
    this.getReservedRooms();
    this.getRooms();
    this.reservationId = this.$route.params.id;
    this.today = moment().format("YYYY-MM-DD").toString();
  },
  mounted() {
    this.$validator.localize('en', this.dictionary);
  },
	methods: {
    ...mapActions([
      'filter',
      'getRooms',
      'getReservedRooms',
      'storeReservedRoom',
    ]),
    getFilteredRooms() {
      if(this.reservedRoom.dateIni){
        this.minDate =  this.reservedRoom.dateIni.toString();
      }
      if(this.minPrice != '' && this.maxPrice != '' && this.type != '' && this.reservedRoom.dateIni != null && this.reservedRoom.dateOut != null) {
        this.filter();
      }
    },
    reloadPage(){
      window.location.reload()
    },
    submit() {
      console.log(this.reservedRoomIndicator);
      if(this.$validator.validateAll()){
        this.storeReservedRoom();
      }     
    },
    clear() {
      this.checkbox = null
      this.$validator.reset()
    }
  },
	computed: {
    ...mapState([
      'serverURL',
      'reservationdId',
      'reservedRoomIndicator',
      'reservedRoom',
      'type',
      'minPrice',
      'maxPrice',
      'rooms',
      'room',
      'roomId',
      'filtredRooms',
      'itemsType'
    ]),
    reservedRoomIndicator: {
      get () {
        return this.$store.state.reservedRoomIndicator;
      },
      set (payload) {
        this.$store.commit('updateReservedRoomIndicator', payload)
      }
    },
    room: {
      get () {
        return this.$store.state.room;
      },
      set (payload) {
        this.$store.commit('updateroom', payload)
      }
    },
    reservationId: {
      get () {
        return this.$store.state.reservationId;
      },
      set (payload) {
        this.$store.commit('updateReservationId', payload)
      }
    },
    type: {
      get () {
        return this.$store.state.type;
      },
      set (payload) {
        this.$store.commit('updateType', payload)
      }
    },
    capacity: {
      get () {
        return this.$store.state.capacity;
      },
      set (payload) {
        this.$store.commit('updateCapacity', payload)
      }
    },
    smoke: {
      get () {
        return this.$store.state.smoke;
      },
      set (payload) {
        this.$store.commit('updateSmoke', payload)
      }
    },
    minPrice: {
      get () {
        return this.$store.state.minPrice;
      },
      set (payload) {
        this.$store.commit('updateMinPrice', payload)
      }
    },
    maxPrice: {
      get () {
        return this.$store.state.maxPrice;
      },
      set (payload) {
        this.$store.commit('updateMaxPrice', payload)
      }
    },
    dateIni: {
      get () {
        return this.$store.state.dateIni;
      },
      set (payload) {
        this.$store.commit('updateDateIni', payload)
      }
    },
    dateOut: {
      get () {
        return this.$store.state.dateOut;
      },
      set (payload) {
        this.$store.commit('updateDateOut', payload)
      }
    },
    number: {
      get () {
        return this.$store.state.number;
      },
      set (payload) {
        this.$store.commit('updateNumber', payload)
      }
    },
    status: {
      get () {
        return this.$store.state.status;
      },
      set (payload) {
        this.$store.commit('updateStatus', payload)
      }
    },
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
