import express from "express";
import { body } from "express-validator";
import protectRoute from "../middlewares/protectRoute.js";
import { admin, create, save } from "../controllers/propertyController.js";

const router = express.Router();

router.get("/myProperties", protectRoute, admin);

router.get("/properties/create", protectRoute, create);
router.post(
    "/properties/create",
    protectRoute,
    body("headline")
        .notEmpty()
        .withMessage("El titular de la Propiedad es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripcion no debe estar vacia")
        .isLength({ max: 1000 })
        .withMessage("La descripcion no puede tener mas de 1000 carácteres"),
    body("category").isNumeric().withMessage("Seleccione una categoria"),
    body("price").isNumeric().withMessage("Seleccione un rango de precios"),
    body("bedrooms")
        .isNumeric()
        .withMessage("Seleccione la cantidad de dormitorios"),
    body("bathrooms")
        .isNumeric()
        .withMessage("Seleccione la cantidad de baños"),
    body("parkings")
        .isNumeric()
        .withMessage("Seleccione la cantidad de estacionamientos"),
    body("lat").notEmpty().withMessage("Ubica la Propiedad en el Mapa"),
    save
);

export default router;
