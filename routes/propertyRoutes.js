import express from "express";
import { admin, create } from "../controllers/propertyController.js";

const router = express.Router();

router.get("/myProperties", admin);
router.get("/properties/create", create);

export default router;
