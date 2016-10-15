import ftplib
import sys

print('start')

session = ftplib.FTP('52.78.174.100','ubuntu','ubuntu')
session.set_pasv(False)
print('session open')

file = open(sys.argv[1], 'rb')

print('file open')

session.storbinary('STOR /home/ubuntu/web/gallery/data/'+sys.argv[1], file)

print('transfer done')
file.close()
session.quit()

