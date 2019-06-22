<template>
  <div class="guests">
    <v-container fluid>
    <form @submit.prevent="editGuest(guest,{firstName, lastName, birthDate})">
        <v-text-field
          v-model="firstName"
          v-validate="'required|max:20'"
          :counter="20"
          :error-messages="errors.collect('firstName')"
          :placeholder="guest.firstName"
          data-vv-name="firstName"
          required
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          v-validate="'required|max:20'"
          :counter="20"
          :error-messages="errors.collect('lastName')"
          :placeholder="guest.lastName"
          data-vv-name="lastName"
          required
        ></v-text-field>
        <!-- <v-text-field
          v-model="email"
          v-validate="'required|max:30'"
          :counter="30"
          :error-messages="errors.collect('email')"
          :rules="emailRules"
          label="E-mail"
          data-vv-name="email"
          required
        ></v-text-field> -->
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
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="birthDate"
                  label="Fecha de nacimiento"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              <v-checkbox
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Confirmar"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
              ></v-checkbox>                
              </template>
              <v-date-picker v-model="birthDate" no-title required scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
          <v-btn round color="success" dark type="submit">
            <span>Guardar cambios</span><v-icon dark>save</v-icon>
          </v-btn>
          <v-btn round @click="clear" color="warning">Limpiar <v-icon dark>clear</v-icon></v-btn>
          <v-btn round color="info" to="/guests">
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
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

Vue.use(VeeValidate);

export default {
	name: 'GuestEdit',
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
    	guest: {},
			birthDate: '',
			date: '',
      menu: '',
      checkbox: '',
      firstName: '',
      lastName: '',
      email: '',
      dictionary: {
        custom: {
          firstName: {
            required: () => 'El campo nombre puede estar vacío',
            max: 'La cantidad de caracteres en el campo no puede ser mayor a 20'
            // custom messages
          },
          lastName: {
            required: () => 'El campo apellido no puede estar vacío',
            max: 'La cantidad de caracteres en el campo no puede ser mayor a 20'
            // custom messages
          },
          email: {
            required: () => 'El campo e-mail no puede estar vacío',
            max: 'La cantidad de caracteres en el campo e-mail no puede ser mayor a 30'
            // custom messages
          },          
          select: {
            required: 'La confirmación es requerida'
          }
        }
      }
    }
	},
  created() {
    this.getGuest(this.$route.params.id);
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
  },
	methods: {
    // Obtener guest (index)
    getGuest(id) {
      try {
        axios
          .get(this.serverURL + `/guests/${id}`)
          .then(response => {
            var guest = response.data;
            if (guest) {
              this.guest = {
                firstName: guest.firstName,
                lastName: guest.lastName,
                email: guest.email,
              }
              this.firstName = guest.firstName;
              this.lastName = guest.lastName;
              this.mail = guest.mail;
            }
            else {
              console.log('No hay huéspedes o no se puede acceder a ellos');
            }
          })
          .catch(e => {
            console.log(e.response);
          })
      } catch (error) {
        console.log(error)
      }
    },    
    editGuest(id, payload) {
      this.loader = true;
      this.guest = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        birthDate: payload.birthDate,
        mail: payload.mail,
      }
      try { 
        axios
          .put(this.serverURL + `/guests/edit/${this.$route.params.id}`, this.guest)
          .then(response => {
              this.loader = false;
              router.push({ name: 'home' })
              this.loader = false;
              console.log('El huésped ha sido actualizado.');
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
			console.log(this.firstName, this.lastName, this.birthDate);
    },
    clear () {
      this.firstName = ''
      this.lastName = ''
      this.mail = ''
			this.birthDate = null
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
      !this.$v.checkbox.checked && errors.push('La confirmación es requerida  ')
      return errors
    }
  }  
  ,
}
</script>



