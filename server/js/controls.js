//------------------------------------------------------------------------------

function HttpGet(url) {
  var o = new XMLHttpRequest();
  o.open("GET", url, false);
  //o.setRequestHeader("Content-Type", "text/html;charset=iso-8859-1");
  o.send(null);
  return o.responseText
  };

//------------------------------------------------------------------------------

function form() {
  var win = document.createElement('div');
  with (win.style) {
    position = 'absolute';
    top = '0px';
    left = '0px';
    width = '200px';
    height = '100px';
    borderRadius = '10px';
    boxShadow = '5px 5px 15px #ccc';
    };
  var titlebar = document.createElement('div');
  with (titlebar.style) {
    position = 'absolute';
    top = '0px';
    left = '0px';
    width = '100%';
    height = '24px';
    borderStyle = 'solid';
    borderWidth = '2px';
    borderColor = '#999';
    backgroundColor = '#eee';
    borderRadius = '10px 10px 0 0';
    fontFamily = 'Calibri';
    fontSize = '14px';
    MozUserSelect="none";
    };
    titlebar.onselectstart=function() {return false};
    titlebar.onmousedown = function(e) { 
      if (e.which==1) {
        win.style.cursor='move';
        x0 = e.pageX; y0 = e.pageY;
        document.onmousemove = function(e) {
          win.style.left = parseInt(win.style.left) + (e.pageX-x0) + 'px';
          win.style.top = parseInt(win.style.top) + (e.pageY-y0) + 'px';
          x0 = e.pageX; y0 = e.pageY;
          };
        document.onmouseup = function() {win.style.cursor='default'; document.onmousemove='';document.onmouseup=''}
        }
      };
  win.appendChild(titlebar);
  var caption = document.createElement('div');
  var captionText = document.createTextNode('noname');
  caption.appendChild(captionText);
  with (caption.style) {
    cursor = 'default';
    position = 'absolute';
    top = '1px';
    left = '5px';
    fontFamily = 'Calibri';
    fontSize = '16px';
    color = '#026';
    };
  titlebar.appendChild(caption);
  var closebtn = document.createElement('div');
    closebtn.appendChild(document.createTextNode("X"));
    with (closebtn.style) {
      cursor = 'pointer';
      position = 'absolute';
      top = '3px';
      left = parseInt(win.style.width)-19 + 'px';
      width = '20px';
      height = '21px';
      backgroundColor = '#c88';
      borderRadius = '5px 8px 5px 5px';
      fontFamily = 'calibri';
      fontSize = '16px';
      fontWeight = 'bold';
      textAlign = 'center';
      color = '#fff';
      };
    closebtn.onselectstart=function(){return false};
    closebtn.style.MozUserSelect="none";
    closebtn.onclick = function() {document.body.removeChild(win)};
    win.appendChild(closebtn);

  var body = document.createElement('div');
  with (body.style) {
    position = 'absolute';
    top = '25px';
    left = '0';
    width = '100%';
    height = parseInt(win.style.height)-25 + 'px';
    borderStyle = 'solid';
    borderWidth = '2px';
    borderColor = '#999';
    backgroundColor = '#e5e5f0';
    borderRadius = '0 0 10px 10px';
    fontFamily = 'Calibri';
    fontSize = '14px';
    overflow = "auto";
    };
  win.appendChild(body);
  this.parent = function (p) { if(!p) {return win.parentNode} else {p.appendChild(win)}};
  this.win = win;
  this.body = body;
  this.caption = function(s) {captionText.nodeValue=s};
  this.show = function () {document.body.appendChild(win)};
  this.pos = function(x,y) {with (win.style) {top=y+'px';left=x+'px'}};
  this.size = function(w,h) {
    win.style.width=w+'px'; 
    win.style.height=h+'px';
    closebtn.style.left = parseInt(win.style.width)-19 + 'px';
    body.style.height = parseInt(win.style.height)-25 + 'px';
    };
  this.disableClosebtn = function() {win.removeChild(closebtn)};
  };

//------------------------------------------------------------------------------

//------------------------------------------------------------------------------

function addCtrl(srcCtrl, destCtrl) {
  destCtrl.appendChild(srcCtrl);
  }

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//    V 2.00
//------------------------------------------------------------------------------

function elementtext(container, text) {
  var obj = document.createTextNode(text);
  objt = obj.NodeValue;
  container.appendChild(obj);
  return obj};

function element(type, container) {
  var obj = document.createElement(type);
  obj.id = Math.floor((Math.random() * 10000) + 1);
  obj.style.position = 'absolute';
  container.appendChild(obj);
  return obj};

