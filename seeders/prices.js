import { Price } from "../models/index.js";

const pricesSeeder = {
    up: async () => {
        await Price.bulkCreate([
            {
                name: "$100.000 - $300.000 USD",
            },
            {
                name: "$300.000 - 500.000 USD",
            },
            {
                name: "500.000 - $750.000 USD",
            },
            {
                name: "$750.000 - $1.000.000 USD",
            },
            {
                name: "$1.000.000 - $1.500.000 USD",
            },
            {
                name: "$1.500.000 - $2.000.000 USD",
            },
            {
                name: "+ $2.000.000 USD",
            },
        ]);
    },
    down: async () => {
        await Price.destroy({ where: {}, truncate: true });
    },
};

export default pricesSeeder;
