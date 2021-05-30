const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const express = require("express");
const cors = require("cors");

const router = express();
router.use(cors({ origin: true }));

// Seteo de las diferentes request de un CRUD

// Obtener un producto según un id
router.get("/producto/:id", async(req, res) => {
  const producto = await admin.firestore().collection("productos").doc(req.params.id).get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      return { id:doc.id, data: doc.data()}
    } else {
      console.log("No such document!");
      return {}
    }
  });
  res.send(producto);
});

//Obtener todos los productos
router.get("/productos", async(req, res) => {
  const productos = await admin.firestore().collection("productos").get();
  var lista = [];
  productos.docs.forEach(doc => {
    lista.push({ id: doc.id, data: doc.data() });
  });
  res.send(lista);
});

//Crear un producto
router.post("/producto", async(req, res) => {
  const producto = await admin.firestore().collection("productos").add(req.body)
  .then(docRef => {
    return docRef.id
  });
  res.send(producto);
});
    
//Editar producto según id
router.put("/producto/:id", async(req, res) => {
  const producto = await admin.firestore().collection("productos").doc(req.params.id).update(req.body)
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      return doc.data()
    } else {
      console.log("No such document!");
      return {}
    }
  });
  res.send(producto);
});
    
//Eliminar producto
router.delete("/producto/:id", async(req, res) => {
  const producto = await admin.firestore().collection("productos").doc(req.params.id).delete();
  res.send(producto);
});

//Exportación de cloud function
exports.productos = functions.https.onRequest(router);
