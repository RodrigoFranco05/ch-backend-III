import { describe, it } from "mocha"
import supertest from "supertest"
import { expect } from "chai"
import mongoose, { isValidObjectId } from "mongoose"
import { config } from '../config/config.js';

// Importar modelos para limpiar datos de prueba
import userModel from '../src/dao/models/User.js';
import petModel from '../src/dao/models/Pet.js';
import adoptionModel from '../src/dao/models/Adoption.js';

const requester = supertest(`http://localhost:${config.PORT || 3000}`)

await mongoose.connect(config.MONGO_URI)

describe("Tests funcionales para Adoption Router", function() {
    this.timeout(10000);
    
    let testUser;
    let testPet;
    let adoptedPet;

    before(async () => {
        // Limpiar datos
        await userModel.deleteMany({ email: "testuser@test.com" });
        await petModel.deleteMany({ specie: "test" });
        await adoptionModel.deleteMany({});

        testUser = await userModel.create({
            first_name: 'Test',
            last_name: 'User',
            email: 'testuser@test.com',
            password: 'hashedpassword123',
            role: 'user',
            pets: []
        });

        testPet = await petModel.create({
            name: 'Test Dog',
            specie: 'test',
            birthDate: new Date('2020-01-01'),
            adopted: false
        });

        adoptedPet = await petModel.create({
            name: 'Test Adopted Cat',
            specie: 'test',
            birthDate: new Date('2019-01-01'),
            adopted: true,
            owner: testUser._id
        });
    });

    after(async () => {
        // Limpiar datos
        await userModel.deleteMany({ email: "testuser@test.com" });
        await petModel.deleteMany({ specie: "test" });
        await adoptionModel.deleteMany({});
    });

    describe("Test básicos router /api/adoptions", () => {
        it("GET /api/adoptions debería obtener todas las adopciones", async () => {
            const { status, body } = await requester.get('/api/adoptions');
            
            expect(status).to.equal(200);
            expect(body).to.have.property('status', 'success');
            expect(body.payload).to.be.an('array');
        });

        it("POST /api/adoptions/:uid/:pid debería crear una adopción exitosamente", async () => {
            const { status, body } = await requester.post(`/api/adoptions/${testUser._id}/${testPet._id}`);
            
            expect(status).to.equal(200);
            expect(body).to.have.property('status', 'success');
            expect(body).to.have.property('message', 'Pet adopted');
        });

        it("POST /api/adoptions/:uid/:pid debería retornar error para mascota ya adoptada", async () => {
            const { status, body } = await requester.post(`/api/adoptions/${testUser._id}/${adoptedPet._id}`);
            
            expect(status).to.equal(400);
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error', 'Pet is already adopted');
        });

        it("POST /api/adoptions/:uid/:pid debería retornar error para usuario inexistente", async () => {
            const fakeUserId = new mongoose.Types.ObjectId();
            const { status, body } = await requester.post(`/api/adoptions/${fakeUserId}/${testPet._id}`);
            
            expect(status).to.equal(404);
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error', 'user Not found');
        });

        it("GET /api/adoptions/:aid debería retornar error 404 para ID inexistente", async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const { status, body } = await requester.get(`/api/adoptions/${fakeId}`);
            
            expect(status).to.equal(404);
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error', 'Adoption not found');
        });
    });
});
