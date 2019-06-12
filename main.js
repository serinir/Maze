var canvas = document.querySelector("canvas")
canvas.width  = 1000;
canvas.height = 1000;
var maze=canvas.getContext("2d");
maze.fillStyle = "white";
maze.fillRect(0,0,canvas.width,canvas.height);
maze.strokeStyle="blue";

var door=true;

//The cell prototype
function cell(i,j){
    this.i = i;
    this.j = j;
    this.visited=false;
    this.walls = [true,true,true,true];
    
    this.show = function(){
        maze.beginPath();
        if(this.walls[0]){
            maze.moveTo(i   ,j)
            maze.lineTo(i+40,    j)
        }
        if(this.walls[1]){
            maze.moveTo(i+40,j)
            maze.lineTo(i+40,j+40)
        }
        if(this.walls[2]){
            maze.moveTo(i+40,j+40)
            maze.lineTo(i ,j+40)
        }
        if(this.walls[3]){
            maze.moveTo(i    ,j+40   )
            maze.lineTo(i    ,j)
        }
        maze.stroke();
    }
    this.visit=function(){
        // maze.fillStyle="green";
        // maze.fillRect(i,j,40,40);
        this.visited=true;
    }
    this.visitoo=function(){
        maze.fillStyle="red";
        maze.fillRect(i,j,40,40);
    }
}
// GRID MAKING
    var h = 25;
    var w = 25;
    let grid = [];
    for(var i = 0;i<h;i++)
        for(var j = 0 ;j< w;j++){
            var c = new cell(i*40,j*40);
            grid.push(c);
        }
    
//MAAAAAZ MAKING
  var ic;
  function maker(i,e){
    ic = grid[i];
    ic.walls[e]=false;
    ic.visit();
    let pos = [];
    if(ic.i !== 0)
        {pos.push(-w);console.log(1);}
    if(ic.i !== (w-1)*40)
        {pos.push(w);console.log(2)}
    if(ic.j !== 0)
        {pos.push(-1);console.log(3)}
    if(ic.j !== (h-1)*40)
        {pos.push(1);console.log(4)}

    console.log("dis is pos befor => "+pos)
   
   
   
   
    while(pos.length> 0){
        let random =Math.floor(Math.random()*pos.length);
        let next = pos.splice(random,1)
            console.log("dis is random => "+random)
            console.log("dis is i => "+i)
            console.log("dis is pos => "+pos)
            console.log("dis is next => "+next[0])
            console.log(grid[i+next[0]].visited)
        if( door && (grid[i].i == (h-1)*40 || grid[i].j == (w-1)*40))
            
                if(grid[i].i == (h-1)*40){grid[i].walls[1]=false;door=false;}
                else if (grid[i].j == (w-1)*40){grid[i].walls[2]=false;door=false;}
                
        if( grid[i+next[0]].visited !== true)        
            switch (next[0]) {
                case -w:
                    grid[i].walls[3]=false;
                    console.log("gauche",i,"====",next[0]+i)
                    maker(i-w,1)
                    console.log("===== wellina el ==> ",i,"====",next[0]+i);
                    break;
                case w:
                    grid[i].walls[1]=false;  
                    console.log("droit ",i,"====",next[0]+i)
                    maker(i+w,3)
                    console.log("===== wellina el ==> ",i,"====",next[0]+i);
                    break;
                case -1:
                    console.log("haut",i,"====",next[0]+i);
                    grid[i].walls[0]=false;
                    maker(i-1,2)
                    console.log("===== wellina el ==> ",i,"====",next[0]+i);
                    break;
                case 1:
                    console.log("bas ",i,"====",next[0]+i)
                    grid[i].walls[2]=false;
                    maker(i+1,0)
                    console.log("===== wellina el ==> ",i,"====",next[0]+i);
                    break;
                }
            
    }

    
}

(maker)(25,0)
grid.forEach(e => e.show());

