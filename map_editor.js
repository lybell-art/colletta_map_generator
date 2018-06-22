var imgBox={
	items:[],
	objects:[],
	platform:[]
};
var Map={
	items:[],
	objects:[],
	platform:[]
};
var selection=-1, mode="none";
var wid=0, hei=0;
var mnb;

function preload()
{
	var urlData=loadJSON("resource/resource_url.json",
		function(urlData)
		{
			for(var i in urlData.item)
			{
				imgBox.items[i]=loadImage(urlData.item[i],function(img){img.resize(20,20)});
			}
			for(var i in urlData.objects)
			{
				imgBox.objects[i]=loadImage(urlData.objects[i],function(img){img.resize(20,20)});
			}
			for(var i in urlData.platform)
			{
				imgBox.platform[i]=loadImage(urlData.platform[i],function(img){img.resize(20,20)});
			}
		});
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	mnb=new menubar();
}

function draw() {
	if(key=='1') mode="items", selection=1;
	else if(key=='2') mode='platform', selection=4;
	else if(key=='0') mode='none', selection=-1;
	background(255);
	if(mouseIsPressed)
	{
		if(mnb.tog)
		{
			if(mouseY<height-100) mouseFunc();
		}
		else mouseFunc();
	}
	Cursor();
	drawTile();
	mnb.draw();
}

function keyPressed()
{
	if(key==' ') mnb.tog!=mnb.tog;
}

function mousePressed()
{
	if(mnb.tog)
	{
		for(var md in mnb.button)
		{
			for(var i in mnb.button[md])	
			{
				mnb.button[md][i].mouseOn();
			}
		}
	}
}

function Cursor()
{
	if(mode!="none")
	{
		if(selection!=-1)
		{
			tint(255,120);
			image(imgBox[mode][selection],mouseX-10,mouseY-10);
			noTint();
		}
	}
}

function drawTile()
{
	for (var md in Map)
	{
		for (var i=0; i<wid; i++)
		{
			if(Map[md][i]===undefined) Map[md][i]=[];
			for(var j=0;j<hei;j++)
			{
				if(Map[md][i][j]===undefined) Map[md][i][j]=0;
				if(Map[md][i][j]!==0)
				{
					image(imgBox[md][Map[md][i][j]-1],i*20,j*20);
				}
			}
		}
	}
}
function mouseFunc()
{
	var x=floor(mouseX/20);
	var y=floor(mouseY/20);
	if(mouseButton==LEFT)
	{
		if(mode!="none")
		{
			if(selection!=-1) addTile(x,y);
		}
	}
	else if(mouseButton==RIGHT)
	{
		delTile(x,y);
	}
}

function addTile(x,y)
{
	var Cur=Map[mode];
	if(Cur[x]===undefined) Cur[x]=[];
	Cur[x][y]=selection+1;
	if(x>=wid) wid=x+1;
	if(y>=hei) hei=y+1;
}
function delTile(x,y)
{
	for (var mode in Map)
	{
		var Cur=Map[mode];
		if(Cur[x]===undefined) Cur[x]=[];
		Cur[x][y]=0;
	}
}

function keyPressed()
{
	if(key==' ') mnb.tog=!mnb.tog;
}

function menubar()
{
	this.tog=false;
	this.button=makeBTN();
}
menubar.prototype.draw=function()
{
	if(this.tog)
	{
		noStroke();
		fill(220);
		rect(0,height-100,width,100);
		for(var md in this.button)
		{
			for(var i in this.button[md])	
			{
				this.button[md][i].draw();
			}
		}
	}
}

function makeBTN()
{
	var res={};
	var n=0;
	for(var md in imgBox)
	{
		res[md]=[];
		for(var i in imgBox[md])	
		{
			res[md][i]=new BTN(imgBox[md][i],i*30+20,n*30+10+height-100);
			res[md][i].f=setMouseOnFunc(md,i);
		}
		n++;
	}
	return res;
}

function setMouseOnFunc(p, q)
{
	function f(){
		mode=p, selection=parseInt(q);
	}
	return f;
}
function BTN(img,x,y,w,h)
{
	this.img=img;
	this.x=x;
	this.y=y;
	if(w===undefined) this.w=img.width;
	else this.w=w;
	if(h===undefined) this.h=img.height;
	else this.h=h;
	this.show=true;
	this.f=function(){};
}
BTN.prototype.draw=function()
{
	if(this.show) image(this.img,this.x,this.y,this.w,this.h);
}
BTN.prototype.mouseOn=function()
{
	console.log(mouseX,mouseY,this.x,this.y,this.w,this.h)
	if(mouseX>this.x&&mouseX<this.x+this.w&&mouseY>this.y&&mouseY<this.y+this.h)
	{
		this.f();
		return true;
	}
	else return false;
}
