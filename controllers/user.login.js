import bcrypt from 'bcryptjs';
import db from '../bd_config/db.js';
const Usuario = db.Usuarios;

export const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const emailLower = email.toLowerCase();
        const usuario = await Usuario.findOne({ where: { correo: emailLower } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const esValido = await bcrypt.compare(password, usuario.contraseña);
        if (!esValido) {
            return res.status(400).json({ message: 'Contraseña incorrecta.' });
        }

        // Guardar los datos del usuario en la sesión
        req.session.user = { id: usuario.id, email: usuario.correo };

        res.json({ message: 'Inicio de sesión exitoso.'});
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message, error.stack);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};