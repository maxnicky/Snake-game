const reload = () => {
  window.location.reload();
};
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext() method會回傳一個canvas的drawing context
// drawing context可以用來在canvas內畫圖
const unit = 20;
const row = canvas.height / unit; // 16
const column = canvas.width / unit; // 16
let snake = []; //array內每個元素都是物件，物件內存放身體的x, y座標 canvas左上角座標(0,0)，x越往右越大，y越往下越大

function createSnake() {
  snake[0] = {
    x: 80,
    y: 0,
  };

  snake[1] = {
    x: 60,
    y: 0,
  };

  snake[2] = {
    x: 40,
    y: 0,
  };

  snake[3] = {
    x: 20,
    y: 0,
  };
}

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  pickALocation() {
    //新位置不能跟蛇重疊
    let overlapping = false;
    let new_x;
    let new_y;

    function check() {
      for (let i = 0; i < snake.length; i++) {
        if (new_x === snake[i].x && new_y === snake[i].y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }

    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      check();
    } while (overlapping);

    this.x = new_x;
    this.y = new_y;
  }
}

// 初始設定
createSnake();
let myFruit = new Fruit();

window.addEventListener("keydown", changeDirection);

let d = "right";
function changeDirection(e) {
  //每次按下上下左右鍵之後，在下一幀被畫出來之前不接受任何keydown事件，防止按鍵速度太快導致蛇自殺
  if (e.key === "ArrowRight" && d !== "left") {
    d = "right";
    window.removeEventListener("keydown", changeDirection);
  } else if (e.key === "ArrowLeft" && d !== "right") {
    d = "left";
    window.removeEventListener("keydown", changeDirection);
  } else if (e.key === "ArrowUp" && d !== "down") {
    d = "up";
    window.removeEventListener("keydown", changeDirection);
  } else if (e.key === "ArrowDown" && d !== "up") {
    d = "down";
    window.removeEventListener("keydown", changeDirection);
  } 
}

let score = 0;
if (!(Number(localStorage.getItem("hightestScore")) > 0)) {
  localStorage.setItem("hightestScore", "0");
}
let hightestScore = Number(localStorage.getItem("hightestScore"));
document.getElementById("myScore").innerHTML = "遊戲分數：" + score;
document.getElementById("myScore2").innerHTML = "最高分數：" + hightestScore;


function draw() {
  //畫圖前先確認蛇的頭部有沒有觸碰到自己
  for (i = 1; i < snake.length; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      clearInterval(myGame);
      loadHightestScore();
      alert("遊戲結束");      
      return;
    }
  }

  //先將背景全部重新塗黑
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  myFruit.drawFruit();

  //畫出蛇
  for (let i = 0; i < snake.length; i++) {
    // 設定內容顏色
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white"; // 設定外框顏色

    // (x, y, width, height)
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit); // 內容繪製
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit); // 外框繪製
  }

  //以目前d的方向來決定蛇的下一瞬間要放在哪個座標
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d === "left") {
    snakeX -= unit;
  } else if (d === "right") {
    snakeX += unit;
  } else if (d === "up") {
    snakeY -= unit;
  } else if (d === "down") {
    snakeY += unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //穿牆設定--新的頭部方塊座標出現在牆的另一邊
  if (snake[0].x === 0 && d === "left") {
    newHead.x = (column - 1) * unit;
  } else if (snake[0].x === (column - 1) * unit && d === "right") {
    newHead.x = 0;
  } else if (snake[0].y === 0 && d === "up") {
    newHead.y = (row - 1) * unit;
  } else if (snake[0].y === (row - 1) * unit && d === "down") {
    newHead.y = 0;
  }

  //在頭部增加一個新的方塊並且去掉尾部方塊來讓蛇移動
  snake.unshift(newHead); // 增加方塊到頭部

  //確認蛇是否吃到果實，有吃到就不pop尾部
  if (snake[0].x === myFruit.x && snake[0].y === myFruit.y) {
    // 重新定位果實的隨機位置
    myFruit.pickALocation();

    // 更新分數
    score++;
    document.getElementById("myScore").innerHTML = "遊戲分數：" + score;
    if (score > hightestScore ) {
      document.getElementById("myScore2").innerHTML = "最高分數：" + score;
    }
  } else {
    snake.pop(); // 去掉尾部
  }

  //確認蛇後續座標後重新添加監聽事件
  window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 100);



function loadHightestScore() { 
  if (score > hightestScore) {
    localStorage.setItem("hightestScore", `${score}`);    
  }  
}


