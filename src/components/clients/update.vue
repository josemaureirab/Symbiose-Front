<template>
  <div class="guests">
    <v-container fluid>
      <v-alert
        :value="updateGuestSuccess"
        color="success"
        icon="check_circle"
        outline
        dismissible
      >
        El huésped ha sido actualizado con éxito.
      </v-alert>
      <v-alert
        :value="updateGuestError"
        color="error"
        icon="warning"
        outline
        dismissible
      >
        Ha ocurrido un error al actualizar al huésped.
      </v-alert>
      <form @submit.prevent="updateGuest(guest)">
        <v-text-field
          v-model="guest.firstName"
          v-validate="'required|max:20'"
          :counter="20"
          :error-messages="errors.collect('firstName')"
          :placeholder="guest.firstName"
          data-vv-name="firstName"
          required
        ></v-text-field>
        <v-text-field
          v-model="guest.lastName"
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
                  v-model="guest.birthDate"
                  label="Fecha de nacimiento"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  :max="today"
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
              <v-date-picker v-model="guest.birthDate" no-title required :max="today" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
          <v-btn round color="success" dark :loading="loader" type="submit">
            <span>Guardar cambios</span>
            <v-icon dark class="save-icon">save</v-icon>
          </v-btn>

          <v-btn round @click="clear" color="warning">
            Limpiar 
            <v-icon dark>clear</v-icon>
          </v-btn>

          <v-btn round color="info" @click="goBackAndClear" :loading="loader">
            <span>Volver</span>
            <v-icon dark >keyboard_backspace</v-icon>
          </v-btn> 
      </form>
    </v-container>
  </div>
</template>

<script>

import moment from 'moment'
import { mapState, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
	name: 'guest-store',
	data(){
		return{
      today: '',
			date: '',
      menu: '',
      checkbox: '',
      dictionary: {
        custom: {
          firstName: {
            required: () => 'El campo nombre no puede estar vacío',
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
    this.today = moment().format("YYYY-MM-DD").toString();
    this.$store.commit('decryptGuestId', this.$route.params.id);
    this.getGuest(this.guestId);
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
  },
	methods: {
    ...mapActions([
      'getGuest',
      'updateGuest',
      'goBack'
    ]),
    goBackAndClear() {
      this.goBack();
      this.clear();
    },
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
      'loader',
      'updateGuestSuccess',
      'updateGuestError',
      'guest',
      'guestId',
    ]),
    guestId: {
      get () {
        return this.$store.state.guestId;
      },
      set (payload) {
        this.$store.commit('updateGuestId', payload)
      }
    },
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('La confirmación es requerida  ')
      return errors
    }
  },
}
</script>



<style scoped>
  .save-icon {
    margin-left: 2% !important;
  }
</style>