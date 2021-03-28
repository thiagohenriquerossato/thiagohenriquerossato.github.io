let initialPosition=''

window.onload = function() {
	var boxs = document.getElementsByClassName("box");
	let clicked=false
	for(var i=0; i<boxs.length; i++) {
    boxs[i].addEventListener("click", function() {
      if(!clicked){
        const pos = this.className
        initialPosition = pos[4] + pos[5]
        clicked=true
        main()
        myLoop();
      }
    });
	}
}


let horsePath=[[],[],[],[],[],[],[],[],];
for(var i=0;i<8;i++){
    for(var j=0;j<8;j++){
      horsePath[i][j]=0;
    }
}
let horsePathChessNotation=[];


function convertToChessNotation(x,y){
  switch(x)
  {
    case 0:
      x='8'
      break;
    case 1:
      x='7'
      break;
    case 2:
      x='6'
      break;
    case 3:
      x='5'
      break;
    case 5:
      x='3'
      break;
    case 6:
      x='2'
      break;
    case 7:
      x='1'
      break;
  }
  const notation = `${String.fromCharCode(y+97)}${x}`;
  return notation;
}

function convertToCoordinate(char){
  let [x,y] = char;
  switch(y)
  {
    case '8':
      y=0
      break;
    case '7':
      y=1
      break;
    case '6':
      y=2
      break;
    case '5':
      y=3
      break;
    case '4':
      y=4
      break;
    case '3':
      y=5
      break;
    case '2':
      y=6
      break;
    case '1':
      y=7
      break;
  }
  x = x.charCodeAt(0)%97;
  return [y,x];
}
function getPossibilities(x,y){
  const moveX=[2,1,-1,-2,-2,-1,1,2];
  const moveY=[1,2,2,1,-1,-2,-2,-1];
  let possibilities=[];
  for(var i=0;i<8;i++){
    const nextMoveX = x + moveX[i];
    const nextMoveY = y + moveY[i];
    if(nextMoveX>=0 && nextMoveX<8 && nextMoveY>=0 &&
      nextMoveY<8 && horsePath[nextMoveX][nextMoveY]==0){
        possibilities.push([nextMoveX,nextMoveY]);
      }
  }
  return possibilities;
}

function knightsTour(initialPosition){
  let[xPos,yPos]= convertToCoordinate(initialPosition);
  let counter=2;
  horsePathChessNotation.push(convertToChessNotation(xPos,yPos));
  horsePath[xPos][yPos]=1;
  for( var i = 0; i<=62; i++ ){
    const positions = getPossibilities(xPos,yPos);
    let minimum = positions[0];
    positions.forEach(position =>{
      const currentPossibilities = getPossibilities(position[0],position[1]);
      const minimumPossibilities = getPossibilities(minimum[0],minimum[1]);
      if(currentPossibilities.length<=minimumPossibilities.length){
        minimum=position;
      }
    })
    xPos = minimum[0];
    yPos = minimum[1];
    horsePath[xPos][yPos]=counter;
    horsePathChessNotation.push(convertToChessNotation(xPos,yPos));
    counter +=1;
  }
}

function print(a) {
  for (let i = 0; i < 8; i += 1) { 
    let line = ''; 
    for (let j = 0; j < 8; j += 1) {
        const space = a[j*8+i] > 9?"  ":"   "
        line = line + space + a[i][j];
    }
    console.log(`${line}\n`);
  }
}

function main(){
  knightsTour(initialPosition);  
}



function initializeAnimation(){
  for(var i=0;i<horsePathChessNotation.length;i++){
    anime({
      targets: `div.box.${horsePathChessNotation[i]}`,
      backgroundColor: '#FFF',
      duration: 800,  
      delay: 500
    });
  }
}

var i = 0;
var a = 0;                  

function myLoop() {         
  setTimeout(function() {   
    anime({
      targets: `div.box.${horsePathChessNotation[i]}`,
      // backgroundColor: '#FFF',
      color: 'rgba(255, 0, 242, 1)',
      duration: 800,  
      delay: 500
    });
    i++;
    a+=5                   
    if (i < horsePathChessNotation.length) {        
      myLoop();         
    }                
  }, 700-a)

}



