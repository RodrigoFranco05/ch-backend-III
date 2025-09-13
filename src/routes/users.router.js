import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del usuario generado por MongoDB
 *         first_name:
 *           type: string
 *           description: Nombre del usuario
 *         last_name:
 *           type: string
 *           description: Apellido del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario (hasheada)
 *         role:
 *           type: string
 *           description: Rol del usuario (user/admin)
 *           default: user
 *         pets:
 *           type: array
 *           description: Array de IDs de mascotas adoptadas por el usuario
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID de la mascota
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         first_name: "Juan"
 *         last_name: "Pérez"
 *         email: "juan.perez@email.com"
 *         password: "$2b$10$hashedpassword"
 *         role: "user"
 *         pets: []
 *     UserInput:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *           description: Nombre del usuario
 *         last_name:
 *           type: string
 *           description: Apellido del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         role:
 *           type: string
 *           description: Rol del usuario
 *           default: user
 *       example:
 *         first_name: "María"
 *         last_name: "García"
 *         email: "maria.garcia@email.com"
 *         password: "miPassword123"
 *         role: "user"
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         error:
 *           type: string
 *           description: Descripción del error
 *       example:
 *         status: "error"
 *         error: "User not found"
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Retorna una lista con todos los usuarios registrados en la base de datos
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/',usersController.getAllUsers);

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Retorna los datos de un usuario específico basado en su ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID único del usuario
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: "error"
 *               error: "User not found"
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:uid',usersController.getUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: Actualiza un usuario
 *     description: Actualiza los datos de un usuario existente basado en su ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID único del usuario a actualizar
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       description: Datos del usuario a actualizar (se pueden enviar solo los campos que se desean modificar)
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nombre del usuario
 *               last_name:
 *                 type: string
 *                 description: Apellido del usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *               role:
 *                 type: string
 *                 description: Rol del usuario
 *           example:
 *             first_name: "Juan Carlos"
 *             email: "juancarlos.perez@email.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "User updated"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: "error"
 *               error: "User not found"
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:uid',usersController.updateUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Elimina un usuario
 *     description: Elimina un usuario existente de la base de datos basado en su ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID único del usuario a eliminar
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "User deleted"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: "error"
 *               error: "User not found"
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:uid',usersController.deleteUser);


export default router;