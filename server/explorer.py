# -*- coding: cp1252 -*-

import os, time

def main(field):
    if field.get('cmd')==None:
        if not 'pw' in field:
            return page_connect()
        elif field['pw']=='acacia':
            return page_std()
    elif field['cmd']=='':
        return page_std()
    elif field['cmd']=='dir':
        rep = os.getcwd()
        if 'p' in field:
            rep += field['p']
        if not rep.endswith('/')  :
            rep +='/'
        L=[['..','-','','']]
        for f in sorted(os.listdir(rep)):
            statinfo = os.stat(rep+f)
            size = statinfo.st_size
            if os.path.isdir(rep+f):
                bedel = ''
                size = '-'
            else:
                bedel = 'x'
            datemodif = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(statinfo.st_mtime))
            L.append([f,str(size),datemodif,bedel])
        return ['Content-Type', 'text/javascript;charset=UTF-8'], str(L).encode('UTF-8')
    elif field['cmd']=='delete':
        rep = os.getcwd()
        if 'p' in field:
            rep += field['p']
        if not rep.endswith('/')  :
            rep +='/'
        f=field['file']
        os.remove(rep+f);
        return ['Content-Type', 'text/plain'], 'OK'.encode('UTF-8')
    elif field['cmd']=='upload':
        rep = os.getcwd()
        if 'p' in field:
            rep += field['p']
        if not rep.endswith('/')  :
            rep +='/'
        t=field['file'].split('|')
        os.rename(t[0],rep+t[1])
        return ['Content-Type', 'text/plain'], 'OK'.encode('UTF-8')
    elif field['cmd']=='download':
        rep = os.getcwd()
        if 'p' in field:
            rep += field['p']
        if not rep.endswith('/')  :
            rep +='/'
        f=field['file']
        fn=open(rep+f,'rb')
        msg = fn.read()
        fn.close()
        hdr=[]
        hdr.append(['Content-Type','application/octet-stream;name=%s' % f])
        hdr.append(['Content-Length', os.stat(rep+f).st_size])
        hdr.append(['Content-Disposition', 'attachment;filename=%s' % f])
        return hdr, msg 
    
def page_connect():
    return [['Content-Type','text/html;charset=UTF-8']], """
<!DOCTYPE html><head><script type=text/javascript src=js/func.js></script>
<script type=text/javascript>
window.onload=function(){
document.title='File Explorer - Connection';
b=document.body;sBkC(document.body,'#358');
var f=new xDiv();
sBrW(f,[1]);sBrC(f,['#55f']);sBrR(f,[10,40,60,40]);sSiz(f,[400,200]);cScr(f);;
;sBkL(f,90,'#8af,#58a,#8af');sPar(f,b);
var l=new xLab();sPos(l,[50,82]);sFtN(l,'16px fnt1');sTxt(l,'Password : ');sPar(l,f);
var t=new xPwd();move(t,[130,80,200,26]);sPar(t,f);sFoc(t);
var btn=new xBtn();move(btn,[150,150,95,26]);sTxt(btn,'connect');sPar(btn,f);
btn.eClk=function(){var s=new xSgo('explorer.exe');s.add('pw',t.value);s.post()};
t.eEnt=btn.eClk;
}</script>
</head><body></body></html>""".encode('UTF-8')

def page_std():
    return [['Content-Type','text/html;charset=UTF-8']], """
<!DOCTYPE html><head><script type=text/javascript src=js/func.js></script>
<script type=text/javascript>window.onload=function(){
document.title='Server Explorer';
var b=document.body;sBkC(b,'#358');
var l1=new xLab();move(l1,[10,12,180,20]);sTxt(l1,'Répertoire à explorer :');sPar(l1,b);
var path=new xTbx();move(path,[190,10,170,25]);sFtN(path,'16px calibri');sBrR(path,[5]);sBrC(path,'#ffe');sPar(path,b);
var btn = new xBtn();move(btn,[370,10,100,25]);sTxt(btn,'Update');sPar(btn,b);
  
btn.eClk = function() {
 var s=new xSrv('explorer.exe');s.add('cmd','dir');if(path.value.length){s.add('p',path.value)};
 s.eChg=function(){affichfich(eval(s.value))};s.post();
};
path.eEnt=btn.eClk;
var tbl=new xTbl();move(tbl,[10,90,720,scrH()-100]);sPar(tbl,b);
tbl.fields=[['Name',300],['Size',100],['Date',150],['Download',80],['Delete',80]];
tbl.rowsheight=25;
tbl.rowclick=function(idx) {
  if (gTxt(tbl.cells(idx,1))=='-'){
    if(gTxt(tbl.cells(idx,0))=='..'){var x=path.value.lastIndexOf('/');path.value=path.value.substring(0,x)}
      else{path.value+='/'+gTxt(tbl.cells(idx,0));}
   if(gTxt(tbl.cells(idx,0))=='.'){path.value=''}
    btn.eClk();
    }
    else{

    var p='';
    if (path.value.length) {p=path.value+'/'}
    if(!event.target.id){document.location.href=p+gTxt(tbl.cells(idx,0))};
    }
  };
function affichfich(t) { tbl.clear();
  for (var i=0; i<t.length; i++) {
    tbl.addRow();
    for(var x=0;x<3;x++){ sTxt(tbl.cells(i,x),t[i][x])}
    sMoP(tbl.cells(i,0),'pointer');
    sFtA(tbl.cells(i,1),'right');
    for(var x=0;x<3;x++){ sPad(tbl.cells(i,x),[2,5,0,5])};
if(t[i][3]=='x'){
 var b=new xBtn();move(b,[4,3,70,18]);sTxt(b,'delete');sPar(b,tbl.cells(i,4));b.id=t[i][0];
 b.eClk=function(){var x=new xSrv('explorer.exe');x.add('cmd','delete');x.add('p',path.value);x.add('file',this.id);x.eChg=function(){btn.eClk()};x.post();}
 var b2=new xBtn();move(b2,[4,3,70,18]);sTxt(b2,'download');sPar(b2,tbl.cells(i,3));b2.id=t[i][0];
 b2.eClk=function(){var x=new xSgo('explorer.exe');x.add('cmd','download');x.add('p',path.value);x.add('file',this.id);x.eChg=function(){btn.eClk()};x.post();}}

    }  };
setTimeout(function(){btn.eClk();},1);
var f=new xFil();move(f,[10,50,400,25]);sPar(f,b);
var upbtn = new xBtn();move(upbtn,[450,50,100,25]);sPar(upbtn,b);sTxt(upbtn,'Upload');
upbtn.onclick = function() { 
var x=new xSrv('explorer.exe');
x.add('cmd','upload');
x.add('p',path.value);
x.addF('file',f.file,f.filename);
x.eChg=function(){btn.eClk()};x.post();
};
}</script></head><body></body></html>""".encode('UTF-8')

