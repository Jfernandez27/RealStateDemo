import Datatypes from "sequelize";
import db from "../config/db.js";

const Message = db.define("message", {
    text: {
        type: Datatypes.TEXT,
        allowNull: false,
    },
});

export default Message;
