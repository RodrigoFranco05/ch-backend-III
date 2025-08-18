import PetDTO from "../dto/Pet.dto.js";
import __dirname from "../utils/index.js";
import { faker } from '@faker-js/faker'; // Importamos faker para generar datos

export const generateMockPets = (count = 1) => {
    const pets = [];
    const species = ['Perro', 'Gato', 'Conejo', 'Loro', 'Pez', 'Tortuga', 'Hámster'];
    
    for (let i = 0; i < count; i++) {
        const name = faker.animal.type(); // Usamos tipo de animal como nombre base
        const specie = faker.helpers.arrayElement(species);
        const birthDate = faker.date.past({ years: 10 }); // Fecha de nacimiento aleatoria en los últimos 10 años
        const image = faker.image.urlLoremFlickr({ category: 'animals' }); // URL de imagen aleatoria

        pets.push(PetDTO.getPetInputFrom({
            name: `${name} ${faker.number.int({ min: 1, max: 999 })}`, // Nombre único
            specie,
            birthDate,
            image,
            adopted: faker.datatype.boolean() // Estado de adopción aleatorio
        }));
    }
    
    return pets;
};

