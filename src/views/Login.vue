<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Inicio de Sesión</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form @keyup.native.enter="logear()">
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model=userName></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model=userPass ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="logear()">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
            <v-snackbar
                v-model="snackbar"
                :color="color"
                :multi-line="mode === 'multi-line'"
                :timeout="timeout"
                :vertical="mode === 'vertical'"
              >
                {{ text }}
                <v-btn
                  dark
                  flat
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </v-snackbar>

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
      userPass: "",
       snackbar: false,
        color: 'error',
        mode: '',
        timeout: 6000,
        text: 'Usuario no registrado'
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
        console.log(this)
        this.$store.commit('updateLogueado', 'si')
        this.$store.commit('updateUser', this.userName)
        this.$store.commit('updateUserId', response.data.idStr)
        console.log(response)

      })
      .catch(e => {
        this.snackbar = true
        console.log(e)
        console.log(e.response)
      })
    }
  },
  computed: {
    ...mapState([
      'serverURL'
    ]),
    logueado: {
      get () {
        return this.$store.state.logueado;
      },
      set (payload) {
        this.$store.commit('updateLogueado', payload)
      }
    },
    user: {
      get () {
        return this.$store.state.userName;
      },
      set (payload) {
        this.$store.commit('updateUser', payload)
      }
    }
  }
}
</script>