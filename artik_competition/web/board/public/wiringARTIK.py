import os.path
import time
import argparse
import sys
import subprocess
import select
import os

def writeFile(file, contents):
    with open(file,'w') as f:
        f.write(contents)

def readFile(file):
	with open(file, 'r') as f:
		s=f.read()
	return s
    
def pinMode(pin,direct):
    writeFile("/sys/class/gpio/gpio%i/direction" % pin,direct)

def write(pin, state):	
	writeFile("/sys/class/gpio/gpio%i/value" % pin, state)

def read(pin): 
	s = readFile("/sys/class/gpio/gpio%i/value" % pin)
	
	return s

def main():
    pinMode(135,"in")
    pinMode(134,"out")    
    while True:
        try:
            data = read(135)
            write(134,str(data))
        except KeyboardInterrupt:
            sys.exit(0)


if __name__ == "__main__":
	main()


