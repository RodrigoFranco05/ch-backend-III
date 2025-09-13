# API de Adopción de Mascotas

Este proyecto es una API REST para gestionar usuarios, mascotas y adopciones, desarrollada con Node.js, Express y MongoDB.

### Imagen desde DockerHub

La aplicación está disponible en DockerHub: [rodrifranco05/coder-bd-iii-adoptme](https://hub.docker.com/repository/docker/rodrifranco05/coder-bd-iii-adoptme)

Comando para generar imagen : docker-compose up -d

Comando para solo generar imagen del proyecto: docker build -t adoptme-api .

## API Endpoints

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:uid` - Obtener usuario por ID
- `PUT /api/users/:uid` - Actualizar usuario
- `DELETE /api/users/:uid` - Eliminar usuario

### Mascotas
- `GET /api/pets` - Obtener todas las mascotas
- `GET /api/pets/:pid` - Obtener mascota por ID
- `POST /api/pets` - Crear nueva mascota
- `PUT /api/pets/:pid` - Actualizar mascota
- `DELETE /api/pets/:pid` - Eliminar mascota

### Adopciones
- `GET /api/adoptions` - Obtener todas las adopciones
- `GET /api/adoptions/:aid` - Obtener adopción por ID
- `POST /api/adoptions/:uid/:pid` - Crear nueva adopción

### Documentación
- `GET /api-docs` - Documentación Swagger de la API

## Testing

### Ejecutar Tests

```bash
# tests de adopciones
npm run test:adoption
```

## Documentación de la API

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación interactiva de Swagger en: http://localhost:3000/api-docs

