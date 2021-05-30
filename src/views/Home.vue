<template>
  <div>
    <!-- Barra de navegación -->
    <Navegacion/>
    <!-- Contenido vista -->
    <v-container>
      <!-- Título -->
      <h1 class="text-center my-3">Listado de juguetes</h1>
      <!-- Cambio de estado -->
      <v-overlay :value="InsertarJuguetes">
        <!-- BORRRAR <v-progress-circular indeterminate size="64"></v-progress-circular> -->
      </v-overlay>
      <Ventana/>
      <!-- Botón -->
      <v-btn class="warning mb-5" @click="displayMostrar">agregar juguete</v-btn>
      <!-- Listado juguetes -->
      <v-card class="mx-auto mt-5">
        <Listado/>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Navegacion from "../components/Navegacion";
import Ventana from "../components/Ventana";
import Listado from "../components/Listado";
import { mapState, mapActions } from "vuex";

export default {
  components:{
    Navegacion,
    Ventana,
    Listado,
  },
  computed: {
    ...mapState(["InsertarJuguetes"]),
  },
  methods: {
    ...mapActions(["displayMostrar"]),
  },
}
</script>