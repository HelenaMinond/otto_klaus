import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from "firebase";
import router from "@/router";
import axios from "axios";

Vue.use(Vuex)

function funcJuguetes() {
  return {
    id: null,
    data: {
      codigo: "",
      nombre: "",
      precio: 0,
      stock: 0
    }
  };
};

export default new Vuex.Store({
  state: {
    user: "", 
    pass: "",
    arrJuguetes: [],
    MostrarJuguetes: false,
    InsertarJuguetes: false,
    dataVaciaJuguetes: funcJuguetes()
  },
  mutations: {
    cargaUser(state, user) {
      state.user = user;
    },
    cargaPass(state, pass) {
      state.pass = pass;
    },
    agregarDataJuguetes(state) { 
      const prodVacio = funcJuguetes(); 
      state.dataVaciaJuguetes.id = null 
      Object.keys(prodVacio.data).forEach(key => { 
        state.dataVaciaJuguetes.data[key] = prodVacio.data[key] 
      })
    },
    getJuguetesMut(state, data) {
      state.arrJuguetes = data
    }, 
    displayMostrarMut(state) { 
      state.MostrarJuguetes = true 
    }, 
    hideMostrarMut(state) { 
      state.MostrarJuguetes = false 
    }, 
    updateCodigoMut(state, codigo) { 
      state.dataVaciaJuguetes.data.codigo = codigo 
    }, 
    updateNombreMut(state, nombre) { 
      state.dataVaciaJuguetes.data.nombre = nombre 
    }, 
    updatePrecioMut(state, precio) { 
      state.dataVaciaJuguetes.data.precio = precio 
    }, 
    updateStockMut(state, stock) { 
      state.dataVaciaJuguetes.data.stock = stock 
    }, 
    getIdJuguetesMut(state, toy) { 
      state.dataVaciaJuguetes = toy 
    }, 
    displayInsertarMut(state) { 
      state.InsertarJuguetes = true 
    }, 
    hideInsertarMut(state) { 
      state.InsertarJuguetes = false 
    }, 
  },
  actions: {
    login({ state }){
      Firebase.auth().signInWithEmailAndPassword(state.user, state.pass)
      .then(() =>{
        router.push("home")
        alert("Bienvenido(a)")
      })
      .catch(()=>{
        alert("Ingrese correo y contraseña correcta.")
      })
    },
    getJuguetes({ commit }){ 
      commit("displayInsertarMut") 
      axios.get("https://us-central1-otto-klaus-99dfe.cloudfunctions.net/productos/productos")
      .then(response => {
        commit("agregarDataJuguetes") 
        commit("getJuguetesMut", response.data) 
      })
      .finally(()=> {
        commit("hideInsertarMut") 
      })
    },
    displayMostrar({ commit }) {
      commit("displayMostrarMut")
    }, 
    cancelar({ commit }) { 
      commit("hideMostrarMut") 
      commit("agregarDataJuguetes") 
    },
    hideMostrar({ commit }) {
      commit("hideMostrarMut")
    }, 
    updateCodigo({ commit }, codigo) { 
      commit("updateCodigoMut", codigo)
    }, 
    updateNombre({ commit }, nombre) {
      commit("updateNombreMut", nombre)
    }, 
    updatePrecio({ commit }, precio) { 
      commit("updatePrecioMut", precio)
    }, 
    updateStock({ commit }, stock) { 
      commit("updateStockMut", stock)
    }, 
    postJuguetes({ dispatch, state }) { 
      axios.post("https://us-central1-otto-klaus-99dfe.cloudfunctions.net/productos/producto", 
      state.dataVaciaJuguetes.data) 
      .then(() =>{
        dispatch("getJuguetes") 
      })
    },
    deleteJuguetes({ dispatch }, id) { 
      axios.delete(`https://us-central1-otto-klaus-99dfe.cloudfunctions.net/productos/producto/${id}`)
      .then(()=>{
        dispatch("getJuguetes") 
      })
    },
    getIdJuguetes({ commit }, id) { 
      commit("displayInsertarMut") 
      axios.get(`https://us-central1-otto-klaus-99dfe.cloudfunctions.net/productos/producto/${id}`)
      .then((response)=>{
        commit("getIdJuguetesMut", response.data) 
      })
      .finally(() => {
        commit("hideInsertarMut") 
      })
    },
    updateJuguetes({state, dispatch}, id) { 
      axios.put(`https://us-central1-otto-klaus-99dfe.cloudfunctions.net/productos/producto/${id}`, state.dataVaciaJuguetes.data)
      .then(()=>{
        dispatch("getJuguetes") 
      })
    },
  },
});

//https://us-central1-otto-klaus-99dfe.cloudfunctions.net/productos