function elementinput(type, container) {
  var obj = document.createElement('input');
  obj.type = type;
  obj.id = Math.floor((Math.random() * 10000) + 1);
  obj.style.position = 'absolute';
  container.appendChild(obj);
  return obj};

function label(container, text) {
  var obj = new element('label', container);
  obj.textContent = text;
  return obj};

function textbox(container) {
  var obj = new elementinput('text', container);
  return obj};

function passbox(container) {
  var obj = new elementinput('password', container);
  return obj};

function button(container, text) {
  var obj = new elementinput('button', container);
  obj.value = text;
  return obj};

function menubtn(container, text) {
  var obj = new element('div', container);
  obj.style.width = '300px'; 
  obj.img = new element('img', obj);
    obj.img.src = 'js/menu3.png';
    obj.img.style.width = '16px';
    obj.img.style.top = '3px';
    obj.img.style.left = '2px';
  var divtxt = new element('div', obj);
    divtxt.style.top = '1px';
    divtxt.style.left=obj.img.clientWidth+5 +'px';
  obj.text = new elementtext(divtxt, text);
  obj.style.cursor = 'pointer';
  obj.style.width = obj.img.clientWidth + divtxt.clientWidth + 15 + 'px';
  if (divtxt.clientHeight>22) {
    obj.style.height = divtxt.clientHeight + 4 + 'px';
    }else{ obj.style.height = '22px'};
  obj.style.fontFamily = 'Calibri';
  obj.style.fontSize = '16px';
  return obj};

function menu(container, mnu, lev) {
  if(!lev){lev=0};
  var obj = new element('div', container);
  with (obj.style) {
    borderStyle = 'solid';
    borderWidth = '1px';
    borderColor = '#aaa';
    backgroundColor = '#eee';

    if(lev==0) { 
      borderStyle = 'none none solid none ';
      width = container.clientWidth+'px';
      height = '22px';
      };
    if(lev==1) { 
      top = container.clientHeight+'px'
      };
    if(lev>1) { 
      left =  container.clientWidth+'px'
      };
    };
  obj.b = [];
  var maxWidth=0 ,maxHeight=0;
  for(var n=0; n<mnu.length; n++) {
    obj.b[n] = new menubtn(obj, mnu[n][0]);
    obj.b[n].hasSub = false;
    if(obj.b[n].clientWidth > maxWidth) {maxWidth=obj.b[n].clientWidth};
    maxHeight += obj.b[n].clientHeight;
    if(lev==0) {
      if(n>0) { obj.b[n].style.left = obj.b[n-1].clientLeft + obj.b[n-1].clientWidth+10+'px'};
      }else{
      if(n>0) { obj.b[n].style.top = obj.b[n-1].clientTop + obj.b[n-1].clientHeight+'px'};
      };
    if (mnu[n][2].length > 0) {
      obj.b[n].hasSub = true;
      obj.b[n].submenu = new menu(obj.b[n], mnu[n][2], lev+1);
      };
    obj.b[n].onmouseenter = function() { 
      this.style.color = '#33f';
      this.style.backgroundColor = '#bcf';
      if(this.hasSub) {this.submenu.style.display=''};
      };
    obj.b[n].onmouseleave = function(n) {
      this.style.color = '#000';
      this.style.backgroundColor = ''; 
      if(this.hasSub) {this.submenu.style.display='none'};
      };
    if (lev==0) {
      obj.b[n].img.src = 'js/menu1.png';
      }else{
      if (obj.b[n].hasSub) {obj.b[n].img.src = 'js/menu2.png'; };
      };
    }; // end for
  if (lev>0) {
    obj.style.width = maxWidth + 'px';
    obj.style.height = maxHeight + 'px';
    for(var n=0; n<mnu.length; n++) {
      obj.b[n].style.width = obj.style.width;
      obj.b[n].style.color = '#000';
      };
    obj.style.boxShadow = '5px 5px 15px #ccc';
    obj.style.display='none';
    };
  return obj};

//------------------------------------16:12 25/09/2014------------------------------------------
//    V 3.00
//------------------------------------------------------------------------------
function element2(type, container) {
  var obj = document.createElement(type);
  obj.textContent = "Empty Div";
  obj.id = Math.floor((Math.random() * 10000) + 1);
  obj.style.position = 'absolute';
  container.appendChild(obj);
  obj.onupdate = function () {
    this.style.borderColor = '#f00'; alert('resized !');
    };
  return obj
  };


