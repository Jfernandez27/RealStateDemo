import { Datatypes } from "sequelize";
import db from "../config/db.js";

const Prices = db.define("prices", {
    price: {
        type: Datatypes.STRING(50),
        allowNull: false,
    },
});

export default Prices;
