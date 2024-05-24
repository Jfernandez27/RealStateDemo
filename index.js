// const express = require('express'); //CommonJS
import express from "express";
import userRoutes from "./routes/userRoutes.js";

//Crear la app
const app = express();

//Habilitar PUG
app.set("view engine", "pug");
app.set("views", "./views");

//Public Folder
app.use(express.static('public'))

//Routing
app.use("/auth", userRoutes);

//Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
  console.log(`El Servidor está funcionando en el puerto ${port}`);
});
