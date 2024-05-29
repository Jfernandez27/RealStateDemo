import { unlink } from "node:fs/promises";
import { check, validationResult } from "express-validator";
import { Property, Category, Price, Message, User } from "../models/index.js";
import { isSeller, dateFormat } from "../helpers/commons.js";

const admin = async (req, res) => {
    //Validate queryString page
    const { page } = req.query;
    const regEx = /^[0-9]$/;
    if (!regEx.test(page)) {
        return res.redirect("/myProperties?page=1");
    }
    try {
        const { id } = req.user;

        //Limit & Offset
        const limit = 5;
        const offset = page * limit - limit;

        const [properties, total] = await Promise.all([
            Property.findAll({
                limit,
                offset,
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
                    {
                        model: Message,
                        as: "messages",
                    },
                ],
            }),
            Property.count({ where: { userId: id } }),
        ]);
        res.render("properties/admin", {
            title: "Mis propiedades",
            csrfToken: req.csrfToken(),
            properties,
            pages: Math.ceil(total / limit),
            page: Number(page),
            total,
            limit,
            offset,
        });
    } catch (error) {
        console.log(error);
    }
};

const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
]);

const create = async (req, res) => {
    // // Get Categories & prices
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

const edit = async (req, res) => {
    const { id } = req.params;
    //validations
    const property = await Property.findByPk(id);
    if (!property) {
        return res.redirect("/myProperties");
    }

    if (property.userId !== req.user.id) {
        return res.redirect("/myProperties");
    }

    res.render("properties/edit", {
        title: "Editar Propiedad",
        csrfToken: req.csrfToken(),
        categories,
        prices,
        property,
    });
};

const update = async (req, res) => {
    //Validations
    await check("headline")
        .notEmpty()
        .withMessage("El titular de la Propiedad es obligatorio")
        .run(req);
    await check("description")
        .notEmpty()
        .withMessage("La descripcion no debe estar vacia")
        .isLength({ max: 1000 })
        .withMessage("La descripcion no puede tener mas de 1000 carácteres")
        .run(req);
    await check("category")
        .isNumeric()
        .withMessage("Seleccione una categoria")
        .run(req);
    await check("price")
        .isNumeric()
        .withMessage("Seleccione un rango de precios")
        .run(req);
    await check("bedrooms")
        .isNumeric()
        .withMessage("Seleccione la cantidad de dormitorios")
        .run(req);
    await check("bathrooms")
        .isNumeric()
        .withMessage("Seleccione la cantidad de baños")
        .run(req);
    await check("parkings")
        .isNumeric()
        .withMessage("Seleccione la cantidad de estacionamientos")
        .run(req);
    await check("lat")
        .notEmpty()
        .withMessage("Ubica la Propiedad en el Mapa")
        .run(req);
    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render("properties/edit", {
            title: "Editar Propiedad",
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: result.array(),
            property: req.body,
        });
    }
    const { id } = req.params;
    //validations
    const property = await Property.findByPk(id);
    if (!property) {
        return res.redirect("/myProperties");
    }

    if (property.userId !== req.user.id) {
        return res.redirect("/myProperties");
    }
    //Update property
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

    try {
        property.set({
            headline,
            description,
            bedrooms,
            bathrooms,
            parkings,
            street,
            lat,
            lng,
            categoryId,
            priceId,
        });
        await property.save();
        res.redirect("/myProperties");
    } catch (error) {
        console.log(error);
    }
};
const deleting = async (req, res) => {
    const { id } = req.params;
    //validations
    const property = await Property.findByPk(id);
    if (!property) {
        return res.redirect("/myProperties");
    }

    if (property.userId !== req.user.id) {
        return res.redirect("/myProperties");
    }

    //Delete Image
    await unlink(`public/uploads/${property.image}`);

    // Delete Property
    property.destroy();
    res.redirect("/myProperties");
};

const view = async (req, res) => {
    const { id } = req.params;

    const property = await Property.findByPk(id, {
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

    if (!property) {
        return res.redirect("/404");
    }

    res.render("properties/view", {
        title: property.headline,
        property,
        csrfToken: req.csrfToken(),
        user: req.user,
        isSeller: isSeller(req.user?.id, property.userId),
    });
};

const sendMessage = async (req, res) => {
    const { id } = req.params;

    const property = await Property.findByPk(id, {
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

    if (!property) {
        return res.redirect("/404");
    }

    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render("properties/view", {
            title: property.headline,
            property,
            csrfToken: req.csrfToken(),
            user: req.user,
            isSeller: isSeller(req.user?.id, property.userId),
            errors: result.array(),
        });
    }

    const { message: text } = req.body;
    const { id: propertyId } = req.params;
    const { id: userId } = req.user;

    await Message.create({
        text,
        propertyId,
        userId,
    });

    //TODO: send Email to seller

    return res.render("properties/view", {
        title: property.headline,
        property,
        csrfToken: req.csrfToken(),
        user: req.user,
        isSeller: isSeller(req.user?.id, property.userId),
        send: true,
    });
};

const readMessage = async (req, res) => {
    const { id } = req.params;
    //validations
    const property = await Property.findByPk(id, {
        include: [
            {
                model: Message,
                as: "messages",
                include: [{ model: User.scope("hidden"), as: "user" }],
            },
        ],
    });
    if (!property) {
        return res.redirect("/myProperties");
    }

    if (property.userId !== req.user.id) {
        return res.redirect("/myProperties");
    }

    res.render("properties/messages", {
        title: "Mensajes ",
        messages: property.messages,
        dateFormat,
    });
};
export {
    admin,
    create,
    save,
    addImage,
    saveImage,
    edit,
    update,
    deleting,
    view,
    sendMessage,
    readMessage,
};
