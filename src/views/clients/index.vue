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
                <div class="headline font-weight-black text-uppercase">{{ client.name }}</div>
                <br>
                <span class="grey--text">I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.

                </span>
                <br>
                <br>
                <v-icon class="icon-label" >label</v-icon>
                <span class="font-weight text-capitalize">Empresa: {{ client.company }}</span>
                <br>
                <v-icon class="icon-label" >label</v-icon>
                <span class="font-weight text-capitalize">Valoración: {{ client.score }}</span>
                
                <br>
                <br>
                <br>
                <span class="font-weight text-capitalize">Valorar</span>
                <v-btn color="success" @click="valorar(1)">1</v-btn>
                <v-btn color="success" @click="valorar(2)">2</v-btn>
                <v-btn color="success" @click="valorar(3)">3</v-btn>
                <v-btn color="success" @click="valorar(4)">4</v-btn>
                <v-btn color="success" @click="valorar(5)">5</v-btn>
                <br>
                  <v-flex xs6>
                <v-select
                  :items=this.nameProposals
                  label="Propuestas"
                ></v-select>
                </v-flex>
                <br>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
            </v-card-actions>
            <div class="text-xs-center">
                <v-btn round class ="font-light buttonClient" :to="{name: 'home'}">Ir a Propuestas</v-btn>
                <v-btn round class ="font-light buttonClient" :to="{name: 'clients'}">Ir a Clientes</v-btn>
            </div>
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

export default {
  name: 'user-profile',
  data () {
    return {
      client:[],
      clientId: "",
      proposals: [],
      nameProposals: []
    }
  },
  components: {
    'material-card': MaterialCard
  },
  created() {
    this.client = this.$route.params.client;
    this.clientId = this.$route.params.clientId;
    this.proposals = this.$route.params.client.proposals;
    this.nameProposals = this.proposals
    this.nameProposals.forEach((num, index) => {
    return this.nameProposals[index] = num.name;
    });
  },
  methods:{
    valorar(score){
      let formData = new FormData();
      formData.append('clientId', this.client.idStr);
      formData.append('name', this.client.name);
      formData.append('company', this.client.company);
      formData.append('score', score);
      axios
      .put(this.serverURL + '/clients/', formData)
      .then(response => {
        this.client.name = response.data.name
        this.client.company = response.data.company
        this.client.score = response.data.score
        console.log(response)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
    },
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