function table() {
  var headheight = 22;
  var rowsheight = 22;
  var obj = new elm();
  with (obj) {size=[320,240];bor=[1,1,1,1]};
  with(obj.style){fontFamily = 'Calibri';fontSize = '14px';overflow = 'hidden'};
  obj.head = new elm(); 
  obj.head.style.backgroundColor = '#668';
  obj.head.field = [];
  obj.createFields=function(f) {
    for (n=0; n<f.length; n++) {
      if (!obj.head.field[n]) {obj.head.field[n] = new elm()}; 
      with (obj.head.field[n]) {
        text=f[n][0];
        bor=[1,1,1,1];
        pos=[obj.head.field[n-1] ? obj.head.field[n-1].pos[0]+obj.head.field[n-1].size[0]-obj.head.field[n-1].bor[1] : 0,0];
        size=[f[n][1], headheight];
        };
      with (obj.head.field[n].style) {
        borderColor = '#aaa';
        color = '#fff';
        textAlign='center';
        };
      obj.head.field[n].parent=obj.head;
      };
    obj.head.size=[obj.head.field[f.length-1].pos[0]+obj.head.field[f.length-1].size[0] ,headheight];
    for(var n=obj.head.field.length-1;n>f.length-1;n--) {
      obj.head.field[n].parent.removeChild(obj.head.field[n]);
      obj.head.field.pop();
      };
    };
  obj.head.parent = obj;
  Object.defineProperty(obj, "fields", { 
    get: function () {return ''},
    set: function (s) {obj.createFields(s)}
    });
  obj.body = new elm(); obj.appendChild(obj.body);
  obj.body.pos=[0,headheight];
  with (obj.body.style) {backgroundColor = '#f8f8f8';overflow = 'auto';};
  obj.body.onscroll = function() {obj.head.pos=[-this.scrollLeft,0]};
  obj.body.rows = [];
  obj.clear=function(){
    for(var n=0; n<obj.body.rows.length;n++) {
        obj.body.removeChild(obj.body.rows[n]) };
    obj.body.rows = [];
    };
  obj.addRow = function() {
    var y=obj.body.rows.length;
    obj.body.rows[y] = new elm();
    obj.body.rows[y].pos=[0,rowsheight * y];
    with (obj.body.rows[y].style) {
      color = '#225';
      backgroundColor = y % 2 ? '#f5f5f5': '#f0f0f0';
      };
    obj.body.rows[y].idx = y;
    obj.body.rows[y].onclick = function() {obj.rowclick(this.idx)};
    obj.body.rows[y].onmouseenter = function() { this.style.backgroundColor='#f9f5d5'};
    obj.body.rows[y].onmouseleave = function() { this.style.backgroundColor = this.idx % 2 ? '#f5f5f5': '#f0f0f0' };
    obj.body.rows[y].cells = [];
    var n=0;
    for (var n=0; n<obj.head.field.length;n++) {
      obj.body.rows[y].cells[n] = new elm(); 
      var c = obj.body.rows[y].cells[n];
      c.bor=[0,1,1,1];
      c.pad=[0, 0, 0, 5];
      c.pos=[obj.head.field[n-1] ? obj.head.field[n-1].pos[0] + obj.head.field[n-1].size[0] - obj.head.field[n-1].bor[1] : 0,0];
      c.size = [obj.head.field[n].size[0], rowsheight];
      c.parent = obj.body.rows[y];
      };
    obj.body.rows[y].size=[obj.head.size[0], rowsheight];
    obj.body.rows[y].parent = obj.body;
    }; 
  obj.cells = function(y,x) { return obj.body.rows[y].cells[x]};
  obj.resize=function() {obj.body.size=[obj.clientSize[0],obj.clientSize[1]-headheight]};
  obj.rowclick=function(idx){};
  return obj
  };
//------------------------------------14:44 01/10/2014------------------------------------------
//    V 4.00
//------------------------------------------------------------------------------

