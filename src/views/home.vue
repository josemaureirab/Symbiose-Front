<template>
  <div id="home">
    <vueDropzone id="dropzone" :options ="dropzoneOptions"/>
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
  mounted() {
    var dropzoneVue = document.getElementById("dropzone").dropzone;
    dropzoneVue.on("success", function(file) {
      let formData = new FormData();
      formData.append('file', file);
      //console.log(file.name)
      formData.append('name', file.name);
      console.log(formData);
      axios
      .post('http://localhost:9000/' + 'upload/', formData)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
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