#!/bin/bash

# Este script envia por ssh el archivo de setup de la VM de Google Cloud ./scripts/google_vm_setup.sh

# Parametros:
# $1: IP de la VM
# $2: Usuario de la VM
# $3: Path del archivo a enviar

# Parametros
ip=34.134.243.138
user='qape'
file='./scripts/send_setup_file_to_vm.sh'

# Enviar el archivo
scp $file $user@$ip:~/setup.sh