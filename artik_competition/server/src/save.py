import wiringARTIK as gpio
import json
import os
import sys

from socket import *
import pickle
import time
HOST = '192.168.0.17'
PORT = 15341

#s = socket(AF_INET, SOCK_STREAM)
#s.bind((HOST,PORT))
#s.listen(1)

#conn, addr = s.accept()

#print 'connected by' , addr
while True:
    
    suwi = gpio.read(135)
    jodo = gpio.read(134)
    ondo = gpio.read(129)
    sup = gpio.read(127)
    toya = gpio.read(126)
    reply = [suwi, jodo, ondo, sup, toya]
    if suwi == '1\n' :
	suwi = False;
    else :
	suwi = True;

    if jodo == '1\n' :
	jodo = False;
    else :
	jodo = True;

    if ondo == '1\n' :
	ondo = False;
    else :
	ondo = True;

    if sup == '1\n' :
	sup = False;
    else :
	sup = True;
    if toya == '1\n' :
	toya = False;
    else :
	toya = True;
    data = {
	'humidity' : sup,
        'humidity_soil' : toya,
        'illumination' : jodo,
        'state' : True,
        'temperature' : ondo,
        'water' : suwi
    }
	#save data 
    jsondata = json.dumps(data);
    with open("../data/data.json","w") as fp:
	json.dump(data, fp)
    fp.close()
   
    os.system('node ../bin/sender.js')
    os.system('python ../bin/ftp.pyc ../data/data.json')
    print "suwi:",reply[0]
    time.sleep(1)
    print "jodo:",reply[1]
    time.sleep(1)
    print "ondo:",reply[2]
    time.sleep(1)
    print "sup:",reply[3]
    time.sleep(1)
    print "toya:",reply[4]
    time.sleep(1)
   	#send data
  #  conn.sendall(pickle.dumps(reply))
    
    time.sleep(1)
#conn.close()
