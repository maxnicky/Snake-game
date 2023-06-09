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

window.addEventListener("keydown", changeDirection);

let d = "right";
function changeDirection(e) {
  if (e.key === "ArrowRight" && d !== "left") {
    d = "right";
  } else if (e.key === "ArrowLeft" && d !== "right") {
    d = "left";
  } else if (e.key === "ArrowUp" && d !== "down") {
    d = "up";
  } else if (e.key === "ArrowDown" && d !== "up") {
    d = "down";
  }
}

function draw() {
  //先將背景全部重新塗黑
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  //在頭部增加一個新的方塊並且去掉尾部方塊來讓蛇移動
  snake.unshift(newHead); // 增加方塊到頭部

  //確認蛇是否吃到方塊，有吃到就不pop尾部
  snake.pop(); // 去掉尾部
}

let myGame = setInterval(draw, 100);
