import { Price } from "../models/index.js";

const pricesSeeder = {
    up: async () => {
        await Price.bulkCreate([
            {
                name: "$100.000 - $300.000 CLP",
            },
            {
                name: "$300.000 - 500.000 CLP",
            },
            {
                name: "500.000 - $750.000 CLP",
            },
            {
                name: "$750.000 - $1.000.000 CLP",
            },
            {
                name: "$1.000.000 - $1.500.000 CLP",
            },
            {
                name: "$1.500.000 - $2.000.000 CLP",
            },
            {
                name: "+ $2.000.000 CLP",
            },
        ]);
    },
    down: async () => {
        await Price.destroy({ where: {}, truncate: true });
    },
};

export default pricesSeeder;
