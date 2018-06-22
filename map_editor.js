var imgBox={
	items:[],
	objects:[],
	platform:[]
};
var map={
	items:[],
	objects:[],
	platform:[]
}
var selection=-1, mode="none";
var wid=0, hei=0;

function preload()
{
	var urlData=loadJSON("resource/resource_url.json");
	for(var i in urlData.item)
	{
		imgBox.items[i]=loadImage(urlData.items[i],function(){this.count++;}.bind(this));
		imgBox.items[i].resize(20,20);
	}
	for(var i in urlData.objects)
	{
		imgBox.objects[i]=loadImage(urlData.objects[i],function(){this.count++;}.bind(this));
		imgBox.objects[i].resize(20,20);
	}
	for(var i in urlData.platform)
	{
		imgBox.platform[i]=loadImage(urlData.platform[i],function(){this.count++;}.bind(this));
		imgBox.platform[i].resize(20,20);
	}
}

function setup() {
	createCanvas(windowWidth,windowHeight);
}

function draw() {
	if(key=='1') mode="items", selection=1;
	else if(key=='2') mode='platform', selection=4;
	else if(key=='0') mode='none', selection=-1;
	background(255);
	cursor();
	drawTile();
}

function cursor()
{
	if(mode!="none")
	{
		if(selection!=-1)
		{
			tint(255,120);
			image(imgBox[mode][selection],mouseX,mouseY);
			noTint();
		}
	}
}

function drawTile()
{
	for (var mode in map)
	{
		for (var i=0; i<wid; i++)
		{
			if(map[mode][i]===undefined) map[mode][i]=[];
			for(var j=0;j<hei;j++)
			{
				if(map[mode][i][j]===undefined) map[mode][i][j]=0;
				if(map[mode][i][j]!==0)
				{
					image(imgBox[mode][map[mode][i][j]-1],i*20,j*20);
				}
			}
		}
	}
}

function mousePressed()
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
	var cur=map[mode];
	if(cur[x]===undefined) cur[x]=[];
	cur[x][y]=selection+1;
	if(x>=wid) wid=x+1;
	if(y>=hei) hei=y+1;
}
function delTile(x,y)
{
	for (var mode in map)
	{
		var cur=map[mode];
		if(cur[x]===undefined) cur[x]=[];
		cur[x][y]=0;
	}
}
