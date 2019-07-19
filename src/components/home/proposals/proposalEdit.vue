<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
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
                <div class="headline font-weight-black text-uppercase">{{ proposal.name }}</div>
                <br>
                <v-text-field
              name="nombre"
                  label="Nombre"
                  v-model=proposal.name
            ></v-text-field>
            <v-text-field
              name="descripción"
                  label="Descripción"
                  v-model=proposal.description
            ></v-text-field>
                <v-select
                  :items=this.proposal.files
                  label="Archivos"
                  @click.native="doThis"
                  @change="ejemplo()"
                ></v-select>
              <v-btn color="success" @click="actualizarPropuesta()">Actualizar</v-btn>
              <v-btn color="error" @click="eliminarPropuesta()">Eliminar</v-btn>
                <vueDropzone id="dropzone" :options ="dropzoneOptions"/>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
            </v-card-actions>
            <v-snackbar
                v-model="snackbar"
                :color="color"
                :multi-line="mode === 'multi-line'"
                :timeout="timeout"
                :vertical="mode === 'vertical'"
              >
                {{ text }}
                <v-btn
                  dark
                  flat
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </v-snackbar>
        </v-card>
      </v-flex>
       <v-flex
        xs12
        md4
        lg4
      >
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <img
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h4 class="font-weight text-capitalize">{{client.name}}</h4>
            <p class="font-weight text-capitalize">Empresa: {{client.company}}</p>
            <p class="font-weight text-capitalize">Valoración: {{client.score}}</p>
            <v-btn round class ="font-light buttonClient" :to="{name: 'client_detail', params: {client: client,  clientId: proposal.clientIdStr}}">Ver Cliente</v-btn>

          </v-card-text>
        </material-card>

        <material-card class="v-card-profile">
          <v-card-text class="text-xs-center">
            <h4 class="font-weight text-capitalize">Archivos asociados:</h4>
            <img class="img-pdf" src="@/assets/img_119919.png" alt="">
            <br>
            <v-btn
              round
              class="font-light buttonClient"
            >Descargar</v-btn>
          </v-card-text>
        </material-card>
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
      snackbar: false,
        color: 'success',
        mode: '',
        timeout: 6000,
        text: 'Usuario actualizado con éxito',
      client: [],
      proposal: [],
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
    this.proposal = this.$route.params.proposal
  },
  beforeMount(){
    
  },
  mounted() {
    var id = this.proposal.idStr;
    var dropzoneVue = document.getElementById("dropzone").dropzone;
    this.getClient();

    dropzoneVue.on("success", function(file) {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('proposalId', id);
      axios
      .post('http://localhost:9000' + '/upload/', formData)
      //.post('http://projecthunter.tk:8080/symbiose' + '/upload/', formData)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
     });
  },
  methods: {
    ...mapActions([
      'getProposal'
    ]),
    doThis () {
      console.log("do.this")
      console.log(this.proposal.files)
      this.actualizarArchivos();
    },
    actualizarArchivos() {
      console.log("actualizarArchivos")
        axios
          .get(this.serverURL + `/proposals/${this.proposal.idStr}`)
          .then(response => {
            console.log("buscando la propuesta")
            this.proposal = response.data;
          })
          .catch(e => {
            console.log(e.response);
          })
    },
    actualizarPropuesta(){
      let formData = new FormData();
      formData.append('proposalId', this.proposal.idStr);
      formData.append('name', this.proposal.name);
      formData.append('description', this.proposal.description);
      formData.append('files', this.proposal.files);
      formData.append('user', this.userId);
      axios
      .put(this.serverURL + '/proposals/', formData)
      .then(response => {
        this.snackbar = true
        this.color = 'success'
        this.text= 'Usuario actualizado con éxito',
        this.proposal.name = response.data.name
        this.proposal.description = response.data.description
        this.proposal.files = response.data.files
        this.proposal.user = response.data.user
        //router.push({ name: 'home' })
      })
      .catch(e => {
        this.snackbar = true
        this.color = 'error'
        this.text= 'Error al actualizar',
        console.log(e)
        console.log(e.response)
      })
    },
    eliminarPropuesta(){
      axios
      .delete(this.serverURL + '/proposals/' + this.proposal.idStr)
      .then(response => {
        console.log(response)
        router.push({ name: 'home' })
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
    },
    getClient(){
      axios
      .get(this.serverURL + '/clients/' + this.proposal.clientIdStr)
      .then(response => {
        this.client = response.data
        console.log(response.data)
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
      'serverURL',
      'userName',
      'userId'
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
