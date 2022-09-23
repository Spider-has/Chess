let GAME = {
    width: 800,
    height: 800,
    backgroundColor: "white",
    moveNow: "white",
    countFigures: 16,
    ChaXXXXXX: false,
}

let infoWindow = {
    width: 300,
    height: 800,
    call: false,
    backgroundColor: "white",
    Figure: null,
    color: "",
}

var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
canvas.width = GAME.width + infoWindow.width;
canvas.height = GAME.height;

function initEventListeners() {
    window.addEventListener("click", onMouseClick);
}

function omegaInfoWindowDraw(){
    if(infoWindow.call){
        canvasContext.font = "24px serif";
        canvasContext.strokeStyle = "gray";
        canvasContext.length = 15;
        canvasContext.fillStyle = "white";
        canvasContext.beginPath();
        canvasContext.rect(GAME.width, 0, infoWindow.width, infoWindow.height);
        canvasContext.fill();
        canvasContext.stroke();
        canvasContext.rect(GAME.width + 10, 100, infoWindow.width - 20, 40);
        canvasContext.fill();
        canvasContext.stroke();
        canvasContext.rect(GAME.width + 10, 150, infoWindow.width - 20, 40);
        canvasContext.fill();
        canvasContext.stroke();
        canvasContext.rect(GAME.width + 10, 200, infoWindow.width - 20, 40);
        canvasContext.fill();
        canvasContext.stroke();
        canvasContext.rect(GAME.width + 10, 250, infoWindow.width - 20, 40);
        canvasContext.fill();
        canvasContext.stroke();
        canvasContext.rect(GAME.width + 10, 300, infoWindow.width - 20, 40);
        canvasContext.fill();
        canvasContext.stroke();
        canvasContext.fillStyle = "black";
        canvasContext.fillText('В кого превращать пешку?', GAME.width + 20, 50, infoWindow.width);
        canvasContext.fillText('Ферзь', GAME.width + 100, 125, 200);
        canvasContext.fillText('ладья', GAME.width + 100, 175, 200);
        canvasContext.fillText('слон', GAME.width + 100, 225, 200);
        canvasContext.fillText('конь', GAME.width + 100, 275, 200);
        canvasContext.fillText('кароль))', GAME.width + 100, 325, 200);
        canvasContext.closePath();
    } else{
        canvasContext.fillStyle = "white";
        canvasContext.beginPath();
        canvasContext.rect(GAME.width, 0, infoWindow.width, infoWindow.height);
        canvasContext.fill();
        canvasContext.closePath();
    }
}

function onMouseClick(event) {
    if(!infoWindow.call){
        for(let i = 0; i < GAME.countFigures; i++){
            if(GAME.moveNow === "white"){
                if(!White_figures[i].selected){
                    if(White_figures[i].posY === Math.floor(event.clientY / Path.cellHeight) && (White_figures[i].posX === Math.floor(event.clientX / Path.cellWidth))){
                        White_figures[i].selected = true;
                    }
                } else{
                    White_figures[i].NICEmove(Math.floor(event.clientY / Path.cellHeight),  Math.floor(event.clientX / Path.cellWidth));
                    Black_figures[15].BestEverCheckChax();
                }
            } else{
                if(!Black_figures[i].selected){
                    if(Black_figures[i].posY === Math.floor(event.clientY / Path.cellHeight) && (Black_figures[i].posX === Math.floor(event.clientX / Path.cellWidth))){
                        Black_figures[i].selected = true;
                    }
                } else{
                    Black_figures[i].NICEmove(Math.floor(event.clientY / Path.cellHeight),  Math.floor(event.clientX / Path.cellWidth));
                    White_figures[15].BestEverCheckChax();
                }
            }
        }
    }else{
        let Figure_class = 0;
        let posX = 0;
        let posY = 0;
        if(infoWindow.color === "white"){
            Figure_class = White_figures[infoWindow.Figure];
            posY = White_figures[infoWindow.Figure].posY;
            posX = White_figures[infoWindow.Figure].posX;
        } else{
            Figure_class = Black_figures[infoWindow.Figure];
            posY = Black_figures[infoWindow.Figure].posY;
            posX = Black_figures[infoWindow.Figure].posX;
        }
        if(event.clientX > GAME.width + 10 && event.clientX < GAME.width + infoWindow.width - 20){
            if(event.clientY >= 100 && event.clientY <= 140){
                Figure_class = new SuperPuperFerz(posY, posX , infoWindow.color, "ferz");
                infoWindow.call = false;
            }
            if(event.clientY >= 150 && event.clientY <= 190){
                Figure_class = new SUPERLadia(posY, posX , infoWindow.color, "Ladia");
                infoWindow.call = false;
            }
            if(event.clientY >= 200 && event.clientY <= 240){
                Figure_class = new OmegaSlon(posY, posX , infoWindow.color, "Slon");
                infoWindow.call = false;
            }
            if(event.clientY >= 250 && event.clientY <= 290){
                Figure_class = new NiceCoCK(posY, posX , infoWindow.color, "CoCk");
                infoWindow.call = false;
            }
            if(event.clientY >= 300 && event.clientY <= 340){
                alert('А незя)))');
            }
        }
        if(infoWindow.color === "white"){
            White_figures[infoWindow.Figure] = Figure_class;
        } else{
            Black_figures[infoWindow.Figure] = Figure_class;
        }
    }
}

