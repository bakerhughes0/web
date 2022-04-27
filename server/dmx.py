# -*- coding: cp1252 -*-

import os, time
import sqlite3
import datetime

def main(field):
    if ('mac' in field) and ('valuename' in field):
        db = sqlite3.connect('db.db')
        cur = db.cursor()
        #find the mac address 
        cur.execute("SELECT num FROM devs WHERE mac=?;",(field['mac'],))
        try:
            num = cur.fetchone()[0]
        except:
            cur.execute("SELECT Max(num) FROM devs;")
            o = cur.fetchone()
            if o[0]==None:
               num = 1
            else:
                num = o[0]+1
            nom = '' if 'name' not in field else field['name']
            ip = '' if 'host_ip' not in field else field['host_ip']
            cur.execute("INSERT INTO devs(mac,nom,ip,num) VALUES(?,?,?,?);",(field['mac'],nom,ip,num))
            db.commit()
        #find the var number
        cur.execute("SELECT varnum FROM vars WHERE num=? and varname=?;",(num,field['valuename']))    
        try:
            varnum = cur.fetchone()[0]
        except:
            cur.execute('SELECT max(varnum) from vars WHERE num=?;',(num,))
            o = cur.fetchone()
            if o[0]==None:
                varnum = 1
            else:
                varnum = o[0]+1
            print((num, field['valuename'],varnum))
            cur.execute('INSERT INTO vars values(?,?,?);',(num, field['valuename'],varnum))
            db.commit()
            
        h = datetime.datetime.now()
        h = h - datetime.timedelta(minutes=h.minute % 5, seconds=h.second, microseconds=h.microsecond)
        htxt = h.strftime('%Y-%m-%d %H:%M')
        cur.execute("INSERT OR REPLACE INTO data VALUES(?,?,?,?);",(num, htxt, varnum, field['value']))
        db.commit()
            
        #print("ESP:",field['name'],'mac:', field['mac'],field['valuename'],"=",field['value'])
    return [['Content-Type','text/html']], '1'.encode('UTF-8')
