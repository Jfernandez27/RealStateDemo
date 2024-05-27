import Datatypes from "sequelize";
import db from "../config/db.js";

const Price = db.define("price", {
    name: {
        type: Datatypes.STRING(50),
        allowNull: false,
    },
});

export default Price;
