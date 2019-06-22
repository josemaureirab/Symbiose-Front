<template>
  <div id="inspire">
    <v-layout align-center justify-end fill-height class="mb-3">
      <v-flex xs12 sm6 md3>
        <v-text-field
          label="Buscar Reserva"
          v-model="searchReservedRoom"
          v-on:keyup="getFiltredReservedRooms"
          placeholder="Nombre del reservante"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      dark
      must-sort
      :headers="headers"
      :pagination.sync="pagination"
      :rows-per-page-items="pagination.rowsPerPageItems"
      :total-items="pagination.totalItems"
      :loading="loading"
      :items="items"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props" v-if="props.item.dateIni != null">
        <td class="text-xs-center">{{ props.item.reservation.guest.firstName + ' ' + props.item.reservation.guest.lastName }}</td>
        <td class="text-xs-center" v-show="props.item.checkIn != null">{{ formatDate(props.item.checkIn) }}</td>
        <td class="text-xs-center" v-show="props.item.checkIn === null">No hay datos asociados</td>
        <td class="text-xs-center" v-show="props.item.checkOut != null">{{ formatDate(props.item.checkOut) }}</td>
        <td class="text-xs-center" v-show="props.item.checkOut === null">No hay datos asociados</td>
        <td class="text-xs-center">
          <v-btn color="success" round type="submit" @click="toCheckin(props.item.id)">
            <span>Seleccionar</span><v-icon>check</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import router from '@/router'
import moment from 'moment'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'checkin-show',
  data() {
    return {
      loading: false,
      headers: [
        { text: 'Reservante', value: 'guest.firstName', sortable:false, align: 'center' },
        { text: 'Check-In', value: 'calories', sortable:false, align: 'center' },
        { text: 'Check-out', value: 'fat', sortable:false, align: 'center' },
        { text: '', value: 'carbs', sortable:false, align: 'center' },
      ],
    }
  },
  watch: {
    pagination: {
      handler () {
        this.loading = true
        this.$store.dispatch('queryItems', this.searchReservedRoom)
          .then(result => {
            this.loading = false
          })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'queryItems'
    ]),
    getFiltredReservedRooms() {
      this.$store.dispatch('queryItems', this.reservedRoom)
    },
    toCheckin(payload) {
      this.$store.commit('encryptReservedRoomId', payload)
      router.push({ name: 'checkin_create', params: { id: this.reservedRoomId } })
    },
    formatDate(payload) {
      if (payload != null) {
        return moment(payload).format("YYYY-MM-DD");
      }
    },
  },
  computed: {
    ...mapState([
      'reservedRooms',
      'searchReservedRoom',
      'reservedRoom',
      'reservedRoomId'
    ]),
    pagination: {
      get: function () {
        return this.$store.getters.pagination
      },
      set: function (value) {
        this.$store.commit('setPagination', value)
      }
    },
    reservedRoomId: {
      get () {
        return this.$store.state.reservedRoomId;
      },
      set (payload) {
        this.$store.commit('updateReservedRoomId', payload)
      }
    },
    reservedRoom: {
      get: function () {
        return this.$store.state.reservedRoom
      },
      set: function (value) {
        this.$store.commit('updateReservedRoom', value)
      }
    },
    reservedRooms: {
      get: function () {
        return this.$store.state.reservedRooms
      },
      set: function (value) {
        this.$store.commit('updateReservedRooms', value)
      }
    },
    searchReservedRoom: {
      get: function () {
        return this.$store.state.searchReservedRoom
      },
      set: function (value) {
        this.$store.commit('updateSearchReservedRoom', value)
      }
    },
    items () {
      return this.$store.getters.items
    }
  },
}
</script>

<style>

</style>
