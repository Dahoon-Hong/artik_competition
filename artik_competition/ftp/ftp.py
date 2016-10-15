import ftplib
import sys

print('start')

session = ftplib.FTP('52.78.174.100','ubuntu','ubuntu')
file = open(sys.argv[1], 'rb')
session.storbinary('STOR /home/ubuntu/web/board/public/'+sys.argv[1], file)

print('transfer done')
file.close()
session.quit()
