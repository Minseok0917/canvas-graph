const create = element => document.createElement(element);

const random = (max,min) => Math.floor( Math.random()*(max-min) )+min;

// const se = randomAll(random(20,10),10000,500);
function randomAll(count,max,min){
	let array = [];
	for(let i=0; i<count; i++){
		array = [...array,random(max,min)];
	}
	return array;
}


function NewGrape(){
	const canvas = create("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight/1.5;
	const padding = 40;
	ctx.fillStyle = "#eee";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	document.body.append(canvas);
	return {
		bar:(data,color)=>{
			ctx.globalAlpha = 0.25;
			const w = (canvas.width-padding)/(data.length-1);
			const h = (canvas.height-50)/Math.max(...data);
			ctx.beginPath();
			ctx.moveTo(padding,canvas.height);
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			data.forEach( (value,idx) =>{
				if( idx ){
					ctx.lineTo(idx*w,canvas.height-h*value);
				}
			} );
			ctx.lineTo((data.length-1)*w,canvas.height);
			ctx.closePath();
			ctx.fillStyle = color;
			ctx.fill();

		},
		line:(data,color)=>{
			ctx.globalAlpha = 0.6;
			const w = (canvas.width-padding)/(data.length-1);
			const h = (canvas.height-50)/Math.max(...data);
			ctx.beginPath();
			ctx.moveTo(padding,canvas.height-h);
			data.forEach( (value,idx) =>{
				if( idx ){
					ctx.lineTo(idx*w,canvas.height-h*value);
				}
			} );
			ctx.lineTo(canvas.width-padding,canvas.height);
			ctx.strokeStyle = color;
			ctx.lineWidth = 5;
			ctx.stroke();
		},
		circle:(data,color)=>{
			ctx.globalAlpha = 1;
			const w = (canvas.width-padding)/(data.length-1);
			const h = (canvas.height-50)/Math.max(...data);
			data.forEach( (value,idx) => {
				if( idx ){
					circle(ctx,idx*w,canvas.height-h*value,3,color)
				}
			});
		}
	}
}
function circle(context,x,y,size,color="#333"){
	context.beginPath();
	context.arc(x,y,size,0,Math.PI*2);
	context.fillStyle = color;
	context.fill();
}

const grape = NewGrape();
for(let i=0; i<random(3,1); i++){
	const data = randomAll(random(30,20),10000,500);
	const color = "#"+Math.round(Math.random()*0xFFFFFF).toString(16);
	grape.bar(data,color);
	grape.line(data,color);
	grape.circle(data,color);
}