import { User } from "../models/index.js";
import bcrypt from "bcrypt";

const usersSeeder = {
    up: async () => {
        await User.bulkCreate([
            {
                name: "Jesus",
                email: "jesus@id3a.cl",
                password: bcrypt.hashSync("123", 10),
                confirmed: 1,
            },
            {
                name: "Demo",
                email: "demo@mail.com",
                password: bcrypt.hashSync("123456", 10),
                confirmed: 1,
            },
            {
                name: "Demo 2",
                email: "demo2@mail.com",
                password: bcrypt.hashSync("123456", 10),
                confirmed: 0,
            },
        ]);
    },
    down: async () => {
        await User.destroy({ where: {}, truncate: true });
    },
};

export default usersSeeder;
