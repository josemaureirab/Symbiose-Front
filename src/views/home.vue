<template>
  <div id="home">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="propo in proposalList" :key="propo.idStr" sm12 xs12 lg4>
          <home-proposals :proposal="propo"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations, mapActions } from "vuex";
import Proposals from '@/components/home/proposals'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'home',
  components: {
    'home-proposals': Proposals,
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
      files: [],
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
  created() {
    this.getAllProposals()
  },
  computed: {
    ...mapState(["proposalList"]),
  },
  methods: {
    ...mapActions(["getAllProposals"])
  }
}
</script>