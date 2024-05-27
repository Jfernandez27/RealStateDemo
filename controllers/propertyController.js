import { validationResult } from "express-validator";
import { Property, Category, Price } from "../models/index.js";

const admin = (req, res) => {
    res.render("properties/admin", {
        title: "Mis propiedades",
        header: true,
    });
};

const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
]);

const create = async (req, res) => {
    //Get Categories & prices
    // const [categories, prices] = await Promise.all([
    //     Category.findAll(),
    //     Price.findAll(),
    // ]);
    res.render("properties/create", {
        title: "Crear Propiedad",
        header: true,
        csrfToken: req.csrfToken(),
        categories,
        prices,
        data: {},
    });
};

const save = async (req, res) => {
    //Validate
    let result = validationResult(req);

    if (!result.isEmpty()) {
        res.render("properties/create", {
            title: "Crear Propiedad",
            header: true,
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: result.array(),
            data: req.body,
        });
    }

    //Save
    const {
        headline,
        description,
        bedrooms,
        bathrooms,
        parkings,
        street,
        lat,
        lng,
        category: categoryId,
        price: priceId,
    } = req.body;
    const { id: userId } = req.user;
    try {
        const savedProperty = await Property.create({
            headline,
            description,
            bedrooms,
            bathrooms,
            parkings,
            street,
            lat,
            lng,
            image: "",
            userId,
            categoryId,
            priceId,
        });

        if (savedProperty) {
            const { id } = savedProperty;
            res.redirect(`/properties/addImage/${id}`);
        } else {
            res.redirect("/properties/create");
        }
    } catch (error) {
        console.log(error);
    }
};
export { admin, create, save };
