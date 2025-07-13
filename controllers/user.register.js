import bcrypt from 'bcryptjs';
import db from '../bd_config/db.js';

const Usuario = db.Usuarios;

export const userRegister = async (req, res) => {
    const { nombre, email, password } = req.body;

    // Validar que todos los campos estén completos
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'El nombre, el correo y la contraseña son obligatorios.' });
    }

    try {
        // Normalizar el email (convertirlo a minúsculas)
        const emailLower = email.toLowerCase();

        // Verificar si el usuario ya existe en la base de datos
        const usuarioExistente = await Usuario.findOne({ where: { correo: emailLower } });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const nuevoUsuario = await Usuario.create({ 
            nombre, 
            correo: emailLower, 
            contraseña: hashedPassword 
        });

        // Guardar los datos del usuario en la sesión (sin incluir la contraseña)
        req.session.user = { id: nuevoUsuario.id, email: nuevoUsuario.correo };

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente.',
            usuario: { 
                id: nuevoUsuario.id, 
                nombre: nuevoUsuario.nombre, 
                correo: nuevoUsuario.correo 
            } 
        });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
