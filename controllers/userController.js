import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateId, generateJWT } from "../helpers/tokens.js";
import { passwordResetEmail, registerEmail } from "../helpers/emails.js";
import { where } from "sequelize";

const loginForm = (req, res) => {
    res.render("auth/login", {
        title: "Iniciar sesión",
        csrfToken: req.csrfToken(),
    });
};

const authenticate = async (req, res) => {
    //Validations
    await check("email")
        .isEmail()
        .withMessage("El email es obligatorio")
        .run(req);
    await check("password")
        .notEmpty()
        .withMessage("El password es obligatorio")
        .run(req);

    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render("auth/login", {
            title: "Iniciar sesión",
            csrfToken: req.csrfToken(),
            errors: result.array(),
        });
    }

    //Get User
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.render("auth/login", {
            title: "Iniciar sesión",
            csrfToken: req.csrfToken(),
            errors: [{ msg: "El usuario no existe" }],
        });
    }

    //Is confirmed
    if (!user.confirmed) {
        return res.render("auth/login", {
            title: "Iniciar sesión",
            csrfToken: req.csrfToken(),
            errors: [{ msg: "Tu cuenta no ha sido activada" }],
        });
    }

    //Check Password
    if (!user.checkPassword(password)) {
        return res.render("auth/login", {
            title: "Iniciar sesión",
            csrfToken: req.csrfToken(),
            errors: [{ msg: "Password incorrecto" }],
        });
    }

    //Authenticate User
    const token = generateJWT({
        id: user.id,
        name: user.name,
    });

    //Store in Cookie
    return res
        .cookie("_token", token, {
            httpOnly: true,
            // expires: 3600,
            // secure: true
        })
        .redirect("/myProperties");
};

const endSession = (req, res) => {
    return res.clearCookie("_token").status(200).redirect("/auth/login");
};
const registerForm = (req, res) => {
    res.render("auth/register", {
        title: "Crear Cuenta",
        csrfToken: req.csrfToken(),
    });
};
const register = async (req, res) => {
    //Validaciones
    await check("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .run(req);
    await check("email")
        .isEmail()
        .withMessage("Debe ser un email válido")
        .run(req);
    await check("password")
        .isLength({ min: 6 })
        .withMessage("El password debe ser de al menos 6 caracteres")
        .run(req);

    let result = validationResult(req);

    //Verificar que no el resultado de las validaciones esté OK
    if (!result.isEmpty()) {
        return res.render("auth/register", {
            title: "Crear Cuenta",
            csrfToken: req.csrfToken(),
            errors: result.array(),
            user: {
                name: req.body.name,
                email: req.body.email,
            },
        });
    }
    const { name, email, password, password_confirm } = req.body;
    // Validate passwords
    if (password !== password_confirm) {
        return res.render("auth/register", {
            title: "Crear Cuenta",
            csrfToken: req.csrfToken(),
            errors: [{ msg: "Los password no son iguales" }],
            user: {
                name: req.body.name,
                email: req.body.email,
            },
        });
    }
    //Verificar que el email no exista
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
        return res.render("auth/register", {
            title: "Crear Cuenta",
            csrfToken: req.csrfToken(),
            errors: [{ msg: "El email ya está registrado" }],
            user: {
                name: req.body.name,
                email: req.body.email,
            },
        });
    }

    //Save user
    const user = await User.create({
        name,
        email,
        password,
        token: generateId(),
    });

    //Envío de Email
    registerEmail({
        name: user.name,
        email: user.email,
        token: user.token,
    });

    //Mostrar mensaje de confirmación
    res.render("templates/message", {
        title: "Usuario creado satisfactoriamente",
        message:
            "Hemos enviado un email de confirmación, presiona en el enlace para activar tu cuenta",
    });
};

const confirm = async (req, res) => {
    const { token } = req.params;

    //Verificar si el token es valido
    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.render("auth/confirm", {
            title: "Error al confirmar tu cuenta",
            message: "Hubo un error al confirmar tu cuenta, intenta de nuevo",
            error: true,
        });
    }

    //Confirmar la cuenta
    user.token = null;
    user.confirmed = true;
    await user.save();
    res.render("auth/confirm", {
        title: "Cuenta confirmada",
        message: "La cuenta se confirmó correctamente",
    });
};

const forgotPasswordForm = (req, res) => {
    res.render("auth/passwordRecovery", {
        title: "Reestablece tu Password",
        csrfToken: req.csrfToken(),
    });
};

const resetPassword = async (req, res) => {
    //Validaciones
    await check("email")
        .isEmail()
        .withMessage("Debe ser un email válido")
        .run(req);
    let result = validationResult(req);
    if (!result.isEmpty()) {
        return res.render("auth/passwordRecovery", {
            title: "Reestablece tu Password",
            csrfToken: req.csrfToken(),
            errors: result.array(),
        });
    }
    //Buscar usuario
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.render("auth/passwordRecovery", {
            title: "El usuario no existe",
            csrfToken: req.csrfToken(),
            errors: [{ msg: "El email no está registrado." }],
        });
    }

    //Generar un token y enviar el email
    user.token = generateId();
    await user.save();

    passwordResetEmail({
        name: user.name,
        email: user.email,
        token: user.token,
    });

    res.render("templates/message", {
        title: "Reestablece tu Password",
        message: "Hemos enviado un email con las instrucciones",
    });
};
const tokenCheck = async (req, res) => {
    const { token } = req.params;

    //Verificar si el token es valido
    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.render("auth/confirm", {
            title: "Reestablece tu Password",
            message:
                "Hubo un error al reestablecer tu password, intenta de nuevo",
            error: true,
        });
    }

    //Mostrar vista para nuevo password
    // user.token = null;
    // await user.save();
    res.render("auth/passwordReset", {
        title: "Reestablece tu Password",
        csrfToken: req.csrfToken(),
    });
};
const newPassword = async (req, res) => {
    //Validations
    await check("password")
        .isLength({ min: 6 })
        .withMessage("El password debe ser de al menos 6 caracteres")
        .run(req);
    let result = validationResult(req);
    if (!result.isEmpty()) {
        return res.render("auth/passwordReset", {
            title: "Reestablece tu Password",
            csrfToken: req.csrfToken(),
            errors: result.array(),
        });
    }
    // Validate passwords
    const { password, password_confirm } = req.body;
    if (password !== password_confirm) {
        return res.render("auth/passwordReset", {
            title: "Reestablece tu Password",
            csrfToken: req.csrfToken(),
            errors: [{ msg: "Los password no son iguales" }],
        });
    }
    //Get User
    const { token } = req.params;
    const user = await User.findOne({ where: { token } });

    //Update Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.token = null;
    await user.save();
    return res.render("auth/confirm", {
        title: "Password Reestablecido",
        message: "El password se reestableció correctamente",
    });
};
export {
    loginForm,
    authenticate,
    endSession,
    registerForm,
    register,
    confirm,
    forgotPasswordForm,
    resetPassword,
    tokenCheck,
    newPassword,
};
