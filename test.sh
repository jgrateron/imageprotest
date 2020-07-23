mkdir -p output
rm output/*.jpg
rm output/*.jpeg
rm output/*.png

export NODE_EXTRA_CA_CERTS=localhost_CA.pem
#en el caso de WINDOW se utiliza el comando set
#set NODE_EXTRA_CA_CERTS=localhost_CA.pem

node src/test1.js & 
node src/test2.js &
node src/test3.js &
node src/test4.js &
node src/test5.js &
node src/test6.js &

wait


