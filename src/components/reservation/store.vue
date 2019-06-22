<template>
  <div class="guests">
    <v-container fluid>
    <form @submit.prevent="storeReservationCall">
        <v-autocomplete
            label="Selecciona al cliente"
            :items="guests"
            v-model="guest"
            item-text="`${data.item.firstName}, ${data.item.lastName}`"
            item-value="`${data.item.id}`"
            :menu-props="{maxHeight:'auto'}"
          >
            <template slot="selection" slot-scope="data">
              {{ data.item.firstName}} {{data.item.lastName}}
            </template>
            <template slot="item" slot-scope="data">
              <v-list-tile-content>
                <v-list-tile-title v-html="`${data.item.firstName} ${data.item.lastName}`">
                </v-list-tile-title>
              </v-list-tile-content>
            </template>
          </v-autocomplete>
        <v-btn color="success" round type="submit">
					<span>Seleccionar</span><v-icon>check</v-icon>
				</v-btn>
           
      </form>
    </v-container>
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'reservation-store',
  props: ['isCheckin'],
	data(){
		return{
      date: '',
      menu: '',
      checkbox: '',
      dictionary: {
        custom: {
          name: {
            required: () => 'El campo nombre puede estar vacío',
            max: 'La cantidad de caracteres en el campo no puede ser mayor a 20'
            // custom messages
          },
          lastname: {
            required: () => 'El campo apellido no puede estar vacío',
            max: 'La cantidad de caracteres en el campo no puede ser mayor a 20'
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
    this.getGuests();
    this.getReservations();
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
  },
	methods: {
    ...mapActions([
      'getGuests',
      'storeGuest',
      'getReservations',
      'storeReservation',
      'updateHostedAt'
    ]),
    ...mapMutations([
      'updateClientSelect'
    ]),
    storeReservationCall () {
      if (this.isCheckin) {
        this.guestId = this.guest.id
        this.updateHostedAt()
        this.$store.commit('updateCollapsePanel', true)
      }
      else {
        console.log(2);
        this.storeReservation
      }
    },
    submit () {
      this.$validator.validateAll()
    },
	},
	computed: {
    ...mapState([
      'serverURL',
      'reservations',
      'clientSelect',
      'loader',
      'guests',
      'guest',
      'guestId'
    ]),
    guest: {
      get () {
        return this.$store.state.guest;
      },
      set (payload) {
        this.$store.commit('updateGuest', payload)
      }
    },
    guestId: {
      get () {
        return this.$store.state.guestId
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
  }  
  ,
}
</script>
