import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
    home,
    categories,
    notFound,
    search,
} from "../controllers/appController.js";

const router = express.Router();

//Home Page
router.get("/", home);

//Categories
router.get("/categories/:id", categories);

//404 Page
router.get("/404", notFound);

//Search
router.post("/search", search);

export default router;
