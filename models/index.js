import Property from "./Property.js";
import Category from "./Category.js";
import Price from "./Price.js";
import User from "./User.js";
import Message from "./Message.js";

Property.belongsTo(User);
Property.belongsTo(Category);
Property.belongsTo(Price);
Property.hasMany(Message, { as: "messages" });

Message.belongsTo(Property);
Message.belongsTo(User);

export { Property, Category, Price, User, Message };