function eldiv() {
  var o = document.createElement('div');
  var pos=[0,0,0,0], bor=[0,0,0,0], pad=[0,0,0,0];
  o.style.position = 'absolute';
  o.style.border='0 solid #999';

  Object.defineProperty(o, "parent", { 
    get: function () { return o.parentNode },
    set: function (x) { x.appendChild(o) }
    });
  Object.defineProperty(o, "text", { 
    get: function () {if (o.t) {return o.t.nodeValue}},
    set: function (s) {if (o.t) {o.t.nodeValue=s}else{o.t=document.createTextNode(s);o.appendChild(o.t)}}
    });
  Object.defineProperty(o, "y", { 
    get: function () {return pos[1]},
    set: function (i) {pos[1]=i; o.style.top=i+'px'}   
    });
  Object.defineProperty(o, "x", { 
    get: function () {return pos[0]},
    set: function (i) {pos[0]=i; o.style.left=i+'px'}   
    });
  Object.defineProperty(o, "w", { 
    get: function () {return bor[3]+pad[3]+pos[2]+pad[1]+bor[1] },
    set: function (i) {pos[2]=i-(bor[3]+pad[3]+pad[1]+bor[1]); o.style.width=pos[2]+'px';}  
    });
  Object.defineProperty(o, "h", { 
    get: function () {return bor[0]+pad[0]+pos[3]+pad[2]+bor[2]},
    set: function (i) {pos[3]=i-(bor[0]+pad[0]+pad[2]+bor[2]); o.style.height=pos[3]+'px';}
    });
  Object.defineProperty(o, "borderWidth", { 
    get: function () {return bor},
    set: function (i) {bor = i; o.style.borderWidth=bor[0]+'px '+bor[1]+'px '+bor[2]+'px '+bor[3]+'px'}  
    });
  Object.defineProperty(o, "padding", { 
    get: function () {return pad},
    set: function (i) {pad = i; o.style.padding=pad[0]+'px '+pad[1]+'px '+pad[2]+'px '+pad[3]+'px'}  
    });

  return o
  };

//---------------------------------------------------------------------
function elm() {
  var o = document.createElement('div');
  var xpos=[0,0], xsize=[0,0], xbor=[0,0,0,0], xpad=[0,0,0,0];
  o.style.position = 'absolute';
  o.style.overflow = 'hidden';
  o.style.border='0 solid #999';
  Object.defineProperty(o, "parent", { 
    get: function () { return o.parentNode },
    set: function (x) { x.appendChild(o) }
    });
  Object.defineProperty(o, "text", { configurable: true,
    get: function () {if (o.t) {return o.t.nodeValue}},
    set: function (s) {if (o.t) {o.t.nodeValue=s}else{o.t=document.createTextNode(s);o.appendChild(o.t)}}
    });
  Object.defineProperty(o, "pos", { 
    get: function () {return xpos},
    set: function (i) {xpos=i; o.style.left=xpos[0]+'px'; o.style.top=xpos[1]+'px'}   
    });
  Object.defineProperty(o, "size", { 
    get: function () {return [xbor[3]+xpad[3]+xsize[0]+xpad[1]+xbor[1],xbor[0]+xpad[0]+xsize[1]+xpad[2]+xbor[2]] },
    set: function (i) {xsize=i; 
      xsize[0]-=(xbor[3]+xpad[3]+xpad[1]+xbor[1]);o.style.width=xsize[0]+'px';
      xsize[1]-=(xbor[0]+xpad[0]+xpad[2]+xbor[2]);o.style.height=xsize[1]+'px';
      o.resize();
      }
    });
  Object.defineProperty(o, "bor", { 
    get: function () {return xbor},
    set: function (i) {xbor = i; o.style.borderWidth=xbor[0]+'px '+xbor[1]+'px '+xbor[2]+'px '+xbor[3]+'px'}   
    });
  Object.defineProperty(o, "pad", { 
    get: function () {return xpad},
    set: function (i) {xpad = i; o.style.padding=xpad[0]+'px '+xpad[1]+'px '+xpad[2]+'px '+xpad[3]+'px'}   
    });
  Object.defineProperty(o, "font", { 
    get: function () {return [o.style.fontFamily, o.style.fontSize]},
    set: function (i) {o.style.fontFamily=i[0];o.style.fontSize=i[1]+'px'}   
    });
  Object.defineProperty(o, "visible", { 
    get: function () {return o.style.display=='none'? false: true},
    set: function (i) {o.style.display=i==false?'none':''}   
    });
  Object.defineProperty(o, "clientSize", { 
    get: function () {return xsize}
    });
  o.resize = function() {};
  return o
  };

function checkbox() {
  var xval=0;
  var col='#555';
  var o=new elm();
  o.style.outline='2px solid #999';
  o.style.borderColor='#fff';
  o.style.backgroundColor='#fff';
  o.bor=[2,2,2,2];
  o.size=[14,14];
  Object.defineProperty(o, "value", { 
    get: function () {return xval},
    set: function (i) {xval=i; o.style.backgroundColor=xval?col:'#fff'} });
  o.style.cursor='pointer';
  o.onchange=function(){};
  o.swap=function(){xval=xval?0:1; o.value=xval; o.onchange()};
  o.onmousedown = o.swap;
  return o };

function label() {
  var o=new elm();
  o.style.cursor='default';
  return o };

