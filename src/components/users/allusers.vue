<template>
  <v-hover>
    <v-card 
    slot-scope="{ hover }"
    :class="`elevation-${hover ? 12 : 2}`"
    class="cardProposal">
        <v-img
            src="https://miro.medium.com/max/1200/1*BIJ5kkEkHkzraLDBSQD5_w.jpeg"
            height="200px"
            >
        </v-img>

        <v-card-title primary-title>
        <div>
            <div class="headline text-sm-left">Nombre: {{user.firstName}} {{user.lastName}}</div>
        </div>
        </v-card-title>
        
        <v-card-actions>
            <br>
       
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
    "user"
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

