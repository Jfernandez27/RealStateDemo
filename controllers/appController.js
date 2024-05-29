import { Sequelize } from "sequelize";
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
        csrfToken: req.csrfToken(),
    });
};
const categories = async (req, res) => {
    const { id } = req.params;

    //Validations
    const category = await Category.findByPk(id);
    if (!category) {
        return res.redirect("/404");
    }

    //Get Properties
    const properties = await Property.findAll({
        limit: 5,
        where: {
            categoryId: id,
        },
        include: [{ model: Price, as: "price" }],
        order: [["createdAt", "DESC"]],
    });

    res.render("category", {
        title: `${category?.name}s en Venta`,
        category,
        properties,
        csrfToken: req.csrfToken(),
    });
};

const notFound = (req, res) => {
    res.render("404", {
        title: "No Encontrada",
        csrfToken: req.csrfToken(),
    });
};
const search = async (req, res) => {
    const { term } = req.body;

    if (!term.trim()) {
        return res.redirect("back");
    }

    //Get Properties
    const properties = await Property.findAll({
        where: {
            headline: { [Sequelize.Op.like]: "%" + term + "%" },
            // street: { [Sequelize.Op.like]: "%" + term + "%" },
        },
        include: [{ model: Price, as: "price" }],
    });

    res.render("search", {
        title: `Resultados de la Busqueda: ${term}`,
        properties,
        csrfToken: req.csrfToken(),
    });
};

export { home, categories, notFound, search };