function textbox2() {
  var xpos=[0,0], xsize=[0,0];
  var xbor=[0,0,0,0], xpad=[0,0,0,0];
  var o = document.createElement('input');o.type = 'text';
  o.id = Math.floor((Math.random() * 10000) + 1);
  o.style.position = 'absolute';
  o.style.border='0px solid #999';

  Object.defineProperty(o, "parent", { 
    get: function () { return o.parentNode },
    set: function (x) { x.appendChild(o) }
    });
  Object.defineProperty(o, "pos", { 
    get: function () {return xpos},
    set: function (i) {xpos=i; o.style.left=xpos[0]+'px'; o.style.top=xpos[1]+'px'}   
    });
  Object.defineProperty(o, "size", { 
    get: function () {return [xbor[3]+xpad[3]+xsize[0]+xpad[1]+xbor[1],xbor[0]+xpad[0]+xsize[1]+xpad[2]+xbor[2]] },
    set: function (i) {xsize=i; 
      xsize[0]-=(xbor[3]+xpad[3]+xpad[1]+xbor[1]);o.style.width=xsize[0]+'px';
      xsize[1]-=(xbor[0]+xpad[0]+xpad[2]+xbor[2]);o.style.height=xsize[1]+'px';
      o.resize();
      }
    });
  o.resize = function() {};
  Object.defineProperty(o, "bor", { 
    get: function () {return xbor},
    set: function (i) {xbor = i; o.style.borderWidth=xbor[0]+'px '+xbor[1]+'px '+xbor[2]+'px '+xbor[3]+'px'}   
    });
  Object.defineProperty(o, "pad", { 
    get: function () {return xpad},
    set: function (i) {xpad = i; o.style.padding=xpad[0]+'px '+xpad[1]+'px '+xpad[2]+'px '+xpad[3]+'px'}   
    });
  Object.defineProperty(o, "font", { 
    get: function () {return [o.style.fontFamily, o.style.fontSize]},
    set: function (i) {o.style.fontFamily=i[0];o.style.fontSize=i[1]+'px'}   
    });
  Object.defineProperty(o, "visible", { 
    get: function () {return o.style.display=='none'? false: true},
    set: function (i) {o.style.display= i==false?'none':''}   
    });
  return o
  }

function button2() {
  var o=new elm();
  o.style.textAlign='center';
  o.style.cursor = 'pointer';
  return o };

function checkbox2() {
  var xval=0;
  var cnt=new elm();
  cnt.bor=[2,2,2,2];
  cnt.style.borderRadius="25%";
  var b=new elm();
  var c1=new elm();
  with (c1.style){
    backgroundColor="#454";transformOrigin='center center';transform='rotate(45deg)';};
  var c2=new elm();
  with (c2.style){
    backgroundColor="#454";transformOrigin='center center';transform='rotate(-45deg)';};
  cnt.resize=function(){
    b.size=cnt.clientSize;
    c1.size=[b.size[0]/6,b.clientSize[1]];
    c1.pos=[(b.clientSize[0]-c1.size[0])/2,0];
    c1.style.borderRadius=(b.size[0]/10)+'px';
    c2.size=[b.size[0]/6,b.clientSize[1]];
    c2.pos=[(b.clientSize[0]-c1.size[0])/2,0];
    c2.style.borderRadius=(b.size[0]/10)+'px';
    };
  c1.visible=false;c2.visible=false;
  Object.defineProperty(cnt, "value", { 
    get: function () {return xval},
    set: function (i) {xval=i; var v=i?true:false; c1.visible=v;c2.visible=v} });
  cnt.onchange=function(){};
  cnt.swap=function(){cnt.value=xval?0:1; cnt.onchange()};
  b.onclick=cnt.swap;
  c1.parent=b;c2.parent=b;b.parent=cnt;
  return cnt };


function triangle(){
  var o=document.createElement('div');
  var xpos=[0,0], xsize=[0,0];
  o.style.position = 'absolute';
  o.style.borderStyle='solid';
  Object.defineProperty(o, "color", { 
    get: function () {return ''},
    set: function (i) {o.style.borderColor='transparent transparent '+i}  
    });
  o.color='#444';
  Object.defineProperty(o, "parent", { 
    get: function () { return o.parentNode },
    set: function (x) { x.appendChild(o) }
    });
  Object.defineProperty(o, "size", { 
    get: function () {return xsize},
    set: function (i) {xsize=i;
      o.style.borderWidth='0 ' + (i[0]/2) +'px '+i[1]+'px '+ (i[0]/2) +'px'; 
      }
    });
  Object.defineProperty(o, "pos", { 
    get: function () {return xpos},
    set: function (i) {xpos=i; o.style.left=xpos[0]+'px'; o.style.top=xpos[1]+'px'}   
    });
  return o;
  }