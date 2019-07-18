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
                <div class="headline font-weight-black text-uppercase">{{ proposal.name }}</div>
                <br>
                <span class="grey--text"> {{proposal.description}}
                </span>
                <br>
                <br>
                <v-icon class="icon-label" >label</v-icon>
                <span class="font-weight text-capitalize">Fecha de creación: {{ proposal.created }}</span>
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
            <div class="text-xs-center">
              <v-btn round class ="font-light buttonClient" :to="{name: 'home'}">Volver a Propuestas</v-btn>
            </div>
            
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
            <v-btn round class ="font-light buttonClient" :to="{name: 'client_detail', params: {client: client}}">Ver Cliente</v-btn>
          </v-card-text>
        </material-card>

        <material-card class="v-card-profile">
          <v-card-text class="text-xs-center">
            <h4 class="font-weight text-capitalize">Archivos asociados:</h4>
            <img class="img-pdf" src="@/assets/img_119919.png" alt="">

              <v-list-tile
                v-for="(file, i) in this.proposal.files"
                :key="i"
                :to="file.to"
                avatar
                class="v-list-item"
                exact
                >


                <br>
              <!-- <v-btn round class="font-light buttonClient" @click="descargar(file)">Descargar</v-btn> -->
              <a href="static/5d30daf4c862f907461fb18d_0.pdf" download="5d30daf4c862f907461fb18d_0.pdf">0</a>
              <a href="/static/5d30daf4c862f907461fb18d_0.pdf" download="5d30daf4c862f907461fb18d_0.pdf">1</a>
              <a href="../static/5d30daf4c862f907461fb18d_0.pdf" download="5d30daf4c862f907461fb18d_0.pdf">2</a>
              <a href="../../static/5d30daf4c862f907461fb18d_0.pdf" download="5d30daf4c862f907461fb18d_0.pdf">3</a>
              <a href="../../../static/5d30daf4c862f907461fb18d_0.pdf" download="5d30daf4c862f907461fb18d_0.pdf">4</a>
              <a href="@/assets/static/5d30daf4c862f907461fb18d_0.pdf" download="5d30daf4c862f907461fb18d_0.pdf">5</a>



              <!-- <v-btn round class="font-light buttonClient" @click="descargar(file)">Descargar</v-btn> -->
              <!-- <v-list-tile-title v-text="file"/> -->


               </v-list-tile>

            <br>
            <v-btn color="primary" @click="generar()">Descargar propuesta pdf</v-btn>
            <v-btn color="primary" :to="{name: 'trace', params: {id: proposal.idStr}}">Ver historial de cambios</v-btn>
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
  name: 'proposal-detail',
  data () {
    return {
      proposal: [],
      dateCreation: "12/12/2018",
      dateLimit: "12/07/2019",
      arreglo: [1,2,3,4,5,6],
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 256,
          acceptedFiles: ".pdf",
          parallelUploads: 1
      },
      client: [],
      ruta: ""
    }
  },
  components: {
    'material-card': MaterialCard
  },
  created() {
    this.proposal = this.$route.params.proposal
  },
  mounted(){
  this.getClient();
  },
  methods: {
    ...mapActions([
      'getProposal'
    ]),
    forceFileDownload(url, name){
      console.log("url")
      console.log(url)
      console.log("name")
      console.log(name)
      const link = document.createElement('a')
      console.log(url)
      link.href = url

      link.setAttribute('download', name)
      console.log(link)
      document.body.appendChild(link)
      link.click()
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
    },
    descargar(file){
      this.forceFileDownload(this.ruta+"static"+file, file)
      // let formData = new FormData();
      // formData.append('proposalId', this.proposalId);
      // formData.append('fileName', file);
      // axios
      // .post(this.serverURL + '/upload/getfile', formData)
      // .then(response => {
      //   console.log(response.data)
      //   this.forceFileDownload(response.data, file)
      // })
      // .catch(() => console.log('No se encontro el archivo'))
    },
    generar(){
      let formData = new FormData();
      formData.append('proposalId', this.proposal.idStr);
      axios
      .post(this.serverURL + '/pdfreport/', formData)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
      const link = document.createElement('a')
      link.href = "/static/" + "generatedPdf_" + this.proposal.idStr + ".pdf";
      console.log(link.href)
      link.setAttribute('download', name)
      console.log(link)
      document.body.appendChild(link)
      link.click()
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