class PathCreator {
    constructor(width, height, color1, color2){
        this.x = 0;
        this.y = 0;
        this.cellWidth = width / 8;
        this.cellHeight = height / 8;
        this.color1 = color1;
        this.color2 = color2;
        this.allPositions = Array(8);
        for (let i = 0; i < 8; i++) {
            this.allPositions[i] = Array(8).fill(0);
        }             
    }

    SUPERdrawPath() {
        canvasContext.beginPath();
        let colorNow;
        for(let i = 0; i < 64; i++){
            if(((i + (Math.floor(i / 8) % 2)) % 2) === 0){
                colorNow = this.color1;
            } else {
                colorNow = this.color2;
            } 
            canvasContext.fillStyle = colorNow;
            canvasContext.fillRect(this.x + i % 8 * this.cellWidth, this.y + Math.floor(i / 8) * this.cellHeight, this.cellWidth, this.cellHeight);
        }
        canvasContext.closePath();
    }
}

class figure{
    constructor(posY, posX, side, type){
        this.posX = posX;
        this.posY = posY;
        this.side = side;
        this.size = Path.cellWidth * 0.5;
        this.type = type;
        this.selected = false;
        this.movePositions = Array(8);
        this.firstMoveDone = false;
        this.isDied = false;
        for (let i = 0; i < 8; i++) {
            this.movePositions[i] = Array(8).fill(0);
        } 
        this.movePositions[this.posY][this.posX] = 1;
        if(this.type === "king"){
            this.side === "white" ? Path.allPositions[this.posY][this.posX] = 3 : Path.allPositions[this.posY][this.posX] = 4;
        } else {
            this.side === "white" ? Path.allPositions[this.posY][this.posX] = 1 : Path.allPositions[this.posY][this.posX] = 2;
        }
    }
    SUPERdraw(){
        if(!this.isDied){
            canvasContext.font = "24px serif";
            canvasContext.strokeStyle = "gray";
            canvasContext.length = 15;
            canvasContext.fillStyle = this.side;
            canvasContext.beginPath();
            canvasContext.rect(this.posX * Path.cellWidth + (Path.cellWidth - this.size) / 2, this.posY * Path.cellHeight + (Path.cellHeight - this.size) / 2, this.size, this.size);
            canvasContext.fill();
            canvasContext.stroke();
            canvasContext.fillStyle = "red";
            canvasContext.fillText(this.type, this.posX * Path.cellWidth + (Path.cellHeight - 70) / 2, this.posY * Path.cellHeight + (Path.cellHeight + 24) / 2, 100);
            canvasContext.closePath();
        }
    }

