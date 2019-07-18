<template>
<v-container>
  <v-flex xs12 sm12 md12>
    <v-data-table
    v-model="selected"
    :headers="headers"
    :items="traces"
    :pagination.sync="pagination"
    select-all
    item-key="name"
    class="elevation-1"
  >
    <template v-slot:headers="props">
      <tr>
        <th>
          <v-checkbox
            :input-value="props.all"
            :indeterminate="props.indeterminate"
            primary
            hide-details
            @click.stop="toggleAll"
          ></v-checkbox>
        </th>
        <th
          v-for="header in props.headers"
          :key="header.text"
          :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
          @click="changeSort(header.value)"
        >
          <v-icon small>arrow_upward</v-icon>
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template v-slot:items="props">
      <tr :active="props.selected" @click="props.selected = !props.selected">
        <td>
          <v-checkbox
            :input-value="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td>{{ props.item.user.firstName }}</td>
        <td class="text-xs-right">{{ props.item.commentary }}</td>
        <td class="text-xs-right">{{ props.item.time }}</td>

        <td>
            <tr>
              <td class="text-xs-left" v-if="props.item.changes[0] === 1">Cambio de nombre</td>
              <td class="text-xs-left" v-else>Sin cambio de nombre</td>
            </tr>
            <tr>
              <td class="text-xs-left" v-if="props.item.changes[1] === 1">Cambio en descripción</td>
             <td class="text-xs-left" v-else>Sin cambio en descripción</td>
            </tr>
            <tr>
              <td class="text-xs-left" v-if="props.item.changes[2] === 1">Cambio de cliente</td>
             <td class="text-xs-left" v-else>Sin cambio de cliente</td>
            </tr>
            <tr>
              <td class="text-xs-left" v-if="props.item.changes[3] === 1">Cambio de presupuesto</td>
              <td class="text-xs-left" v-else>Sin cambio de presupuesto</td>
            </tr>
            <tr>
              <td class="text-xs-left" v-if="props.item.changes[4] === 1">Cambio en tamaño de equipo</td>
             <td class="text-xs-left" v-else>Sin cambio de tamaño de equipo</td>
            </tr>
            <tr>
              <td class="text-xs-left" v-if="props.item.changes[5] === 1">Cambio en archivos</td>
              <td class="text-xs-left" v-else>Sin cambios en archivos</td>
            </tr>
        </td>


      </tr>
    </template>
  </v-data-table>
  </v-flex>
</v-container>
</template>

<script>

/* eslint-disable */

import axios from 'axios';
import router from '@/router';
import { mapState, mapActions } from 'vuex';
import MaterialCard from '@/components/home/material/card.vue'

export default {
  name: 'trace',
  data () {
    return {
      proposalId :"",
      traces: [],
      changes: [],
      pagination: {
        sortBy: 'firstName'
      },
      selected: [],
      headers: [
        {
          text: 'Usuario',
          align: 'left',
          value: 'user.firstName'
        },
        { text: 'Comentario', value: 'commentary' },
        { text: 'Hora', value: 'time' },
        { text: 'Cambios', value: 'changes' },
      ]
    }
  },
  components: {
    'material-card': MaterialCard
  },
  created() {
    this.proposalId = this.$route.params.id;
    this.historial();
  },
  methods:{
    historial(){
      let formData = new FormData();
      formData.append('proposalId', this.proposalId);
      console.log(this.proposalId)
      axios
      .put(this.serverURL + '/traceproposals/', formData)
      .then(response => {
        this.traces = response.data
        console.log("traces")
        console.log(this.traces)
        console.log(response)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
    },
    toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.traces.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
  },
  computed: {
    ...mapState([
      'serverURL'
    ])
  }
}
</script>

<style scoped>

.v-card-profile{
  margin-top: 0px !important;
}

.icon-label{
  color: #01acac !important;
}
.text-capitalize{
  font-size: 150% !important;
  color: grey !important;
  margin-left: 3% !important;
}
.grey--text{
  font-size: 110% !important;
}
.buttonClient{
  background-color: #01acac !important;
  color: white !important;
}
.buttonClient:hover{
  background-color:white !important;
  color: #01acac  !important;
}
.img-pdf{
  max-width: 30% !important;
}


</style>
