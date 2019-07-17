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
                <span class="grey--text">I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.

                </span>
                <br>
                <br>
                <v-icon class="icon-label" >label</v-icon>
                <span class="font-weight text-capitalize">Fecha de creación: {{ proposal.name }}</span>
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
              <v-list-tile
                v-for="(file, i) in this.proposal.files"
                :key="i"
                :to="file.to"
                avatar
                class="v-list-item"
                exact
                >
              <v-btn round
              class="font-light buttonClient" @click="descargar(file)">Descargar</v-btn>
              <img class="img-pdf" src="@/assets/img_119919.png" alt="">
              <v-list-tile-title
            v-text="file"
          />
               </v-list-tile>
            <br>
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

export default {
  name: 'user-profile',
  data () {
    return {
      dateCreation: "12/12/2018",
      dateLimit: "12/07/2019",
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 256,
          acceptedFiles: ".pdf",
          parallelUploads: 1
      }
    }
  },
  components: {
    'material-card': MaterialCard
  },
  created() {
    this.proposalId = this.$route.params.id;
    this.getProposal();
  },
  methods: {
    ...mapActions([
      'getProposal'
    ]),
    forceFileDownload(url, name){
      const link = document.createElement('a')
      //console.log(link)
      //url = "../../../../" + url
      console.log(url)
      link.href = url

      link.setAttribute('download', name)
      console.log(link)
      document.body.appendChild(link)
      link.click()
    },
    descargar(file){
      let formData = new FormData();
      formData.append('proposalId', this.proposalIdStr);
      formData.append('fileName', file);
      axios
      .post('http://localhost:9000' + '/upload/getfile', formData)
      .then(response => {
        console.log(response.data)
        this.forceFileDownload(response.data, file)
      })
      .catch(() => console.log('No se encontro el archivo'))
    }
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