    NotBadMasNull(){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                this.movePositions[i][j] = 0;
            }
        }
    }

    BESTInitMovePositions(){}

    SUPERDESTROYAHAHHAHAHAHAHAHA(posX, posY){
        for(let i = 0; i < GAME.countFigures; i++){
            if(this.side === "white"){
                if(Black_figures[i].posX === posX && Black_figures[i].posY === posY){
                    Black_figures[i].isDied = true;
                    if(White_figures[15].BestEverCheckChax()){
                        Black_figures[i].isDied = false;
                    } else{
                        Black_figures[i].posX = -5;
                        Black_figures[i].posY = -5;
                    }
                }    
            } else {
                if(White_figures[i].posX === posX && White_figures[i].posY === posY){
                    White_figures[i].isDied = true;
                    if(Black_figures[15].BestEverCheckChax()){
                        White_figures[i].isDied = false;
                    }else{
                        White_figures[i].posX = -5;
                        White_figures[i].posY = -5;
                    }
                }  
            }
        }
    }

    NICEmove(posY, posX){
        this.selected = false;
        if(!this.isDied){
            this.BESTInitMovePositions();
            let Figure = Black_figures[15]
            let copypath = Path.allPositions[posY][posX];
            if(this.side === "white"){
                Figure = White_figures[15];
            }
            if(this.movePositions[posY][posX] === 2){
                this.NICEeat(posY, posX);
                Path.allPositions[this.posY][this.posX] = 0;
                let copyposX = this.posX;
                let copyposY = this.posY;
                this.posY = posY;
                this.posX = posX;
                if(this.type === "king"){
                    this.side === "white" ? Path.allPositions[this.posY][this.posX] = 3 : Path.allPositions[this.posY][this.posX] = 4;
                }else{
                    this.side === "white" ? Path.allPositions[this.posY][this.posX] = 1 : Path.allPositions[this.posY][this.posX] = 2;
                }
                if(!Figure.BestEverCheckChax()){
                    if(!this.firstMoveDone){
                        this.firstMoveDone = true;
                    }
                    if(this.side === "white"){
                        GAME.moveNow = "black";
                    } else{
                        GAME.moveNow = "white";
                    }

                } else{
                    if(Figure.OVERMEGACHECKMAT()){
                        alert('MAT');
                    }
                    this.movePositions[this.posY][this.posX] = 2;
                    Path.allPositions[this.posY][this.posX] = copypath;
                    this.posY = copyposY;
                    this.posX = copyposX;
                    this.movePositions[this.posY][this.posX] = 1;
                    if(this.type === "king"){
                        this.side === "white" ? Path.allPositions[this.posY][this.posX] = 3 : Path.allPositions[this.posY][this.posX] = 4;
                    }else{
                        this.side === "white" ? Path.allPositions[this.posY][this.posX] = 1 : Path.allPositions[this.posY][this.posX] = 2;
                    }
                }
            }
        }
    }
    GOODDrawMoves(){
        let enemy = 1;
        if(this.side === "white"){
            enemy = 2;
        }
        if(this.selected && !this.isDied){
            this.BESTInitMovePositions();
	        canvasContext.fillStyle = "green";
            for(let i = 0 ; i < 8; i++){
                for(let j = 0; j < 8; j++){ 
                    if((this.movePositions[i][j] === 2) || (this.movePositions[i][j] === 3 && (Path.allPositions[i][j] === enemy)) || this.movePositions[i][j] === 4){
                        canvasContext.beginPath();
                        canvasContext.arc(j * Path.cellWidth + Path.cellWidth / 2, i * Path.cellHeight + Path.cellHeight / 2, this.size * 0.5, 0, 2 * Math.PI, false);
                        canvasContext.fill();
                        canvasContext.closePath();
                    }
                }
            }
        }
    }
    CoolTakeInProhod(){
        return false;
    }
    NICEeat(posY, posX){
        if(!this.isDied){
            let side = 1;
            if(this.side === "white"){
                side = 2;
            }
            if(Path.allPositions[posY][posX] === side){
                this.SUPERDESTROYAHAHHAHAHAHAHAHA(posX, posY);
            }
        }
    }
    checkVertical_Horizontal(){
        if(!this.isDied){
            let enemy = 1;
            let friend = 2;
            let king = 4
            if(this.side === "white"){
                enemy = 2;
                friend = 1;
                king = 3;
            }
            this.movePositions[this.posY][this.posX] = 1;
            let i = this.posY;
            let checkEnemy = false;
            let checkFriend = false;
            while((i > 0) && !checkEnemy && !checkFriend){
                i--;
                if(Path.allPositions[i][this.posX] === enemy) {
                    this.movePositions[i][this.posX] = 2;
                    checkEnemy = true;
                }else if(Path.allPositions[i][this.posX] === friend || Path.allPositions[i][this.posX] === king){
                    checkEnemy = true;
                    this.movePositions[i][this.posX] = 3;
                }else if(this.movePositions[i][this.posX] !== 1){
                    this.movePositions[i][this.posX] = 2;
                }
            }
            i = this.posY;
            checkEnemy = false;
            checkFriend = false;
            while((i < 7) && !checkEnemy && !checkFriend){
                i++;
                if(Path.allPositions[i][this.posX] === enemy) {
                    this.movePositions[i][this.posX] = 2;
                    checkEnemy = true;
                }else if(Path.allPositions[i][this.posX] === friend || Path.allPositions[i][this.posX] === king){
                    checkEnemy = true;
                    this.movePositions[i][this.posX] = 3;
                }else if(this.movePositions[i][this.posX] !== 1){
                    this.movePositions[i][this.posX] = 2;
                }
            }
            i = this.posX;
            checkEnemy = false;
            checkFriend = false;
            while((i < 7) && !checkEnemy && !checkFriend){
                i++;
                if(Path.allPositions[this.posY][i] === enemy) {
                    this.movePositions[this.posY][i] = 2;
                    checkEnemy = true;
                }else if(Path.allPositions[this.posY][i] === friend || Path.allPositions[this.posY][i] === king){
                    checkEnemy = true;
                    this.movePositions[this.posY][i] = 3;
                }else if(this.movePositions[this.posY][i] !== 1){
                    this.movePositions[this.posY][i] = 2;
                }
            }
            i = this.posX;
            checkEnemy = false;
            checkFriend = false;
            while((i > 0) && !checkEnemy && !checkFriend){
                i--;
                if(Path.allPositions[this.posY][i] === enemy) {
                    this.movePositions[this.posY][i] = 2;
                    checkEnemy = true;
                }else if(Path.allPositions[this.posY][i] === friend || Path.allPositions[this.posY][i] === king){
                    checkEnemy = true;
                    this.movePositions[this.posY][i] = 3;
                }else if(this.movePositions[this.posY][i] !== 1){
                    this.movePositions[this.posY][i] = 2;
                }
            }
        }
    }
    CheckDiagonal(){
        if(!this.isDied){
            let enemy = 1;
            let friend = 2;
            let king  = 4;
            if(this.side === "white"){
                enemy = 2;
                friend = 1;
                king = 3;
            }
            this.movePositions[this.posY][this.posX] = 1;
            let i = this.posY;
            let j = this.posX;
            let checkEnemy = false;
            let checkFriend = false;
            while(i > 0 && j > 0 && !checkEnemy && !checkFriend){
                i--;
                j--;
                if(Path.allPositions[i][j] === enemy) {
                    this.movePositions[i][j] = 2;
                    checkEnemy = true;
                }else if(Path.allPositions[i][j] === friend || Path.allPositions[i][j] === king){
                    checkEnemy = true;
                    this.movePositions[i][j] = 3;
                }else if(this.movePositions[i][j] !== 1){
                    this.movePositions[i][j] = 2;
                }
            }
            i = this.posY;
            j = this.posX;
            checkEnemy = false;
            checkFriend = false;
            while(i < 7 && j < 7 && !checkEnemy && !checkFriend){
                i++;
                j++;
                if(Path.allPositions[i][j] === enemy) {
                    this.movePositions[i][j] = 2;
                    checkEnemy = true;
                }else if(Path.allPositions[i][j] === friend || Path.allPositions[i][j] === king){
                    checkEnemy = true;
                    this.movePositions[i][j] = 3;
                }else if(this.movePositions[i][j] !== 1){
                    this.movePositions[i][j] = 2;
                }
            }
            i = this.posY;
            j = this.posX;
            checkEnemy = false;
            checkFriend = false;
            while(i < 7 && j > 0 && !checkEnemy && !checkFriend){
                i++;
                j--;
                if(Path.allPositions[i][j] === enemy) {
                    this.movePositions[i][j] = 2;
                    checkEnemy = true;
                }else if(Path.allPositions[i][j] === friend || Path.allPositions[i][j] === king){
                    checkEnemy = true;
                    this.movePositions[i][j] = 3;
                }else if(this.movePositions[i][j] !== 1){
                    this.movePositions[i][j] = 2;
                }
            }
            i = this.posY;
            j = this.posX;
            checkEnemy = false;
            checkFriend = false;
            while(i > 0 && j < 7 && !checkEnemy && !checkFriend){
                i--;
                j++;
                if(Path.allPositions[i][j] === enemy) {
                    this.movePositions[i][j] = 2;
                    checkEnemy = true;
                }else if(Path.allPositions[i][j] === friend || Path.allPositions[i][j] === king){
                    checkEnemy = true;
                    this.movePositions[i][j] = 3;
                }else if(this.movePositions[i][j] !== 1){
                    this.movePositions[i][j] = 2;
                }
            }
        }   
    }
}

