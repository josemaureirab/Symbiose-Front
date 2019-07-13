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
                <div class="headline font-weight-black text-uppercase">{{ proposalId }}</div>
                <br>
                <span class="grey--text">I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.

                </span>
                <br>
                <br>
                <v-icon class="icon-label" >label</v-icon>
                <span class="font-weight text-capitalize">Fecha de creación: {{ dateCreation }}</span>
                <br>
                <br>
                <v-icon class="icon-label" >label</v-icon>
                <span class="font-weight text-capitalize">Fecha límite: {{ dateLimit }}</span>
                <br>
                <br>
                <v-icon class="icon-label" >label</v-icon>
                <span class="font-weight text-capitalize">Creador: Guillermito Campos</span>
                <br>
                <br>
                <v-icon class="icon-label" >label</v-icon>
                <span class="font-weight text-capitalize">Presupuesto asociado: R$1000</span>
                <br>
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
      proposals: [],
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 256,
        //   headers: { "My-Awesome-Header": "header value" },
          acceptedFiles: ".pdf",
          parallelUploads: 1
          //renameFile: proposal._id
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
  },
  mounted() {
    console.log("Este sirve")
    console.log(this.$route.params.id);
    var propo = this.$route.params.id;
    console.log("proposal")
    console.log(propo);
    var id = this.$route.params.id
    //console.log("mounted")
    //console.log(this.$route)
    var dropzoneVue = document.getElementById("dropzone").dropzone;
    dropzoneVue.on("success", function(file) {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('proposal', propo);
      console.log("form data")
      console.log(formData);
      axios
      .post('http://localhost:9000/' + 'upload/', formData)
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
    ])
  },
  computed: {
    ...mapState([
      'proposal',
      'proposalId'
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
