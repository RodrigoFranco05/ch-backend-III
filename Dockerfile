# Usar la imagen oficial de Node.js como base
FROM node:20.18.0

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