class peska_Navalnova extends figure{
    constructor(posY, posX, side, type){
        super(posY, posX, side, type);
        this.checkzadniyprohod = false;
    }
    BESTInitMovePositions(){
        this.NotBadMasNull();
        if(!this.isDied){
            let i = 1;
            if(this.side === "white"){
                i = -1;
            }
            if((this.side === "black" && this.posY < 7) || (this.side === "white" && this.posY > 0)){
                if(this.posX > 0){
                    if(this.CoolTakeInProhod() === "left"){
                        this.movePositions[this.posY + 1 * i][this.posX - 1] = 4;
                    }else{
                        this.movePositions[this.posY + 1 * i][this.posX - 1] = 3;
                    }
                }
                if(Path.allPositions[this.posY + 1 * i][this.posX] === 0){
                    this.movePositions[this.posY + 1 * i][this.posX] = 2;
                    if(!this.firstMoveDone){
                        if(Path.allPositions[this.posY + 2 * i][this.posX] === 0){
                            this.movePositions[this.posY + 2 * i][this.posX] = 2;
                        }
                    }
                }
                if(this.posX < 7){
                    if(this.CoolTakeInProhod() === "right"){
                        this.movePositions[this.posY + 1 * i][this.posX + 1] = 4;
                    }else{
                        this.movePositions[this.posY + 1 * i][this.posX + 1] = 3;
                    }
                    
                }
            }
        }   
    }
    NICEmove(posY, posX){
        this.selected = false;
        if(!this.isDied){
            this.BESTInitMovePositions();
            let Figure = Black_figures[15];
            let copypath = Path.allPositions[posY][posX];
            let copyposX = this.posX;
            let copyposY = this.posY;
            if(this.side === "white"){
                Figure = White_figures[15];
            }
            this.NICEeat(posY, posX);
            if(this.movePositions[posY][posX] === 2){
                Path.allPositions[this.posY][this.posX] = 0;
                this.posY = posY;
                this.posX = posX;
                this.side === "white" ? Path.allPositions[this.posY][this.posX] = 1 : Path.allPositions[this.posY][this.posX] = 2;
                this.movePositions[this.posY][this.posX] = 1;
                if(!Figure.BestEverCheckChax()){
                    if(!this.firstMoveDone){
                        this.firstMoveDone = true;
                        if(Math.abs(copyposY - this.posY) === 2){
                            this.checkzadniyprohod = true;
                        } 
                    } else{
                        this.checkzadniyprohod = false;
                    }
                    if(this.side === "white"){
                        GAME.moveNow = "black";
                    } else{
                        GAME.moveNow = "white";
                    }
                    this.NiceMoveToEnd();
                    this.FuckingNullAllFuckingZadniyprohod();
                } else{
                    if(Figure.OVERMEGACHECKMAT()){
                        alert('MAT');
                    }
                    this.movePositions[this.posY][this.posX] = 2;
                    Path.allPositions[this.posY][this.posX] = copypath;
                    this.posY = copyposY;
                    this.posX = copyposX;
                    this.movePositions[this.posY][this.posX] = 1;
                    this.side === "white" ? Path.allPositions[this.posY][this.posX] = 1 : Path.allPositions[this.posY][this.posX] = 2;
                }
            }
        }
    }
    NICEeat(posY, posX){
        if(!this.isDied){
            this.BESTInitMovePositions();
            let Figure = Black_figures[15];
            let copypath = Path.allPositions[posY][posX];
            let copyposX = this.posX;
            let copyposY = this.posY;
            let plus = -1;
            let booling = false;
            if(this.movePositions[posY][posX] === 4){
                booling = true;
            }
            if(this.side === "white"){
                Figure = White_figures[15];
                plus = 1;
            }
            if((this.movePositions[posY][posX] === 3 && (Path.allPositions[posY][posX])) || booling){
                Path.allPositions[this.posY][this.posX] = 0;
                this.posY = posY;
                this.posX = posX;
                this.side === "white" ? Path.allPositions[this.posY][this.posX] = 1 : Path.allPositions[this.posY][this.posX] = 2;
                this.movePositions[this.posY][this.posX] = 1;
                if(!Figure.BestEverCheckChax()){
                    if(!this.firstMoveDone){
                        this.firstMoveDone = true;
                        if(Math.abs(copyposY - this.posY) === 2){
                            this.checkzadniyprohod = true;
                        } else{
                            this.checkzadniyprohod = false;
                        }
                    }
                    if(this.side === "white"){
                        GAME.moveNow = "black";
                    } else{
                        GAME.moveNow = "white";
                    }
                    if(booling){
                        Path.allPositions[posY + plus][posX] = 0;
                        this.SUPERDESTROYAHAHHAHAHAHAHAHA(posX, posY + plus);
                    } else{
                        this.SUPERDESTROYAHAHHAHAHAHAHAHA(posX, posY);
                    }
                    this.NiceMoveToEnd();
                    this.FuckingNullAllFuckingZadniyprohod();
                } else{
                    if(Figure.OVERMEGACHECKMAT()){
                        alert('MAT');
                    }
                    this.movePositions[this.posY][this.posX] = 2;
                    Path.allPositions[this.posY][this.posX] = copypath;
                    this.posY = copyposY;
                    this.posX = copyposX;
                    this.movePositions[this.posY][this.posX] = 1;
                    this.side === "white" ? Path.allPositions[this.posY][this.posX] = 1 : Path.allPositions[this.posY][this.posX] = 2;
                }
            }
        }
    }

