<template>
  <v-toolbar color="blue" id="nav">
    <v-btn dark large flat to="/">Home</v-btn>
    <v-btn dark large flat to="/rooms">Habitaciones (DIINF)</v-btn>    
    <v-btn dark large flat to="/guests">Huéspedes</v-btn>
    <v-btn dark large flat to="/reservations">Reservas</v-btn>
  </v-toolbar>
</template>

<script>

export default {
  name: 'Nav',
  data () {
    return {
      //
    }
  }
}
</script>