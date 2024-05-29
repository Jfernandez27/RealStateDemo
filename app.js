// const express = require('express'); //CommonJS
import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
import appRoutes from "./routes/appRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config({ path: ".env" });

//Crear la app
const app = express();

//Habilitar lectura de datos desde formularios
app.use(express.urlencoded({ extended: true }));

//Habilitar Cookie Parser
app.use(cookieParser());

//Habilitar CSRF
app.use(csrf({ cookie: true }));

//Conexion a la Base de datos
try {
    await db.authenticate();
    db.sync();
    console.log("Conexion Correcta a la base de datos");
} catch (error) {
    console.log(error);
}

//Habilitar PUG
app.set("view engine", "pug");
app.set("views", "./views");

//Public Folder
app.use(express.static("public"));

//Routing
app.use("/", appRoutes);
app.use("/auth", userRoutes);
app.use("/", propertyRoutes);
app.use("/api", apiRoutes);

//Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`El Servidor está funcionando en el puerto ${port}`);
});
