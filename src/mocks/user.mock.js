import { faker } from '@faker-js/faker';
import { createHash } from '../utils/index.js'; // Importamos la función para encriptar contraseñas

/*
  Genera un array de usuarios mockeados.
  @param {number} count - Número de usuarios a generar.
  @returns {Promise<Array>} - Promesa que resuelve a un array de objetos usuario.
 */
const generateMockUsers = async (count = 1) => {
    const users = [];
    const password = 'coder123';
    const hashedPassword = await createHash(password); // Encriptamos la contraseña una vez

    for (let i = 0; i < count; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const role = faker.helpers.arrayElement(['user', 'admin']);

        users.push({
            first_name: firstName,
            last_name: lastName,
            email: faker.internet.email({ firstName, lastName }).toLowerCase(), // Generamos email único
            password: hashedPassword, // Contraseña encriptada
            role: role,
            pets: [] // Array vacío de mascotas
        });
    }

    return users;
};

export default {
    generateMockUsers
};
