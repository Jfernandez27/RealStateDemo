import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userIdentify = async (req, res, next) => {
    //Verify Token
    const { _token } = req.cookies;
    if (!_token) {
        req.user = null;
        return next();
    }
    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET);
        const user = await User.scope("hidden").findByPk(decoded.id);
        if (user) {
            req.user = user;
        }
        return next();
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.clearCookie("_token").redirect("/auth/login");
    }
    next();
};
export default userIdentify;
