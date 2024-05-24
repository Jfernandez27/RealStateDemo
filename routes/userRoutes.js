import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.get("/olvide-password", formularioOlvidePassword);

// router
//   .route("/")
//   .get((req, res) => { //Tipo Arrow function
//     res.json({ msg: "Hola Mundo en express" });
//   })
//   .post(function (req, res) { //Tipo Callback
//     res.json({ msg: "Respuesta de Prueba" });
//   });

export default router;
