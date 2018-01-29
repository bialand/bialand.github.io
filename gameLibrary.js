Object.prototype.clone=function()
  {
                               var cloned={};
    if(typeof this=="array"  ) var cloned=[];

    for (var key in this)
    {
                                      cloned[key] = this[key];
      if(typeof this[key]=="object" ) cloned[key] = this[key].clone();
      if(typeof this[key]=="array"  ) cloned[key] = this[key].clone();
    }
    return cloned;
  }
var CREATE_2D_WORLD = function  (targetDraw)
{


var nowTime=0;
var deltaTime=0;
var tim=0;
var time=0;
var draw=targetDraw;
var canvasId=draw.canvasId;
var m=[];
var settings={};
    settings.def=0;
var mouse={};
    mouse.left={};
    mouse.middle={};
    mouse.right={};
    mouse.worldX=0;
    mouse.worldY=0;

var xToWorld = function(position){
  return (position-canvasId.width/2) /draw.VIEW.ZOOM+draw.VIEW.X;
}

var yToWorld = function(position){
  return -(position-canvasId.height/2) /draw.VIEW.ZOOM-draw.VIEW.Y;
}

var createUnit = function(x,y,type){
  var a={};
  a.x=x;
  a.y=y;
  a.r=22;
  a.h=a.r*2;
  a.w=a.r*2;
  a.a=11;
  a.type=type;
  a.vx=0;
  a.vy=0;
  a.xx=0;
  a.yy=0;
  a.gun=1;
  a.anchor={x:0,y:0};
  a.color="rgb("+Math.round(Math.random()*256)+","+Math.round(Math.random()*256)+","+Math.round(Math.random()*256)+")";
  a.alpha=1;
  m.push(a);

  return a;

}
var createUI = function(type2,x,y,w,h,value,own){
  var a={};
  a.x=x;  a.y=y;  a.w=w;  a.h=h;
  a.value=value;
  a.valueObject=own;
  a.minValue=0;
  a.maxValue=1;
  a.type="UI";
  a.type2=type2;
  a.anchor={x:0,y:0};
  if('type' in own){a.anchor=own;}
  a.color="#999999";
  a.text=value;
  a.mouseDown=0;

  if(  value in a.valueObject)if (typeof a.valueObject[value] != "number" ){a.valueObject[value]=0;}
    if( !(value in a.valueObject)){a.valueObject[value]=0;}
  if(type2=="button")  a.action = function()
    {
      if(this.mouseDown==0 && mouse.left.down==1)
      if(mouse.worldX<this.anchor.x+this.x+this.w/2)
      if(mouse.worldX>this.anchor.x+this.x-this.w/2)
      if(mouse.worldY<this.anchor.y+this.y+this.h/2)
      if(mouse.worldY>this.anchor.y+this.y-this.h/2)
      {
        this.mouseDown=1;
        if(this.valueObject[this.value]==0)this.valueObject[this.value]=1;
                              else this.valueObject[this.value]=0;
      }
      if(mouse.left.down==0)
      {
        this.mouseDown=0;
      }

    };
  if(type2=="scroll")  a.action = function()
    {
      if(mouse.left.click==1)

      if(mouse.worldX<this.anchor.x+this.x+this.w/2)
      if(mouse.worldX>this.anchor.x+this.x-this.w/2)
      if(mouse.worldY<this.anchor.y+this.y+this.h/2)
      if(mouse.worldY>this.anchor.y+this.y-this.h/2)
      {
        this.mouseDown=1;
      }
      if(mouse.left.down==0)
      {
        this.mouseDown=0;
      }
      if(this.mouseDown==1)
      {
        var tmp1=(game.mouse.worldX-(this.anchor.x+this.x)+this.w/2)/(this.w*0.9)-0.05;
        if(tmp1<0)tmp1=0;
        if(tmp1>1)tmp1=1;
        this.valueObject[this.value]=(tmp1*(this.maxValue-this.minValue)+this.minValue);
        if(this.valueObject[this.value]<this.minValue)this.valueObject[this.value]=this.minValue;
        if(this.valueObject[this.value]>this.maxValue)this.valueObject[this.value]=this.maxValue;

      }
    };

  m.push(a);

  return a;
}
var mouseCoords = {
  getX: function(e)
    {
      if (e.pageX)    return e.pageX;
      else if (e.clientX)    return e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
      return 0;
    },
  getY: function(e)
    {
      if (e.pageY)return e.pageY;
      else if (e.clientY)    return e.clientY+(document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
      return 0;
    }
}

canvasId.onmousemove = function(e){
  mouse.left.click=0;
  var E = e || event;
  if(E.buttons%2==0)mouse.left.down  =0;
  if(E.buttons==0)
  {
    mouse.left.down  =0;
    mouse.middle.down  =0;
    mouse.right.down  =0;
  }
  if ("layerX" in E) { mouse.X = E.layerX; mouse.Y = E.layerY; }
  if ("x"      in E) { mouse.X = E.x     ; mouse.Y = E.y     ; }
  if ("pageX"  in E) { mouse.X = E.pageX ; mouse.Y = E.pageY ; }
  mouse.worldX=xToWorld(mouse.X);
  mouse.worldY=yToWorld(mouse.Y);
  if (mouse.left.down  ==1){mouse.left.dx  =mouse.X;mouse.left.dy  =mouse.Y;}
  if (mouse.middle.down==1){draw.VIEW.X-=(mouse.X-mouse.middle.dx)/draw.VIEW.ZOOM; draw.VIEW.Y-=(mouse.Y-mouse.middle.dy)/draw.VIEW.ZOOM;  mouse.middle.dx=mouse.X;mouse.middle.dy=mouse.Y;}
  if (mouse.right.down ==1){mouse.right.dx =mouse.X;mouse.right.dy =mouse.Y;}
  }
canvasId.onmousedown = function(e){
  mouse.left.click=0;
  var E = e || event;
  if ("layerX" in E) { mouse.X = E.layerX; mouse.Y = E.layerY; }
  if ("x"      in E) { mouse.X = E.x     ; mouse.Y = E.y     ; }
  if ("pageX"  in E) { mouse.X = E.pageX ; mouse.Y = E.pageY ; }
  mouse.worldX=xToWorld(mouse.X);
  mouse.worldY=yToWorld(mouse.Y);

  if (E.which==1)
  {
    if(mouse.left.down  == 0)mouse.left.click=1;
    mouse.left.down  =1;mouse.left.dx  =mouse.X;mouse.left.dy  =mouse.Y;

    //createUnit(mouse.worldX,mouse.worldY,"unit");

  }
  if (E.which==2){mouse.middle.down=1;mouse.middle.dx=mouse.X;mouse.middle.dy=mouse.Y;}
  if (E.which==3){mouse.right.down =1;mouse.right.dx =mouse.X;mouse.right.dy =mouse.Y;}
}
canvasId.onmouseup = function(e){
  mouse.left.click=0;
  var E = e || event;
  if ("layerX" in E) { mouse.X = E.layerX; mouse.Y = E.layerY; }
  if ("x"      in E) { mouse.X = E.x     ; mouse.Y = E.y     ; }
  if ("pageX"  in E) { mouse.X = E.pageX ; mouse.Y = E.pageY ; }
  mouse.worldX=xToWorld(mouse.X);
  mouse.worldY=yToWorld(mouse.Y);
  if (E.which==1){mouse.left.down  =0;mouse.left.ux  =mouse.X;mouse.left.uy  =mouse.Y;}
  if (E.which==2){mouse.middle.down=0;mouse.middle.ux=mouse.X;mouse.middle.uy=mouse.Y;}
  if (E.which==3){mouse.right.down =0;mouse.right.ux =mouse.X;mouse.right.uy =mouse.Y;}
}
canvasId.oncontextmenu= function(e){return false;};
canvasId.onwheel = function(e){
  var E = e || event;
  var delta = E.deltaY || E.detail || E.wheelDelta;

  if(delta<0)draw.VIEW.ZOOM*=1.2;
  if(delta>0)draw.VIEW.ZOOM/=1.2;

  if (draw.VIEW.ZOOM < 0.1) draw.VIEW.ZOOM = 0.1;
  if (draw.VIEW.ZOOM > 4  ) draw.VIEW.ZOOM = 4;
}

var loopOnTimer = function(){
  deltaTime=performance.now()-nowTime;
  if(deltaTime>1000)deltaTime=1000;
  nowTime=performance.now();
  dt=deltaTime;

  draw.clr();

  //draw.lin(-1000, -100, 1000, -100);
  //draw.lin(-1000,  100, 1000,  100);
  draw.cirr(mouse.worldX,mouse.worldY,3);
  draw.ctx.beginPath(); draw.ctx.arc(20-canvasId.width/2, 20-canvasId.height/2, 10, (Math.PI / 180) * tim * 15, (Math.PI / 180) * (tim * 15 + 190)); draw.ctx.stroke(); tim++;

  for (var key in m)
    if(  'type' in (m[key]))if (typeof m[key]['type'] == "string" )
    {
      var p=m[key];
        if ( p['type'] == "autoUnit" )
          {
            draw.ctx.globalAlpha = p.alpha;
            draw.ctx.fillStyle = p.color;
            draw.cirr(p.anchor.x+p.x,p.anchor.y+p.y,p.r);
            draw.lin(p.anchor.x+p.x,  p.anchor.y+p.y,  p.anchor.x+p.x+p.xx*p.gun, p.anchor.y+p.y+p.yy*p.gun);
            draw.ctx.globalAlpha = 1;
            if (0 && 'memory' in p )for(var i=0;i<server.memorySize;i++)
            {
              draw.cirr(p.memory[i].x,p.memory[i].y,p.r*(server.memorySize-i)/server.memorySize);
            }
          }
        if ( p['type'] == "udpPack" && settings.showTraffic==1)
          {
            draw.ctx.fillStyle = p.color;
            draw.squad(p.x,p.y,9,0);

          }
        if ( p['type'] == "udpPort" && settings.showTraffic==1)
          {
            draw.ctx.fillStyle = p.color;
            draw.rectBorder(p.anchor.x+p.x,p.anchor.y+p.y,22,22,0);
            draw.textToWorld(p.anchor.x+p.x, p.anchor.y+p.y , "UDP", 6, "#000");
          }

        if ( p['type'] == "UI" )
          {
            draw.ctx.fillStyle ="#000000"
              draw.rect(p.anchor.x+p.x,p.anchor.y+p.y,p.w,p.h);
            draw.ctx.fillStyle = p.color;
              draw.rect(p.anchor.x+p.x,p.anchor.y+p.y,p.w-2,p.h-2);
            draw.textToWorld(p.anchor.x+p.x, p.anchor.y+p.y , p.text+"="+Math.round(p.valueObject[p.value]*100)/100, p.h-8, "#000");
          }

        if(  'draw'    in (p))if (typeof p['draw']    == "function" ) p.draw();
        if(  'action'  in (p))if (typeof p['action']  == "function" ) p.action();
        if(  'onEvent' in (p))if (typeof p['onEvent'] == "function" )
          {
            if(p.mouseDown==0 && mouse.left.down==1)
            if(mouse.worldX<p.anchor.x+p.x+p.w/2)
            if(mouse.worldX>p.anchor.x+p.x-p.w/2)
            if(mouse.worldY<p.anchor.y+p.y+p.h/2)
            if(mouse.worldY>p.anchor.y+p.y-p.h/2)
            {
              p.mouseDown=1;
              p.onEvent('leftClick');
            }
            if(mouse.left.down==0)
            {
              p.mouseDown=0;
            }
          }

        if ( p['type'] == "toDelete" )
          {
            p="undefined";
            delete p;
            delete m[key];
          }
    }

}

setInterval(loopOnTimer,10);

var normalize=function(vec2){
  vec2.r=Math.sqrt(vec2.x*vec2.x+vec2.y*vec2.y);
  if(vec2.r==0)vec2.r=1;
  vec2.nx=vec2.x/vec2.r;
  vec2.ny=vec2.y/vec2.r;
};

return{
  loopOnTimer:loopOnTimer,
  mouse:mouse,
  createUnit:createUnit,
  createUI:createUI,
  settings:settings,
  normalize:normalize
}

};
