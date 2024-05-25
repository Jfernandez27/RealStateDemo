import Datatypes from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const User = db.define(
    "users",
    {
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        token: Datatypes.STRING,
        confirmed: Datatypes.BOOLEAN,
    },
    {
        hooks: {
            beforeCreate: async function (user) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
        },
    }
);

export default User;
