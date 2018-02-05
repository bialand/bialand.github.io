
var CREATE_HTML5_DRAW = function  (targetWindow,w,h)
{
  function inRad(num) {
  	return num * Math.PI / 180;
    }
  var VIEW={};
  VIEW.X=0;
  VIEW.Y=0;
  VIEW.ZOOM=1;
  VIEW.W=w;
  VIEW.H=h;
  VIEW.MIN=w;if(h<w)VIEW.MIN=h;


  var canvasId=document.getElementById(targetWindow);
  var ctx=canvasId.getContext('2d');
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  canvasId.height = h;
  canvasId.width  = w;


var clr = function()
  {
    draw.ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasId.width, canvasId.height);
    ctx.fillStyle = "black";
    ctx.translate(canvasId.width/2, canvasId.height/2);
  }
var lin = function(x, y, xx, yy) {
    ctx.beginPath()
    ctx.moveTo((-VIEW.X +x) * VIEW.ZOOM, (-VIEW.Y -y) * VIEW.ZOOM);
    ctx.lineTo((-VIEW.X +xx) * VIEW.ZOOM, (-VIEW.Y -yy) * VIEW.ZOOM);
    ctx.stroke();
}
var rect = function(x, y, w,h) {
  ctx.save();
  ctx.scale(VIEW.ZOOM, VIEW.ZOOM);
  ctx.translate(x-VIEW.X, -y-VIEW.Y);
  ctx.fillRect(-w/2, -h/2, w, h);
  ctx.restore();
}
var rectBorder= function(x, y, w,h) {
  ctx.save();
  ctx.scale(VIEW.ZOOM, VIEW.ZOOM);
  ctx.translate(x-VIEW.X, -y-VIEW.Y);
  ctx.beginPath();
  ctx.rect(-w/2, -h/2, w, h);
  ctx.stroke();
  ctx.restore();
}
var squad = function(x, y, r, a) {
  ctx.save();
  //ctx.translate(canvasId.width/2, canvasId.height/2);
  ctx.scale(VIEW.ZOOM, VIEW.ZOOM);
  ctx.translate(x-VIEW.X, -y-VIEW.Y);
  ctx.rotate(inRad(a));
  ctx.fillRect(-r/2, -r/2, r, r);
  ctx.restore();
}
var cirr = function(x, y, r, a) {
  ctx.save();
  ctx.scale(VIEW.ZOOM, VIEW.ZOOM);
  ctx.translate(-VIEW.X, -VIEW.Y);
  ctx.beginPath();
  ctx.arc(x, -y , r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
var ttt = function(x, y, t, sz, cl) {

    ctx.font = sz + "px Arial"; ctx.fillStyle = cl;  ctx.fillText(t, x, y);
   }
var textToWorld = function(x, y, t, sz, cl) {
  ctx.save();
  ctx.textBaseline = "middle";
  ctx.scale(VIEW.ZOOM, VIEW.ZOOM);
  ctx.translate(x-VIEW.X, -y-VIEW.Y);
  ctx.font = sz + "pt Arial";
  ctx.fillStyle = cl;
  ctx.textAlign = "center";
  ctx.fillText(t, 0, 0);
  ctx.restore();
}
var circ =  function (x, y, r)
  {
      ctx.beginPath();
      ctx.arc((-VIEW.X +x) * VIEW.ZOOM, (-VIEW.Y -y) * VIEW.ZOOM, r*VIEW.ZOOM, 0, Math.PI * 2);
      ctx.stroke();
  }


return{
  clr:clr,
  lin:lin,
  ttt:ttt,
  circ:circ,
  ctx:ctx,
  squad:squad,
  rect:rect,
  rectBorder:rectBorder,
  cirr:cirr,
  textToWorld:textToWorld,
  canvasId:canvasId,
  'VIEW':VIEW
  }

};