    NiceMoveToEnd(){
        let i = 0;
        if(this.side === "white"){
            while(i < 8 && !infoWindow.call){
                if(White_figures[i].posY === 0 && White_figures[i] instanceof peska_Navalnova){
                    infoWindow.call = true;
                    infoWindow.Figure = i;
                    infoWindow.color = "white";
                }
                i++;
            }
        } else{
            while(i < 8 && !infoWindow.call){
                if(Black_figures[i].posY === 7 && White_figures[i] instanceof peska_Navalnova){
                    infoWindow.call = true;
                    infoWindow.Figure = i;
                    infoWindow.color = "black";
                }
                i++;
            }
        }
    }
    
    FuckingNullAllFuckingZadniyprohod(){
        if(this.side === "white"){
            for(let i = 0; i < 8; i++){
                if(Black_figures[i] instanceof peska_Navalnova){
                    Black_figures[i].checkzadniyprohod = false;
                }
            }
        }
        if(this.side === "black"){
            for(let i = 0; i < 8; i++){
                if(White_figures[i] instanceof peska_Navalnova){
                    White_figures[i].checkzadniyprohod = false;
                }
            }
        }
    }

    CoolTakeInProhod(){
        let figures = Black_figures;
        if(this.side === "black"){
            figures = White_figures;
        }
        for(let i = 0; i < 8; i++){
            if(figures[i] instanceof peska_Navalnova){
                if(this.posX > 0){
                    if(figures[i].posX === this.posX - 1 && figures[i].posY === this.posY && figures[i].checkzadniyprohod){
                        return "left";
                    }
                }
                if(this.posX < 7){
                    if(figures[i].posX === this.posX + 1 && figures[i].posY === this.posY && figures[i].checkzadniyprohod){
                        return "right";
                    }
                }
            }
        }
        return "";
    }
}

class OmegaSlon extends figure{
    BESTInitMovePositions(){
        this.NotBadMasNull();
        this.CheckDiagonal();
    }
    NICEmove(posY, posX){
        super.NICEmove(posY, posX);
    }
}

class SUPERLadia extends figure{
    BESTInitMovePositions(){
        this.NotBadMasNull();
        this.checkVertical_Horizontal();
    }
    
    NICEmove(posY, posX){
        super.NICEmove(posY, posX);
    }
}

