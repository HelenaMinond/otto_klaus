<template>
  <v-app class="login">
    <v-card width="350" class="mx-auto my-auto">
      <v-card-text>
        <!-- Titulo -->
        <h1 class="text-md-center my-5">Otto Klaus</h1>
        <!-- Formulario -->
        <v-form class="px-3">
          <v-text-field label="Correo" v-model="user"/>
          <v-text-field label="Contraseña" :type="showPass ? 'text' : 'password'" v-model="pass"/>
        </v-form>
        <!-- Botón -->
        <v-card-actions class="mt-3">
          <v-flex text-md-center>
            <v-btn color="warning" @click="login">ingresar</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    showPass: false,
  }),
  computed: {
    user: {
      get() {
        return this.$store.state.user;
      },
      set(value) {
        this.$store.commit("cargaUser", value);
      },
    },
    pass: {
      get() {
        return this.$store.state.pass
      },
      set(value) {
        this.$store.commit("cargaPass", value);
      },
    },
  },
  methods: {
    ...mapActions(["login"]),
  },
};
</script>

<style scoped>
.login{
  background: url("/img/background-login.jpg") no-repeat center;
  background-size: cover;
}
</style>
