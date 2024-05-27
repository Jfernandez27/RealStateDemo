import Datatypes from "sequelize";
import db from "../config/db.js";

const Category = db.define("category", {
    name: {
        type: Datatypes.STRING(50),
        allowNull: false,
    },
});

export default Category;
