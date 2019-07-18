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
                <div class="headline font-weight-black text-uppercase">{{ proposal }}</div>
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
                <v-textarea
                  name="cliente"
                  label="Cliente"
                  value=""
                ></v-textarea>
              </v-flex>
              <v-flex xs6>
                <v-textarea
                  name="archivos"
                  label="Archivos"
                  value=""
                ></v-textarea>
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
            <h4 class="font-weight text-capitalize">Guillermito Campos</h4>
            <p class="font-weight text-capitalize">Empresa: Rollers Inc</p>
            <p class="font-weight text-capitalize">Nº de Proyectos: 5</p>
            <v-btn
              round
              class="font-light buttonClient"
            >Ver Cliente</v-btn>
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
      dateCreation: "12/12/2018",
      dateLimit: "12/07/2019",
      proposalName: "",
      proposalDesc: "",
      proposalIdStr: "",
      //proposal: "",
      //proposalDesc: this.proposal.description,
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 256,
        //   headers: { "My-Awesome-Header": "header value" },
          acceptedFiles: ".pdf",
          parallelUploads: 1,
          //renameFile: proposal._id
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
    this.getProposal();
    //this.proposalName = this.$route.params.proposal;
    //console.log(this.getProposal())
  },
  mounted() {
    //console.log(this);
    var propo = this.proposalId;
    var dropzoneVue = document.getElementById("dropzone").dropzone;
    this.proposalName = this.$route.params.name;
    this.proposalDesc = this.$route.params.description;
    this.proposalIdStr = propo;
    console.log(this.proposal)
    dropzoneVue.on("success", function(file) {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('proposalId', propo);
      axios
      .post(this.serverURL + '/upload/', formData)
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
    actualizarPropuesta(){
      //console.log(this.proposalName)
      let formData = new FormData();
      formData.append('proposalId', this.proposalIdStr);
      formData.append('name', this.proposalName);
      formData.append('description', this.proposalDesc);
      //formData.append('description', "probando el cambio");
      axios
      .put(this.serverURL + '/proposals/', formData)
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
      .delete(this.serverURL + '/proposals/' + this.proposalId)
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
