import db from "../config/db.js";
import usersSeeder from "./users.js";
import categoriesSeeder from "./categories.js";
import pricesSeeder from "./prices.js";
import propertiesSeeder from "./propierties.js";

const runSeeders = async () => {
    try {
        // await db.sync();
        // await db.sync({ force: true }); //Borra todas las tablas
        // await Promise.all([categoriesSeeder.down(), pricesSeeder.down()]);
        await Promise.all([
            usersSeeder.up(),
            categoriesSeeder.up(),
            pricesSeeder.up(),
            // propertiesSeeder.up(),
        ]);
        console.log("All seeders have been executed successfully!");
    } catch (error) {
        console.error("Error executing seeders:", error);
    }
};

runSeeders();
