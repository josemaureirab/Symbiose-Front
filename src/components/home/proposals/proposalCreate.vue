<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex 
      xs12 
      md8 
      lg8
      >
        <v-card 
        class="cardProposal">
            <v-img
                src="https://mattolpinski.com/wp-content/uploads/2017/12/proposal-teaser.jpg"
                height="100px"
                >
            </v-img>

            <v-card-title primary-title>
            <div>
                <div class="headline font-weight-black text-uppercase">Crear Propuesta</div>
                <br>
                <v-flex xs6>
                <v-textarea
                  name="nombre"
                  label="Nombre"
                  v-model=proposalName
                ></v-textarea>
              </v-flex>
              <v-flex xs6>
                <v-textarea
                  name="descripción"
                  label="Descripción"
                  v-model=proposalDesc
                ></v-textarea>
              </v-flex>
              <v-flex xs6>
                <v-flex v-for="client in clientsList" :key="client.idStr">
                <v-textarea
                  name="cliente"
                  label="Cliente"
                  v-model=client.name
                ></v-textarea>
                </v-flex>
                <v-select
                  :items=nameClients
                  label="Clientes"
                ></v-select>
              </v-flex>
              <v-btn flat color="blue" :to="{name: 'proposal_files'}">Añadir archivos</v-btn>
              <v-btn color="error" @click="llevarAtras()">Cancelar</v-btn>
              <v-btn color="primary" @click="generar()">Descargar propuesta pdf</v-btn>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

/* eslint-disable */

import axios from 'axios';
import router from '@/router';
import { mapState, mapActions } from 'vuex';
import MaterialCard from '@/components/home/material/card.vue'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'user-profile',
  data () {
    return {
      dateCreation: "12/12/2018",
      dateLimit: "12/07/2019",
      proposalName: "",
      proposalDesc: "",
      nameClients: [],
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 256,
          acceptedFiles: ".pdf",
          parallelUploads: 1,
          phone: undefined,
      }
    }
  },
  components: {
    'material-card': MaterialCard,
    vueDropzone: vue2Dropzone
  },
  created() {
    this.createProposal();
    this.getAllClients();
    this.nameClients = this.clientsList
    this.nameClients.forEach((num, index) => {
    return this.nameClients[index] = num.name;
    });
    
  },
  methods: {
    ...mapActions([
      'getAllClients',
      'createProposal'
    ]),
    llevarAtras(){
      let formData = new FormData();
      formData.append('proposalId', this.proposalIdStr);
      formData.append('name', this.proposalName);
      formData.append('description', this.proposalDesc);
      axios
      .put('http://localhost:9000/' + 'proposals/', formData)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
    },
    eliminarPropuesta(){
      axios
      .delete('http://localhost:9000/' + 'proposals/' + this.proposalId)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
    },
    generar(){
      axios
      .get('http://localhost:9000' + '/pdfreport/'+this.proposalIdStr)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
    }
  },
  computed: {
    ...mapState([
      'clientsList',      
    ]),
    // proposalIdStr: {
    //   get () {
    //     return this.$store.state.proposalIdStr;
    //   }
    //},
  },
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
