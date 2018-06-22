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
	if(mouseIsPressed) mouseFunc();
	Cursor();
	drawTile();
}

function keyPressed()
{
	if(key==' ') mnb.tog!=mnb.tog;
}

function mousePressed()
{
	if(mnb.tog)
	{
		for(var md in this.button)
		{
			for(var i in this.button[md])	
			{
				this.button[md][i].draw();
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
	for (var mode in Map)
	{
		for (var i=0; i<wid; i++)
		{
			if(Map[mode][i]===undefined) Map[mode][i]=[];
			for(var j=0;j<hei;j++)
			{
				if(Map[mode][i][j]===undefined) Map[mode][i][j]=0;
				if(Map[mode][i][j]!==0)
				{
					image(imgBox[mode][Map[mode][i][j]-1],i*20,j*20);
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
	this.button=this.makeBTN();
}
menubar.prototype.makeBTN=function()
{
	var res={};
	var n=0;
	for(var md in imgBox)
	{
		res[md]=[];
		for(var i in imgBox[md])	
		{
			res[md][i]=new BTN(imgBox[md][i],i*30+20,n*30);
			res[md][i].mouseOn(function(){mode=md, selection=i;})
		}
		n++;
	}
}
menubar.prototype.draw=function()
{
	if(this.tog)
	{
		noStroke();
		fill(220);
		rect(0,height-this.anim,width,this.anim);
		for(var md in this.button)
		{
			for(var i in this.button[md])	
			{
				this.button[md][i].draw();
			}
		}
	}
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
}
BTN.prototype.draw=function()
{
	if(this.show) image(this.img,this.x,this.y,this.w,this.h);
}
BTN.prototype.mouseOn=function(f)
{
	if(mouseX>this.x&&mouseX<this.x+this.w&&mouseY>this.y&&mouseY<this.y+this.h)
	{
		f();
	}
}
