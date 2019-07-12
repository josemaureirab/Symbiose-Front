<template>
  <div id="home">
    <vueDropzone id="dropzone" name="" :options ="dropzoneOptions"/>
    <v-btn color="success" @click="handleFileUpload()">Subir</v-btn>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="proposal in proposalList" :key="proposal.id" sm12 xs12 lg4>
          <home-proposals :proposals="proposal"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
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
          //renameFile: proposal._id
      }
    }
  },
  created() {
    this.getAllProposals()
  },
  mounted() {
    var dropzoneVue = document.getElementById("dropzone").dropzone;
    dropzoneVue.on("addedfiles", function(files) {
      console.log(files);
    });
  },
  computed: {
    ...mapState(["proposalList"]),
  },
  methods: {
    ...mapActions(["getAllProposals"])
  }
}
</script>