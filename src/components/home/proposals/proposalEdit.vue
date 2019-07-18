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
                <v-select
                  :items=this.files
                  label="Archivos"
                  @click.native="doThis"
                  @change="ejemplo()"
                ></v-select>
              </v-flex>
              <v-btn color="success" @click="actualizarPropuesta()">Actualizar</v-btn>
              <v-btn color="error" @click="eliminarPropuesta()">Eliminar</v-btn>
                <vueDropzone id="dropzone" :options ="dropzoneOptions"/>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
            </v-card-actions>
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
            <v-btn round class ="font-light buttonClient" :to="{name: 'client_detail', params: {client: client,  clientId: clientId}}">Ver Cliente</v-btn>

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
      algo: "Hola",
      proposalName: "",
      proposalDesc: "",
      proposalIdStr: "",
      clientId: "",
      client: [],
      files: [],
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
    this.proposalId = this.$route.params.id;
    this.files = this.proposal.files
  },
  beforeMount(){
    this.getProposal();
    console.log("beforeMount")
    console.log(this.getProposal())
  },
  mounted() {
    var propo = this.proposalId;
    var dropzoneVue = document.getElementById("dropzone").dropzone;
    this.proposalName = this.$route.params.name;
    this.proposalDesc = this.$route.params.description;
    this.clientId = this.$route.params.clientId;
    this.proposalIdStr = propo;
    this.getClient();
    var propoFresh = this.getProposal()

    dropzoneVue.on("success", function(file) {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('proposalId', propo);
      console.log("Entre")
      console.log(file)
      console.log(propo)
      console.log(formData)
      axios
      .post('http://projecthunter.tk:8080/symbiose' + '/upload/', formData)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
     });
  },
  updated() {
    //this.getClient();
  },
  methods: {
    ...mapActions([
      'getProposal'
    ]),
    doThis () {
      //this.actualizarPropuesta();
    },
    actualizarPropuesta(){
      let formData = new FormData();
      formData.append('proposalId', this.proposalIdStr);
      formData.append('name', this.proposalName);
      formData.append('description', this.proposalDesc);
      formData.append('files', this.proposal.files);
      axios
      .put(this.serverURL + '/proposals/', formData)
      .then(response => {
        this.proposalName = response.data.name
        this.proposalDesc = response.data.description
        this.files = response.data.files
        console.log(response)
        router.push({ name: 'home' })
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
    },
    eliminarPropuesta(){
      axios
      .delete(this.serverURL + '/proposals/' + this.proposalId)
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
      .get(this.serverURL + '/clients/' + this.clientId)
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
      'proposal',
      'proposalId',
      'serverURL'
    ]),
    proposalId: {
      get () {
        return this.$store.state.proposalId;
      },
      set (payload) {
        this.$store.commit('updateProposalId', payload)
      }
    },
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
