<template>
  <div id="guest-store">
    <v-container fluid>
      <v-alert
        :value="storeGuestSuccess"
        color="success"
        icon="check_circle"
        outline
        dismissible
      >
        El huésped ha sido agregado con éxito.
      </v-alert>
      <v-alert
        :value="deleteGuestSuccess"
        color="success"
        icon="check_circle"
        outline
        dismissible
      >
        El huésped ha sido eliminado con éxito con éxito.
      </v-alert>
      <v-alert
        :value="storeGuestError"
        color="error"
        icon="warning"
        outline
        dismissible
      >
        Ha ocurrido un error al crear el huésped.
      </v-alert>
      <v-alert
        :value="deleteGuestError"
        color="error"
        icon="warning"
        outline
        dismissible
      >
        Ha ocurrido un error al eliminar al huésped.
      </v-alert>
      <form @submit.prevent="storeGuest(isReservation)">
        <v-text-field
          v-model="guest.firstName"
          v-validate="'required|max:20'"
          :counter="20"
          :error-messages="errors.collect('firstName')"
          label="Nombre"
          data-vv-name="firstName"
          required
        ></v-text-field>
        <v-text-field
          v-model="guest.lastName"
          v-validate="'required|max:20'"
          :counter="20"
          :error-messages="errors.collect('lastName')"
          label="Apellido"
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
                  v-model="guest.birthDate"
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
              <v-date-picker v-model="guest.birthDate" no-title required scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-btn round type="submit" dark color="success" :loading="loader">
          <span>Guardar</span>
          <v-icon dark class="save-icon">save</v-icon>
        </v-btn>
        <v-btn round @click="clear" color="warning">Limpiar <v-icon dark>clear</v-icon></v-btn>
        <v-btn round dark v-if="isReservation && !clientSelect" @click="updateClientSelect(!clientSelect)" color="info"> Cliente registrado <v-icon dark>how_to_reg</v-icon></v-btn>
        <v-btn round dark v-if="clientSelect" @click="updateClientSelect(!clientSelect)" color="red"> Cancelar <v-icon dark>clear</v-icon></v-btn>       
      </form>
    </v-container>
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
	name: 'guest-store',
  props: [
    'guests',
    'isReservation'
    ],
	data(){
		return{
			date: '',
      menu: '',
      checkbox: '',
      dictionary: {
        custom: {
          firstName: {
            required: () => 'El campo nombre puede estar vacío',
            max: 'La cantidad de caracteres en el campo nombre no puede ser mayor a 20'
            // custom messages
          },
          lastName: {
            required: () => 'El campo apellido no puede estar vacío',
            max: 'La cantidad de caracteres en el campo apellido no puede ser mayor a 20'
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
  mounted() {
    this.$validator.localize('en', this.dictionary)
  },
	methods: {
    ...mapActions([
      'storeGuest'
    ]),
    ...mapMutations([
      'updateClientSelect'
    ]),
    submit () {
			this.$validator.validateAll()
    },
    clear () {
      this.guest.firstName = ''
      this.guest.lastName = ''
      this.guest.email = ''      
      this.guest.birthDate = null
      this.checkbox = null
      this.$validator.reset()
    }
	},
	computed: {
    ...mapState([
      'serverURL',
      'guest',
      'loader',
      'storeGuestSuccess',
      'storeGuestError',
      'deleteGuestSuccess',
      'deleteGuestError',
      'clientSelect'
    ]),
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('El nombre debe contener al menos 10 carácteres')
      !this.$v.name.required && errors.push('El nombre es requerido.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Debe ser una dirección de corre válida')
      !this.$v.email.required && errors.push('El e-mail es requerido')
      return errors
    }  
  } 
}
</script>

<style scoped>
  .save-icon {
    margin-left: 3% !important;
  }
</style>
