from socket import *
import wiringARTIK as gpio
import time
import pickle


gpio.pinMode(135,"out")
gpio.pinMode(134,"out")
gpio.pinMode(129,"out")
gpio.pinMode(127,"out")
gpio.pinMode(126,"out")

#data = [0]*5

while True:
    
    data0 = '0'
    print "suwi",data0
    time.sleep(1)

    f = open("./data/light","r")
    data1 = f.readline()
    f.close()
    print "jodo:",data1
    time.sleep(1)

    f = open("./data/heat","r")
    data2 = f.readline()
    f.close()
    print "ondo:",data2
    time.sleep(1)

    f = open("./data/humid","r")
    data3 = f.readline()
    f.close()
    print "sup:",data3
    time.sleep(1)

    f = open("./data/water","r")
    data4 = f.readline()
    f.close()
    print "toya:",data4

    gpio.write(135,data0)
    gpio.write(134,data1)
    gpio.write(129,data2)
    gpio.write(127,data3)
    gpio.write(126,data4)
    

