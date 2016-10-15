#!/bin/sh


while :
do
	file_name=`date +"%y%m%d%H%M"`
	time=`date +"%H"`
	echo $file_name
	echo $time
	if [ "$time" -eq "00" ];then
		raspistill -w 640 -h 480 -o $file_name.jpg;
		python send_img.pyc $file_name.jpg
		sleep 10;
		rm -rf $file_name.jpg
	fi
	sleep 3600;
done
