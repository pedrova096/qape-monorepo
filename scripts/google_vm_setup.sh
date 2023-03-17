#!/bin/bash

# Este script installa las dependencias necesarias para correr qape en una VM de Google Cloud

# Actualizar el sistema
echo "Actualizando el sistema"
sudo apt-get update -y >> /dev/null
echo "Actualizando los paquetes"
sudo apt-get upgrade -y >> /dev/null


# Instalar git
echo "Instalando git"
sudo apt-get install git -y >> /dev/null

# Instalar dependencias de node con nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh -s | bash

# Reiniciar la terminal, evil hack:
eval "$(cat ~/.bashrc | tail -n +10)"

# Instalar node v16
nvm install v16

# Setear la version v16 como default
nvm alias default v16

# Instalar yarn
npm install -g yarn

# Instalar PM2, es un proceso manager para node que permite correr procesos en background
npm install -g pm2

# Crear el archivo ecosystem.config.js, con la configuracion de PM2
pm2 ecosystem
echo "module.exports = {
  apps : [{
    name: 'qape',
    script: 'qape/index.js',
    watch: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};" > ecosystem.config.js

# Crear ssh key para el github
ssh-keygen -t rsa -b 4096 -C "pedrova69@gmail.com" -f ~/.ssh/rsa_github -N "" >> /dev/null
echo "Copiar la siguiente llave en el github"
cat ~/.ssh/rsa_github.pub
