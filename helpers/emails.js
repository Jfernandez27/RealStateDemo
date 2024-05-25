import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const registerEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const { email, name, token } = data;
    //Send Email
    await transport.sendMail({
        from: "Id3a Real State",
        to: email,
        subject: "Confirma tu cuenta en id3aRealState.com",
        html: `
            <p>Hola ${name}, comprueba tu cuenta en id3aRealState.com</p>
            <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:<a href="${
                process.env.BASE_URL
            }:${
            process.env.PORT ?? 3000
        }/auth/confirm/${token}">Confirmar Cuenta</a></p>
            <p>Si no creaste una cuenta en id3aRealState.com, ignora este mensaje.</p>
        `,
    });
};
const passwordResetEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const { email, name, token } = data;
    //Send Email
    await transport.sendMail({
        from: "Id3a Real State",
        to: email,
        subject: "Reestablece tu password en id3aRealState.com",
        text: "Reestablece tu password en id3aRealState.com",
        html: `
            <p>Hola ${name}, has solicitado reestablecer tu password en id3aRealState.com</p>
            <p>Sigue el siguiente enlace para generar un password nuevo:<a href="${
                process.env.BASE_URL
            }:${
            process.env.PORT ?? 3000
        }/auth/passwordRecovery/${token}">Reestablecer Password</a></p>
            <p>Si no solicitaste reestablecer tu password en id3aRealState.com, ignora este mensaje.</p>
        `,
    });
};
export { registerEmail, passwordResetEmail };
