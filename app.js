const reload = () => {
    window.location.reload();
  }  
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
