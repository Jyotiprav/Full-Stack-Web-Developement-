var q = document.querySelector("#question");
var b1 = document.querySelector("#btn0");
var b2 = document.querySelector("#btn1");
var b3 = document.querySelector("#btn2");
var b4 = document.querySelector("#btn3");
var s = document.querySelector("#score");
var p = document.querySelector("#progress");

var questions = [{
    prompt: "Inside which HTML element do we put the JavaScript??",
    a: "JavaScript",
    b: "Scripting",
    c: "script",
    d: "js",
    answer: "c"
  },
  {
    prompt: "How do you write 'Hello World' in an alert box?",
    a: "alert('hello')",
    b: "alert()",
    c: "alert(hello)",
    d: "None of the above",
    answer: "a"
  },
  {
    prompt: "Javascript is _________ language.",
    a: "Application",
    b: "Scripting",
    c: "Programming",
    d: "None of These",
    answer: "b"
  }
];
var score = 0;
var i = 0;
increase();
var click = 0
var o = document.querySelector("button");

function increase() {
  click++;
  if (i < 3) {
    q.innerHTML = questions[i].prompt;
    b1.innerHTML = questions[i].a;
    b2.innerHTML = questions[i].b;
    b3.innerHTML = questions[i].c;
    b4.innerHTML = questions[i].d;
    i++;
    p.innerHTML = "Question " + i + " of " + questions.length;
  } else {
    // alert("score"+score);
    s.innerHTML = "Your Score: " + score + "/3";
    if (score == 3) {
      var image = document.createElement('img');
      image.src = "images/award.png"
      document.getElementById("image").appendChild(image);
    }
  }
  // alert(click);
}
function check(j) {
  if (questions[i - 1].answer == j) {
    score++;
  }

}


// }
// function function1(){
//   // alert("button was clicked");
//   i++;
//   // alert("button was clicked"+i);
// }
// var a = 1;
//       function increase(){
//             var textBox = document.getElementById("text");
//             textBox.value = a;
//             a++;
//       }