class NiceCoCK extends figure{
    BESTInitMovePositions(){
        this.NotBadMasNull();
        if(!this.isDied){
            let friend = 2;
            let king = 4;
            if(this.side === "white"){
                friend = 1;
                king = 3;
            }
            this.movePositions[this.posY][this.posX] = 1;
            let i = this.posY;
            if(this.posX < 6){
                if((this.posY < 7) && (Path.allPositions[this.posY + 1][this.posX + 2] != friend)){
                    this.movePositions[this.posY + 1][this.posX + 2] = 2;
                } else if((this.posY < 7) && ((Path.allPositions[this.posY + 1][this.posX + 2] === friend) || (Path.allPositions[this.posY + 1][this.posX + 2] === king))){
                    this.movePositions[this.posY + 1][this.posX + 2] = 3;
                }
                if((this.posY > 0) && (Path.allPositions[this.posY - 1][this.posX + 2] != friend)){
                    this.movePositions[this.posY - 1][this.posX + 2] = 2;
                } else if((this.posY > 0) && ((Path.allPositions[this.posY - 1][this.posX + 2] === friend) || (Path.allPositions[this.posY - 1][this.posX + 2] === king))){
                    this.movePositions[this.posY - 1][this.posX + 2] = 3;
                }
            }
            if(this.posX > 1){
                if((this.posY < 7) && (Path.allPositions[this.posY + 1][this.posX - 2] != friend)){
                    this.movePositions[this.posY + 1][this.posX - 2] = 2;
                } else if((this.posY < 7) && ((Path.allPositions[this.posY + 1][this.posX - 2] === friend) || (Path.allPositions[this.posY + 1][this.posX - 2] === king))){
                    this.movePositions[this.posY + 1][this.posX - 2] = 3;    
                }
                if((this.posY > 0) && (Path.allPositions[this.posY - 1][this.posX - 2] != friend)){
                    this.movePositions[this.posY - 1][this.posX - 2] = 2;
                } else if((this.posY > 0) && ((Path.allPositions[this.posY - 1][this.posX - 2] === friend) || (Path.allPositions[this.posY - 1][this.posX - 2] === king))){
                    this.movePositions[this.posY - 1][this.posX - 2] = 3;    
                }
            }
            if(this.posY > 1){
                if((this.posX > 0) && (Path.allPositions[this.posY - 2][this.posX - 1] != friend)){
                    this.movePositions[this.posY - 2][this.posX - 1] = 2;
                } else if((this.posX > 0) && ((Path.allPositions[this.posY - 2][this.posX - 1] === friend) || (Path.allPositions[this.posY - 2][this.posX - 1] === king))){
                    this.movePositions[this.posY - 2][this.posX - 1] = 3;
                }
                if((this.posX < 7) && (Path.allPositions[this.posY - 2][this.posX + 1] != friend)){
                    this.movePositions[this.posY - 2][this.posX + 1] = 2;
                } else if((this.posX < 7) && ((Path.allPositions[this.posY - 2][this.posX + 1] === friend) || (Path.allPositions[this.posY - 2][this.posX + 1] === king))){
                    this.movePositions[this.posY - 2][this.posX + 1] = 3;
                }
            }
            if(this.posY < 6){
                if((this.posX > 0) && (Path.allPositions[this.posY + 2][this.posX - 1] != friend)){
                    this.movePositions[this.posY + 2][this.posX - 1] = 2;
                } else if((this.posX > 0) && ((Path.allPositions[this.posY + 2][this.posX - 1] === friend) || (Path.allPositions[this.posY + 2][this.posX - 1] === king))){
                    this.movePositions[this.posY + 2][this.posX - 1] = 3;
                }
                if((this.posX < 7) && (Path.allPositions[this.posY + 2][this.posX + 1] != friend)){
                    this.movePositions[this.posY + 2][this.posX + 1] = 2;
                } else if((this.posX < 7) && ((Path.allPositions[this.posY + 2][this.posX + 1] === friend) || (Path.allPositions[this.posY + 2][this.posX + 1] === king))){
                    this.movePositions[this.posY + 2][this.posX + 1] = 3;
                }
            }
        }
    }
    
    NICEmove(posY, posX){
        super.NICEmove(posY, posX);
    }
}

class SuperPuperFerz extends figure{
    BESTInitMovePositions(){
        this.NotBadMasNull();
        this.checkVertical_Horizontal();
        this.CheckDiagonal();
    }
    NICEmove(posY, posX){
        super.NICEmove(posY, posX);
    }    
}

