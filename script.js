const words = ['sigh','tense','airplane','ball','pies','juice','warlike','bad','north','dependent','steer','silver','highfalutin','superficial','quince','eight','feeble','admit','drag','loving','canada','china','hamburger','kitten','fly','population','ready','master','letter','apple','forward','strong'];
let randomWord;
let score = 0;
let time = 10;
const timeInterval = setInterval(updateTime, 1000);

let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";
$("#difficulty").val(difficulty);

// Focus on text on start
text.focus();

function generateRandomWord() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  $("#word").html(randomWord);
}

function updateTime() {
  $("#time").html(time + "s");
  time --;
  if (time === 0) {
    gameOver();
  }
}

function gameOver() {
  $(".end-game-container").html(
    `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `
  );
  $(".end-game-container").css("display","flex");   
}

function gameStart() {
  $('#text').on("input", (e)=> {
    if (e.target.value === randomWord) {
      generateRandomWord();
      e.target.value = "";
      score ++;
      $("#score").html(score);
      if (difficulty === "hard") {
        time += 2;
      } else if (difficulty === "medium") {
        time += 3;
      } else {
        time += 5;
      }
      updateTime();
    }
  })
}



function difficultyChange() {
  $("#difficulty").on("change", (e)=> {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
    $("#difficulty").val(difficulty);
  })
}

difficultyChange();
generateRandomWord();
gameStart();
