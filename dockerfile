# Fase 1: Costruzione dell'applicazione
FROM node:20 AS build

# Imposta la directory di lavoro
WORKDIR /usr/src/app

# Copia i file di configurazione e il package.json
COPY package*.json ./
COPY tsconfig*.json ./
COPY angular.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dell'applicazione
COPY . .

# Esegui la build dell'applicazione
RUN npm run build:ssr

# Fase 2: Esecuzione dell'applicazione
FROM node:20 AS runner

# Imposta la directory di lavoro
WORKDIR /usr/src/app

# Copia i file della build
COPY --from=build /usr/src/app/dist/my-app ./dist/my-app

# Installa solo le dipendenze necessarie per l'esecuzione
COPY package*.json ./
RUN npm install --only=production

# Espone la porta 4000
EXPOSE 4000

# Comando per avviare l'applicazione
CMD ["node", "dist/my-app/server/main.js"]
