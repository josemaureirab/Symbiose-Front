<template>
  <v-hover>
    <v-card 
    slot-scope="{ hover }"
    :class="`elevation-${hover ? 12 : 2}`"
    class="cardProposal">
        <v-img
            src="https://i1.wp.com/actualidadempresa.com/wp-content/uploads/2017/04/CALIDAD-SERVICIO-COMUNICACION-TOTAL.jpg?resize=696%2C392"
            height="200px"
            >
        </v-img>

        <v-card-title primary-title>
        <div>
            <div class="headline text-sm-left">{{client.name}}</div>
            <p class="grey--text text-sm-left">Empresa: {{client.company}}</p>
            <p class="grey--text text-sm-left">Valoración: {{client.score}}</p>
        </div>
        </v-card-title>
        
        <v-card-actions>
            <br>
             <v-btn flat :to="{name: 'client_detail', params: {client: client,  clientId: client.idStr}}">Ver Cliente</v-btn>
        <v-spacer></v-spacer>
       
        </v-card-actions>

        <v-slide-y-transition>
        <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
        </v-slide-y-transition>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: [
    "client"
  ],
  data: () => ({
      show: false
    }),
};
</script>

<style lang="scss" scoped>
  
.cardProposal{
  margin-right: 5% !important;
}



</style>

