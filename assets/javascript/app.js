$(document).ready(function() {

  var qArray;
  var right;
  var wrong;
  var unanswered;
  var currentIndex;
  var timeIsUp;

  var questionTimer = {
    time: 10,

  reset: function() {
        questionTimer.time = 10;
  },
  start: function() {
    $("#time").html("Time Remaining: " + questionTimer.time);
    counter = setInterval(questionTimer.count, 1000);
  },
  stop: function() {
        clearInterval(counter);
  },
  count: function() {
        questionTimer.time--;
        $("#time").html("Time Remaining: " + questionTimer.time);
  },
}

function startTrivia() {
  qArray = [{
    question: "Who is the NBA's all-time leading scorer?",
    answers: ["Michael Jordan", "Karl Malone", "Kareem Abdul Jabbar", "Lebron James"],
    picright: "assets/images/q1_correct.gif",
    picwrong: "assets/images/q1_wrong.gif",
    correctanswer: 2
  }, {
    question: "How many holes are there in a full round of golf?",
    answers: ["36", "12", "9", "18"],
    picright: "assets/images/q2_correct.gif",
    picwrong: "assets/images/q2_wrong.gif",
    correctanswer: 3
  }, {
    question: "Who is the only athlete to play in a Super Bowl and a World Series",
    answers: ["Bo Jackson", "Deion Sanders", "Russel Wilson", "Johnny Damon"],
    picright: "assets/images/q3_correct.gif",
    picwrong: "assets/images/q3_wrong.gif",
    correctanswer: 1
  }, {
    question: "What is the highest possible score in 10 frames of regulation bowling",
    answers: ["10", "100", "200", "300"],
    picright: "assets/images/q4_correct.gif",
    picwrong: "assets/images/q4_wrong.gif",
    correctanswer: 3
  }]

  right = 0;
  wrong = 0;
  unanswered = 0;

  currentIndex = -1;

  $('#questions').html("<button class='button' id='start'>Start</button>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');

  $('#start').on("click", function() {
    advance();
  });
}

  function askQuestions() {
    questionTimer.start();
    $('#questions').html(qArray[currentIndex].question);
    $('#answer0').show().html(qArray[currentIndex].answers[0]);
    $('#answer1').show().html(qArray[currentIndex].answers[1]);
    $('#answer2').show().html(qArray[currentIndex].answers[2]);
    $('#answer3').show().html(qArray[currentIndex].answers[3]);
    $('#gif-holder').hide().off('click');

    onClickAnswer();
  }

  function onClickAnswer() {
    $('.button').on("click", function() {
      var buttonClick = parseInt($(this).attr("value"));
      if(buttonClick === qArray[currentIndex].correctanswer) {
        rightAnswer();
      }
      else {
        wrongAnswer();
      }
    });
  }

function rightAnswer(){
  clearTimeout(timeIsUp);
  right++;
  questionTimer.stop();
  questionTimer.reset();
  $("#time").empty();
  $("#questions").html("<h3>Correct!</h3>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
  $('#gif-holder').show().html("<img class='gifs' src=" + qArray[currentIndex].picright + ">");

  timeIsUp = setTimeout(advance, 8 * 1000);
}

function wrongAnswer() {
  clearTimeout(timeIsUp);
  wrong++;
  questionTimer.stop();
  questionTimer.reset();
  $("#time").empty();
  $("#questions").html("<h3>Incorrect!</h3>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
  $('#gif-holder').show().html("The correct answer was: " + qArray[currentIndex].answers[qArray[currentIndex].correctanswer] + "<br><img class='gifs' src=" + qArray[currentIndex].picwrong + ">");

  timeIsUp = setTimeout(advance, 8 * 1000);
}

function timesUp() {
  clearTimeout(timeIsUp);
  unanswered++;
  questionTimer.stop();
  questionTimer.reset();
  $("#time").empty();
  $("#question").html("<h2>Time's Up!</h2>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
  $('#gif-holder').show().html("The correct answer was: " + qArray[currentIndex].answers[qArray[currentIndex].correctanswer] + "<br><img class='gifs' src=" + qArray[currentIndex].picwrong + ">");

  timeIsUp = setTimeout(advance, 8 * 1000);
}

function endScreen() {
  $("#time").html("<h2>Great job!</h2>");
  $("#questions").html("Your Results <br><br>Right: " + right + "<br>Wrong: " + wrong + "<br>Unanswered: " + unanswered);

  $("#gif-holder").html("<button class='button' id='playagain'>Play again?</button>");

  $("#playagain").on("click", function() {
    startTrivia();
    advance();
  });
}

function advance() {
  currentIndex++;

  if(currentIndex < qArray.length) {
    askQuestions();
    timeIsUp = setTimeout(timesUp, 10 * 1000);
  } else {
    endScreen();
  }
}

startTrivia();

});