class KillTheKing_TheKingIsDead_IamTheKing_LoooongLiveTheKing extends figure{
    BESTInitMovePositions(){
        if(!this.isDied){
            this.NotBadMasNull();
            let kingKopy = White_figures[15];
            let enemy = 1;
            let friend = 2;
            if(this.side === "white"){
                enemy = 2;
                friend = 1;
                kingKopy = Black_figures[15];
            }
            if(kingKopy.posY > 0){
                if(kingKopy.posX > 0){
                    kingKopy.movePositions[kingKopy.posY - 1][kingKopy.posX - 1] = 2;
                }
                kingKopy.movePositions[kingKopy.posY - 1][kingKopy.posX] = 2;
                if(kingKopy.posX < 7){
                    kingKopy.movePositions[kingKopy.posY - 1][kingKopy.posX + 1] = 2;
                }
            }
            if(kingKopy.posY < 7){
                if(kingKopy.posX > 0){
                    kingKopy.movePositions[kingKopy.posY + 1][kingKopy.posX - 1] = 2;
                }
                kingKopy.movePositions[kingKopy.posY + 1][kingKopy.posX] = 2;
                if(kingKopy.posX < 7){
                    kingKopy.movePositions[kingKopy.posY + 1][kingKopy.posX + 1] = 2;
                }
            }
            if(kingKopy.posX > 0){
                kingKopy.movePositions[kingKopy.posY][kingKopy.posX - 1] = 2;
            }
            if(kingKopy.posX < 7){
                kingKopy.movePositions[kingKopy.posY][kingKopy.posX + 1] = 2;
            }
            if(this.posY > 0){
                if(this.posX > 0 && Path.allPositions[this.posY - 1][this.posX - 1] != friend && this.GoodCheckShahid(this.posX - 1, this.posY - 1, enemy) && kingKopy.movePositions[this.posY - 1][this.posX - 1] !== 2){
                    this.movePositions[this.posY - 1][this.posX - 1] = 2;
                }
                if(this.posX < 7 && Path.allPositions[this.posY - 1 ][this.posX + 1] != friend && this.GoodCheckShahid(this.posX + 1, this.posY - 1, enemy) && kingKopy.movePositions[this.posY - 1][this.posX + 1] !== 2){
                    this.movePositions[this.posY - 1][this.posX + 1] = 2;    
                }
                if(Path.allPositions[this.posY - 1 ][this.posX] != friend && this.GoodCheckShahid(this.posX, this.posY - 1, enemy) && kingKopy.movePositions[this.posY - 1][this.posX] !== 2){
                    this.movePositions[this.posY - 1][this.posX] = 2;
                }
            }
            if(this.posY < 7){
                if(this.posX > 0 && Path.allPositions[this.posY + 1][this.posX - 1] != friend && this.GoodCheckShahid(this.posX - 1, this.posY + 1, enemy) && kingKopy.movePositions[this.posY + 1][this.posX - 1] !== 2){
                    this.movePositions[this.posY + 1][this.posX - 1] = 2;
                }
                if(this.posX < 7 && Path.allPositions[this.posY + 1 ][this.posX + 1] != friend && this.GoodCheckShahid(this.posX + 1, this.posY + 1, enemy) && kingKopy.movePositions[this.posY + 1][this.posX + 1] !== 2){
                    this.movePositions[this.posY + 1][this.posX + 1] = 2;    
                }
                if(Path.allPositions[this.posY + 1 ][this.posX] != friend && this.GoodCheckShahid(this.posX, this.posY + 1, enemy) && kingKopy.movePositions[this.posY + 1][this.posX] !== 2){
                    this.movePositions[this.posY + 1][this.posX] = 2;
                }
            }

            if(this.posX > 0 && Path.allPositions[this.posY][this.posX - 1] != friend && this.GoodCheckShahid(this.posX - 1, this.posY, enemy) && kingKopy.movePositions[this.posY][this.posX - 1] !== 2){
                this.movePositions[this.posY ][this.posX - 1] = 2;
            }
            if(this.posX < 7 && Path.allPositions[this.posY][this.posX + 1] != friend && this.GoodCheckShahid(this.posX + 1, this.posY, enemy) && kingKopy.movePositions[this.posY][this.posX + 1] !== 2){
                this.movePositions[this.posY][this.posX + 1] = 2;
            }
            if(!this.firstMoveDone){
                if(this.side === "white"){
                    if(!White_figures[10].firstMoveDone && Path.allPositions[7][1] === 0 && Path.allPositions[7][2] === 0 && this.GoodCheckShahid(1, 7, enemy) && this.GoodCheckShahid(2, 7, enemy)){
                        this.movePositions[this.posY][this.posX - 2] = 2;           
                    }
                    if(!White_figures[11].firstMoveDone && Path.allPositions[7][6] === 0 && this.GoodCheckShahid(6, 7, enemy)){
                        this.movePositions[this.posY][this.posX + 2] = 2;
                    }
                } else{
                    if(!Black_figures[10].firstMoveDone && Path.allPositions[0][1] === 0 && Path.allPositions[0][2] === 0 && this.GoodCheckShahid(1, 0, enemy) && this.GoodCheckShahid(2, 0, enemy)){
                        this.movePositions[this.posY][this.posX - 2] = 2;                
                    }
                    if(!Black_figures[11].firstMoveDone && Path.allPositions[0][6] === 0 && this.GoodCheckShahid(6, 0, enemy)){
                        this.movePositions[this.posY][this.posX + 2] = 2;
                    }
                }
            }
        }
    }
    NICEmove(posY, posX){
        this.selected = false;
        if(!this.isDied){
            this.BESTInitMovePositions();
            let Figure = Black_figures[15]
            let copypath = Path.allPositions[posY][posX];
            if(this.side === "white"){
                Figure = White_figures[15];
            }
            if(this.movePositions[posY][posX] === 2){
                Path.allPositions[this.posY][this.posX] = 0;
                let copyposX = this.posX;
                let copyposY = this.posY;
                if(posY === 7){
                    if(this.posX + 2 === posX){
                        White_figures[11].posX = 5;
                        White_figures[11].posY = 7;
                        Path.allPositions[7][7] = 0;
                        Path.allPositions[7][5] = 1;
                    }
                    if(this.posX - 2 === posX){
                        White_figures[10].posX = 3;
                        White_figures[10].posY = 7;
                        Path.allPositions[7][7] = 0;
                        Path.allPositions[7][3] = 1;
                    }
                }
                if(posY === 0){
                    if(this.posX + 2 === posX){
                        Black_figures[11].posX = 5;
                        Black_figures[11].posY = 0;
                        Path.allPositions[0][7] = 0;
                        Path.allPositions[0][5] = 2;
                    }
                    if(this.posX - 2 === posX){
                        Black_figures[10].posX = 3;
                        Black_figures[10].posY = 0;
                        Path.allPositions[0][7] = 0;
                        Path.allPositions[0][3] = 2;
                    }
                }
                this.posY = posY;
                this.posX = posX;
                if(this.type === "king"){
                    this.side === "white" ? Path.allPositions[this.posY][this.posX] = 3 : Path.allPositions[this.posY][this.posX] = 4;
                }else{
                    this.s
                side === "white" ? Path.allPositions[this.posY][this.posX] = 1 : Path.allPositions[this.posY][this.posX] = 2;
                }
                if(!Figure.BestEverCheckChax()){
                    Path.allPositions[this.posY][this.posX] = copypath;
                    super.NICEeat(posY, posX);
                    this.movePositions[this.posY][this.posX] = 1;
                    this.side === "white" ? Path.allPositions[this.posY][this.posX] = 3 : Path.allPositions[this.posY][this.posX] = 4;
                    if(!this.firstMoveDone){
                        this.firstMoveDone = true;
                    }
                    if(this.side === "white"){
                        GAME.moveNow = "black";
                    } else{
                        GAME.moveNow = "white";
                    }
                } else{
                    if(Figure.OVERMEGACHECKMAT()){
                        alert('MAT');
                    }
                    else{
                        this.movePositions[this.posY][this.posX] = 2;
                        Path.allPositions[this.posY][this.posX] = copypath;
                        this.posY = copyposY;
                        this.posX = copyposX;
                        this.movePositions[this.posY][this.posX] = 1;
                        this.side === "white" ? Path.allPositions[this.posY][this.posX] = 3 : Path.allPositions[this.posY][this.posX] = 4;
                    }
                }
            }
        }
    }

