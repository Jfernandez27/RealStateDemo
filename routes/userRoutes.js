import express from "express";
import {
    loginForm,
    registerForm,
    register,
    confirm,
    forgotPasswordForm,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/login", loginForm);
router.get("/register", registerForm);
router.post("/register", register);
router.get("/confirm/:token", confirm);
router.get("/forgot-password", forgotPasswordForm);

// router
//   .route("/")
//   .get((req, res) => { //Tipo Arrow function
//     res.json({ msg: "Hola Mundo en express" });
//   })
//   .post(function (req, res) { //Tipo Callback
//     res.json({ msg: "Respuesta de Prueba" });
//   });

export default router;
