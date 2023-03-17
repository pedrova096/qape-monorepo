cd $HOME
mkdir .ssh
cd .ssh
ssh-keygen -t rsa -C qape -f qape_rsa -N ""
type qape_rsa.pub
