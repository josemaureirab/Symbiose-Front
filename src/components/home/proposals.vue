<template>
  <v-hover>
    <v-card 
    slot-scope="{ hover }"
    :class="`elevation-${hover ? 12 : 2}`"
    class="cardProposal">
        <v-img
            src="https://mattolpinski.com/wp-content/uploads/2017/12/proposal-teaser.jpg"
            height="200px"
            >
        </v-img>

        <v-card-title primary-title>
        <div>
            <div class="headline">{{proposal.name}}</div>
            <span class="grey--text">{{proposal.description}}</span>
        </div>
        </v-card-title>

        <v-card-actions>
        <v-btn flat :to="{name: 'proposal_detail', params: {proposal: proposal, id: proposal.idStr}}">Ingresar</v-btn>
        <v-btn flat color="blue" :to="{name: 'proposal_edit', params: {description: proposal.description, id: proposal.idStr, name: proposal.name, clientId: proposal.clientIdStr}}">Editar</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
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
    "proposal"
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

