let context = document.getElementById("canvas").getContext("2d");
height = document.documentElement.clientHeight*0.97;
width = height;
let fx,fy,sx,sy,fl,sl;
let lastRotf=0,lastRots=0;
let grubosc=2;
let lastx;
let history = [[]];
context.canvas.height = height;
context.canvas.width = width;


function init(){
    fl=parseInt( document.getElementById('first').value);
    sl=parseInt( document.getElementById('second').value);
  fx=fl;
  fy=0;
  sx=0;
  sy=0;
  fx+=width/2
  fy+=width/2
  sx+=width/2
  sy+=width/2
 /* fx=fl;
  fy=0;
  sx=0;
  sy=sl;*/
  history = [[sx,sy]];

}

function drawGrid(context,color,scale){
  context.strokeStyle =color;
  let line=width/2
  while(line<width){
    context.beginPath();
    context.moveTo(line,0);
    context.lineTo(line,height);
    context.stroke();
    line+=scale;
  }
  line=width/2
  let first=true;
  while(0<line){
    if(first){
      first=false;
    }else{
    context.beginPath();
    context.moveTo(line,0);
    context.lineTo(line,height);
    context.stroke();
  }
    line-=scale;
  }
  line=height/2;
  while(0<line){
    context.beginPath();
    context.moveTo(0,line);
    context.lineTo(width,line);
    context.stroke();
    line-=scale;
  }
    line=height/2;
  while(line<height){
      context.beginPath();
      context.moveTo(0,line);
      context.lineTo(width,line);
      context.stroke();
      line+=scale;
  }
}

function drawArm(rot1,rot2) {// rotacja sumowana  wewnątrz funkcji
       context.clearRect(0, 0, width,height);
       console.log("ROT"+rot1+" "+rot2)

      drawGrid(context,"#898989",20);
      drawGrid(context,"#00FF00",100);
        let r1=lastRotf/**Math.PI/180*/;
        let r2=lastRots/**Math.PI/180*/;

    if(!isNaN(rot1)){
       r1+=rot1;
       lastRotf=r1;
     }

    if(!isNaN(rot2)){
     r2+=rot2;
     lastRots=r2;
   }

       fx=fl*Math.cos(r1);
       fy=fl*Math.sin(r1);

       let k2=  (r1+r2);

       sx=fx+(sl*Math.cos(Math.PI+k2));
       sy=fy+(sl*Math.sin(Math.PI+k2));
       history.push([width/2+sx,height/2-sy]);
       context.lineWidth = 2*grubosc;

       context.strokeStyle ="#FF0000";
       context.beginPath();
       context.moveTo(history[0][0],history[0][1] );

       for(let i=1;i<history.length;i++){
           context.lineTo(history[i][0],history[i][1] );
       }
    context.stroke();
       context.lineWidth = 4*grubosc;
       context.strokeStyle ="#AAFFFF";
       context.beginPath();
       context.moveTo(width/2, height/2);


       context.lineTo(width/2+fx, height/2-fy);

       context.lineTo(width/2+sx, height/2-sy);
       console.log("r1 "+r1*180/Math.PI+" r2 "+r2*180/Math.PI/*+" k2 "+k2*/);


    sx+=fy;
       sy+=fx;
       context.stroke();
       context.lineWidth = 1*grubosc;

}

  document.getElementById('file').onchange = function(){

    let file = this.files[0];
    let reader = new FileReader();
  reader.onload = function(progressEvent){
    init();
    let fileContentArray = this.result.split(/\r\n|\n/);
    let line =0;
    setInterval(function () {
      if (line<=fileContentArray.length-1)
    {
      array=fileContentArray[line].split(' ');
      let r1,r2;
      for(let l = 0; l < array.length; l++){
          let letter=array[l].charAt(0).toUpperCase()
          if(letter=="L"){
              r1=parseFloat(array[l].substring(1)*Math.PI/180/*18/10*/);
              console.log("l "+r1)

          }
          if(letter=="S"){

              r2=parseFloat(array[l].substring(1)*Math.PI/180/*18/10*/);
              console.log("s "+r2)

          }
      }

      drawArm(r1,r2);
      ++line;
    }
  }, 1000);

  };
  reader.readAsText(file);

};
