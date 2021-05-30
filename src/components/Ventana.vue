<template>
  <v-container>
    <!-- Ventana emergente -->
    <v-dialog :value="MostrarJuguetes" width="400" >
      <v-card>
        <v-container class="px-5 py-5">
          <v-text-field placeholder="Codigo" type="text" :value="dataVaciaJuguetes.data.codigo" @input="updateCodigo"/>
          <v-text-field placeholder="Nombre" type="text" :value="dataVaciaJuguetes.data.nombre" @input="updateNombre"/>
          <v-text-field placeholder="Precio" type="number" :value="dataVaciaJuguetes.data.precio" @input="updatePrecio"/>
          <v-text-field placeholder="Stock" type="number" :value="dataVaciaJuguetes.data.stock" @input="updateStock"/>
        </v-container>
        <v-card-actions class="px-5 py-5">
          <v-btn color="error" @click="cancelar">cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="enviar">aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["MostrarJuguetes", "dataVaciaJuguetes"]),
  },
  methods: {
    ...mapActions(["hideMostrar", "updateCodigo", "updateNombre", "updatePrecio", "updateStock", "postJuguetes", "updateJuguetes", "cancelar"]),
    enviar(){
      if (this.dataVaciaJuguetes.id) {
        this.updateJuguetes(this.dataVaciaJuguetes.id)
      }else{
        this.postJuguetes()
      }
      this.hideMostrar()
    },
  },
}
</script>