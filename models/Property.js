import Datatypes from "sequelize";
import db from "../config/db.js";

const Property = db.define("property", {
    id: {
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    headline: {
        type: Datatypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: Datatypes.TEXT,
        allowNull: false,
    },
    bedrooms: {
        type: Datatypes.INTEGER,
        allowNull: false,
    },
    bathrooms: {
        type: Datatypes.INTEGER,
        allowNull: false,
    },
    parkings: {
        type: Datatypes.INTEGER,
        allowNull: false,
    },
    street: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    lat: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    lng: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    image: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    published: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export default Property;
