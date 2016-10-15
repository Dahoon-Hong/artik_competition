#!/bin/bash

echo "126" > /sys/class/gpio/export
echo "127" > /sys/class/gpio/export
echo "129" > /sys/class/gpio/export
echo "134" > /sys/class/gpio/export
echo "135" > /sys/class/gpio/export

cd ./bin/
python ../bin/save.pyc
nodejs ../bin/sender.js
cd ..

echo finish

