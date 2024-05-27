import Property from "./Property.js";
import Category from "./Category.js";
import Price from "./Price.js";
import User from "./User.js";

Property.belongsTo(User);
Property.belongsTo(Category);
Property.belongsTo(Price);

export { Property, Category, Price, User };
