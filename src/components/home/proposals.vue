<template>
   <v-container fluid>
     <v-layout row>
        <v-flex v-for="item in proposalList" :key="item.id" xs4>
            <v-card class="cardProposal">
                <v-img
                    src="https://mattolpinski.com/wp-content/uploads/2017/12/proposal-teaser.jpg"
                    height="200px"
                    >
                </v-img>

                <v-card-title primary-title>
                <div>
                    <div class="headline">{{item.name}}</div>
                    <span class="grey--text">{{item._id}}</span>
                </div>
                </v-card-title>

                <v-card-actions>
                <v-btn flat>Ingresar</v-btn>
                <v-btn flat color="purple">Editar</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
                </v-card-actions>

                <v-slide-y-transition>
                <v-card-text v-show="show">
                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                </v-card-text>
                </v-slide-y-transition>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
      show: false
    }),
  created() {
    this.getAllProposals()
  },
  computed: {
    ...mapState(["proposalList"])
  },
  methods: {
    ...mapActions(["getAllProposals"]),
  }
};
</script>

<style lang="scss" scoped>
  
.cardProposal{
  margin-right: 5% !important;
}


</style>

