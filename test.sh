mkdir -p output
rm output/*.jpg
rm output/*.jpeg
rm output/*.png

node src/test1.js & 
node src/test2.js &
node src/test3.js &
node src/test4.js &
node src/test5.js &
node src/test6.js &

wait


