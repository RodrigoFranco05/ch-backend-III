import { Router } from 'express';
import { petsService, usersService } from '../services/index.js';
import { generateMockPets } from '../mocks/pet.mock.js'; // Importamos la función de mocking de pets
import userMock from '../mocks/user.mock.js';

const router = Router();

/**
 * Endpoint GET para obtener usuarios mockeados.
 * Genera 50 usuarios por defecto con el formato de Mongo.
 */
router.get('/mockingusers', async (req, res) => {
    try {
        const users = await userMock.generateMockUsers(50);
        res.send({ status: "success", payload: users });
    } catch (error) {
        console.error("Error generando usuarios mock:", error);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
});

/**
 * Endpoint GET para obtener mascotas mockeadas.
 * Reutiliza la lógica existente o la creamente en pets.controller.js.
 */
router.get('/mockingpets', async (req, res) => {
    try {
        // Asumimos que generateMockPets es una función que genera mascotas falsas
        // Esta función debe ser creada o adaptada en pets.controller.js
        const pets = await generateMockPets(100); // Generamos 100 mascotas por defecto como ejemplo
        res.send({ status: "success", payload: pets });
    } catch (error) {
        console.error("Error generando mascotas mock:", error);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
});

/**
 * Endpoint POST para generar e insertar datos reales en la base de datos.
 * Recibe parámetros 'users' y 'pets' del body.
 */
router.post('/generateData', async (req, res) => {
    try {
        const { users: userCount, pets: petCount } = req.body;

        // Validaciones básicas
        if (isNaN(userCount) || isNaN(petCount) || userCount < 0 || petCount < 0) {
            return res.status(400).send({ status: "error", error: "Parámetros inválidos. 'users' y 'pets' deben ser números no negativos." });
        }

        // Generar datos mockeados
        const mockUsers = await userMock.generateMockUsers(parseInt(userCount));
        const mockPets = await generateMockPets(parseInt(petCount));

        // Insertar usuarios en la base de datos
        const insertedUsers = [];
        for (const user of mockUsers) {
            const result = await usersService.create(user);
            insertedUsers.push(result);
        }

        // Insertar mascotas en la base de datos
        const insertedPets = [];
        for (const pet of mockPets) {
            const result = await petsService.create(pet);
            insertedPets.push(result);
        }

        res.send({
            status: "success",
            message: `Datos generados e insertados correctamente.`,
            insertedUsers: insertedUsers.length,
            insertedPets: insertedPets.length
        });

    } catch (error) {
        console.error("Error generando e insertando datos:", error);
        res.status(500).send({ status: "error", error: "Error interno del servidor al generar/insertar datos" });
    }
});

export default router;