    GoodCheckShahid(posX, posY, enemy){
        let i = 0;
        let Figures;
        if(enemy === 2){
            Figures = Black_figures;
        } else{
            Figures = White_figures;
        }
        while(i < GAME.countFigures - 1){
            Figures[i].BESTInitMovePositions();
            if(Figures[i] instanceof peska_Navalnova){
                if(Figures[i].movePositions[posY][posX] === 3){
                    return false; 
                }
            } else{
                if(Figures[i].movePositions[posY][posX] === 2 || Figures[i].movePositions[posY][posX] === 3){
                    return false;
                }
            }
            i++;
        }
        return true;
    }

    BestEverCheckChax(){
        let enemy = 1;
        if(this.side === "white"){
            enemy = 2
        }
        if(!this.GoodCheckShahid(this.posX, this.posY, enemy)){
            GAME.ChaXXXXXX = true;
            console.log('CHAX!!!!');
        } else{
            GAME.ChaXXXXXX = false;
        }
        return GAME.ChaXXXXXX
    }
    OVERMEGACHECKMAT(){
        if(this.BestEverCheckChax()){
            let countMoves = 0;
            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    if(this.movePositions[i][j] === 2){
                        countMoves++;
                    }
                }
            }
            if(countMoves === 0){
                console.log('MAT!!!')
                return true;
            }
        }
        return false;
    }
}

let Path = new PathCreator(GAME.width, GAME.height, "white", "black");

let White_figures = Array(16);
for(let i = 0; i < 8; i++){
    White_figures[i] = new peska_Navalnova(6, i, "white", "peshka");
}

let Black_figures = Array(16);
for(let i = 0; i < 8; i++){
    Black_figures[i] = new peska_Navalnova(1, i, "black", "peshka");
}

Black_figures[8] = new OmegaSlon(0, 2, "black", "slon");
Black_figures[9] = new OmegaSlon(0, 5, "black", "slon");
Black_figures[10] = new SUPERLadia(0, 0, "black", "ladia");
Black_figures[11] = new SUPERLadia(0, 7, "black", "ladia");
Black_figures[12] = new NiceCoCK(0, 1, "black", "CoCk");
Black_figures[13] = new NiceCoCK(0, 6, "black", "CoCk");
Black_figures[14] = new SuperPuperFerz(0, 3, "black", "ferz");
Black_figures[15] = new KillTheKing_TheKingIsDead_IamTheKing_LoooongLiveTheKing(0, 4, "black", "king");

White_figures[8] = new OmegaSlon(7, 2, "white", "slon");
White_figures[9] = new OmegaSlon(7, 5, "white", "slon");
White_figures[10] = new SUPERLadia(7, 0, "white", "ladia");
White_figures[11] = new SUPERLadia(7, 7, "white", "ladia");
White_figures[12] = new NiceCoCK(7, 1, "white", "CoCk");
White_figures[13] = new NiceCoCK(7, 6, "white", "CoCk");
White_figures[14] = new SuperPuperFerz(7, 3, "white", "ferz");
White_figures[15] = new KillTheKing_TheKingIsDead_IamTheKing_LoooongLiveTheKing(7, 4, "white", "king");

function MEGAplay() {
    Path.SUPERdrawPath();
    omegaInfoWindowDraw();
    for(let i = 0; i < GAME.countFigures; i++){
        White_figures[i].SUPERdraw();
        Black_figures[i].SUPERdraw();
    }
    for(let i = 0; i < GAME.countFigures; i++){
        Black_figures[i].GOODDrawMoves();
        White_figures[i].GOODDrawMoves();
    }
    requestAnimationFrame(MEGAplay);
}

initEventListeners();
MEGAplay();