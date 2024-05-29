import { check, validationResult } from "express-validator";
import { Property, Category, Price } from "../models/index.js";

const home = async (req, res) => {
    const [categories, prices, casas, departamentos] = await Promise.all([
        Category.findAll({ raw: true }),
        Price.findAll({ raw: true }),
        Property.findAll({
            limit: 3,
            where: {
                categoryId: 1,
            },
            include: [{ model: Price, as: "price" }],
            order: [["createdAt", "DESC"]],
        }),
        Property.findAll({
            limit: 3,
            where: {
                categoryId: 2,
            },
            include: [{ model: Price, as: "price" }],
            order: [["createdAt", "DESC"]],
        }),
    ]);

    res.render("home", {
        title: "Inicio",
        categories,
        prices,
        casas,
        departamentos,
    });
};
const categories = (req, res) => {
    res.send("Categorias");
};

const notFound = (req, res) => {
    res.send("404");
};
const search = (req, res) => {
    res.send("Buscador");
};

export { home, categories, notFound, search };
