<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    target="_blank"
                    slot="activator"
                  >
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model=userName></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model=userPass></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="logear()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>


<script>

/* eslint-disable */

import axios from 'axios';
import router from '@/router';
import { mapState, mapActions } from 'vuex'
import { Script } from 'vm';

export default {
  name: "login",
  data () {
    return {
      userName: "",
      userPass: ""
    }
  },
  created() {
    this.userName = "",
    this.userPass = ""
  },
  methods: {
    logear(){
      let formData = new FormData();
      formData.append('user', this.userName);
      formData.append('pass', this.userPass);
      console.log(this.userName)
      console.log(this.userPass)
      axios
      .put(this.serverURL + '/users/login', formData)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
    }
  },
  computed: {
    ...mapState([
      'serverURL'  
    ])
  }
}
</script>