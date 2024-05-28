import { validationResult } from "express-validator";
import { Property, Category, Price } from "../models/index.js";

const admin = async (req, res) => {
    const { id } = req.user;
    const properties = await Property.findAll({
        where: {
            userId: id,
        },
        include: [
            {
                model: Category,
                as: "category",
            },
            {
                model: Price,
                as: "price",
            },
        ],
    });
    res.render("properties/admin", {
        title: "Mis propiedades",
        header: true,
        properties,
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

const addImage = async (req, res) => {
    const { id } = req.params;

    //Validations
    const property = await Property.findByPk(id);
    if (!property) {
        return res.redirect("/myProperties");
    }

    if (property.published) {
        return res.redirect("/myProperties");
    }

    if (property.userId !== req.user.id) {
        return res.redirect("/myProperties");
    }

    //Render View
    res.render("properties/addImage", {
        title: `Agregar Imagen: ${property.headline}`,
        csrfToken: req.csrfToken(),
        property,
    });
};
const saveImage = async (req, res, next) => {
    //Validations
    const { id } = req.params;

    //Validations
    const property = await Property.findByPk(id);
    if (!property) {
        return res.redirect("/myProperties");
    }

    if (property.published) {
        return res.redirect("/myProperties");
    }

    if (property.userId !== req.user.id) {
        return res.redirect("/myProperties");
    }
    try {
        //Save image & publish property
        property.image = req.file.filename;
        property.published = 1;
        await property.save();
        next();
    } catch (error) {
        console.log(error);
    }
};
export { admin, create, save, addImage, saveImage };
