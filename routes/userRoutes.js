import express from "express";
import {
    loginForm,
    registerForm,
    register,
    confirm,
    forgotPasswordForm,
    resetPassword,
    tokenCheck,
    newPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/login", loginForm);
router.get("/register", registerForm);
router.post("/register", register);
router.get("/confirm/:token", confirm);
router.get("/passwordRecovery", forgotPasswordForm);
router.post("/passwordRecovery", resetPassword);

//Password Reset
router.get("/passwordRecovery/:token", tokenCheck);
router.post("/passwordRecovery/:token", newPassword);

// router
//   .route("/")
//   .get((req, res) => { //Tipo Arrow function
//     res.json({ msg: "Hola Mundo en express" });
//   })
//   .post(function (req, res) { //Tipo Callback
//     res.json({ msg: "Respuesta de Prueba" });
//   });

export default router;
