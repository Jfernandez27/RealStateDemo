import { Category } from "../models/index.js";

const categoriesSeeder = {
    up: async () => {
        await Category.bulkCreate([
            { name: "Casa" },
            { name: "Departamento" },
            { name: "Bodega" },
            { name: "Terreno" },
            { name: "Cabaña" },
        ]);
    },
    down: async () => {
        await Category.destroy({ where: {}, truncate: true });
    },
};

export default categoriesSeeder;
