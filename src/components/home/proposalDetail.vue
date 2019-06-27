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
                <div class="headline">{{ proposal.name }}</div>
                <span class="grey--text"> {{ proposalId }}</span>
                <br>
                <span class="grey--text">Death line</span>

            </div>
            </v-card-title>
              

            <v-card-actions>
            
            <v-spacer></v-spacer>
            
            </v-card-actions>

            <v-slide-y-transition>
            <v-card-text v-show="show">
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
            </v-slide-y-transition>
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
            <h6 class="category text-gray font-weight-thin mb-3">CLIENTE</h6>
            <h4 class="card-title font-weight-light">Nombre Cliente</h4>
            <p class="card-description font-weight-light">Empresa Cliente</p>
            <p class="card-description font-weight-light">Nº de Proyectos</p>
            <v-btn
              color="success"
              round
              class="font-weight-light"
            >Ver Cliente</v-btn>
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
      dateLimit: "12/07/2019"
    }
  },
  components: {
    'material-card': MaterialCard
  },
  created() {
    this.proposalId = this.$route.params.id
    this.getProposal()
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


</style>
