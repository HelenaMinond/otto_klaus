<template>
  <v-container>
    <!-- Tabla de juguetes -->
    <v-simple-table>
      <template>
         <!-- Encabezados -->
        <thead>
          <tr>
            <th><h2>Código</h2></th>
            <th><h2>Nombre</h2></th>
            <th><h2>Código</h2></th>
            <th><h2>Precio</h2></th>
            <th><h2>Acciones</h2></th>
          </tr>
        </thead>
        <!-- Información de la tabla -->
        <tbody>
          <tr v-for="val in arrJuguetes" :key="val.id">
            <td>{{ val.data.codigo }}</td>
            <td>{{ val.data.nombre }}</td>
            <td>{{ val.data.precio }}</td>
            <td>{{ val.data.stock }}</td>
            <td class="button">
              <v-btn class="error mx-2" @click="eliminar(val.id)">eliminar</v-btn>
              <v-btn class="success mx-2" @click="editar(val.id)">editar</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["arrJuguetes"]),
  },
  methods: {
    ...mapActions(["getJuguetes", "deleteJuguetes", "getIdJuguetes", "displayMostrar"]),
    eliminar(id) {
      let confirmation = confirm("¿Está seguro de eliminar?")
      if (confirmation) {
        this.deleteJuguetes(id)
      }
    },
    editar(id) {
      this.getIdJuguetes(id)
      this.displayMostrar()
    }
  },
  created() {
    this.getJuguetes()
  },
};
</script>