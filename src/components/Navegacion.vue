<template>
  <v-card class="overflow-hidden">
    <v-app-bar absolute color="teal lighten-3" dark>
      <!-- Titulo -->
      <div><h2>Otto Klaus</h2></div>
      <v-spacer></v-spacer>
      <!-- Botón -->
      <v-btn text @click="logout">Cerrar Sesión</v-btn>
    </v-app-bar>
    <v-sheet>
      <v-container style="height: 60px;"></v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import Firebase from 'firebase';

export default {
  methods: {
    logout() {
      Firebase.auth().signOut().then(() => {
        this.$router.push('/login')
      })
    }
  },
};
</script>