$.getJSON("data_dartmouth.json", function (data) {
  /** typed.js stuff **/
  var typed = new Typed('#quiz-title', {})

  var typed = new Typed('#quiz-title', {
    strings: ["Welcome to our workshop", data.quiz_title],
    typeSpeed: 30
  });



  $("#quiz-title").velocity({ 
    scale: 1.5
  }, 500);
  $("#quiz-title").velocity({ 
    scale: 1.0
  }, 500);

  data.questions.forEach(question => {
    var current_question = $(`<div class="question"></div>`);
    current_question.append(`<div class="q-header">
                            <h3 class="question_name">${question.question_name}</h3>
                            <img class="question_img_url" src=${question.question_img_url}></div>`)

    var current_choices = $(`<div class="choices"></div>`);
    question.choices.forEach(choice => {
      var current_label = $(`<label></label>`)
      current_label.append(`<input type="radio" name=${question.name} value=${choice.value}>`);
      var curr_choice = $(`<div class="choice"></div>`)
      if (choice.img) {
        curr_choice.append(`<img src=${choice.img} class="img-with-border"/>`);
      }
      if (choice.caption) {
        curr_choice.append(`<p class="caption">${choice.caption}</p>`);
      } else {
        curr_choice.addClass('no-caption');
      }
      current_label.append(curr_choice);
      current_choices.append(current_label);
    });
    current_question.append(current_choices);
    $('.questions').append(current_question);
  });

  $('#submit').html(data.submit_button);

  $('label').click(function () {
    $(this).addClass('selected');
    $(this).siblings().addClass('unselected');
    $(this).siblings().removeClass('selected');
    $(this).removeClass('unselected');

    // velocity stuff part 1 (scaling)
    $(this).velocity({
      scale: 1.2
    }, 200);
    $(this).siblings().velocity({
      scale: 0.8
    }, 200);

  });

  // velocity stuff part 2 (rotating on selection)
  $('.choice').click(function() {
    $(this).velocity({  rotateZ: "+=60" }, { duration: 100});
    $(this).velocity({  rotateZ: "-=120" }, { duration: 100});
    $(this).velocity({  rotateZ: "+=60" }, { duration: 100});
  });
  /** scroll reveal stuff here */
ScrollReveal().reveal('#submit-container', {delay:300, reset: true});
ScrollReveal().reveal('.question', {delay: 100, reset: true});
let labelReveal = {
  delay: 100,
  interval: 100,
  reset: true,
  origin: 'right',
  distance: '60px'
};

ScrollReveal().reveal('label', labelReveal);


});


var winner = "";
frequencies = {};
num_questions = 0;

// velocity part 3 (title banner)


$('#submit').on('click', function (e) {
  var choices = $("input[type='radio']:checked").map(function (i, radio) {
    return $(radio).val();
  }).toArray();

  // velocity (bouncy submit button)
  $(this).velocity({
    translateY: "-1.5rem",
    rotateZ: "-10deg"
  }, 100, "easeOut").velocity({
    rotateZ: "8deg",
  }, 150).velocity({
    translateY: "0",
    rotateZ: "0"
  }, 600, "easeOutBounce");

  for (i = 0; i < choices.length; i++) {
    el = choices[i];
    if (!frequencies[el]) {
      frequencies[el] = 1;
    } else {
      frequencies[el]++;
    }
  };

  max = 0;
  Object.keys(frequencies).forEach(function (key) {
    if (frequencies[key] > max) {
      max = frequencies[key];
      winner = key;
    }
  })

  $.getJSON("data.json", function (data) {
    var current_outcome;
    // declare user_error variable in here
    num_questions = parseInt(data.number_of_questions);
    if (choices.length < data.number_of_questions) {
      current_outcome = $(`<p id="error">${data.error}</p>`);
    } else {
      current_outcome = null;
    }
    $('.current-outcome').html(current_outcome);
    result.style.display = "block";
    var buttonId = $(this).attr('id');
    $('#result-content').removeAttr('class').addClass(buttonId);
    $('body').addClass('modal-active');

    // check here on user error to load graph or not 

  });
  loadGraph();
});


var result = document.getElementById('myresult');
var btn = document.getElementById('submit');
var span = document.getElementsByClassName("close")[0];

/** CHART STUFF HERE **/
function getPercentage(key) {
  if (parseInt(frequencies[key]) > 0) {
    return parseInt((frequencies[key]) / num_questions * 100).toFixed(2)
  } else {
    return 0
  }
}

function loadGraph() {
  console.log('hello')
  var chart = new CanvasJS.Chart("graph", {
    width: 600,
    height: 400,
    theme: "light2", // theme choices: "light1", "light2", "dark1", "dark2"
    exportEnabled: false,
    animationEnabled: true,
    responsive: true,
    title: {
      text: "what % of each character are you?"
    },
    data: [{
      type: "pie",
      startAngle: 25,
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label}: {y}%",
      dataPoints: [
        { y: getPercentage("alexis"), label: "Alexis" },
        { y: getPercentage("david"), label: "David" },
        { y: getPercentage("moira"), label: "Moira" },
        { y: getPercentage("johnny"), label: "Johnny" },
      ]
    }]
  });
  chart.render();
}

window.onclick = function (event) {
  $(this).addClass('out');
  $('body').removeClass('modal-active');
  if (event.target == result) {
    result.style.display = "none";
  }
}

/**  Add click effect here **/
const burst = new mojs.Burst({ 
  left: 0, top: 0,
  radius: { 0: 100 },
  count: 12,
  children: {
    shape: 'polygon',
    radius: 20,
    angle: { 360: 0 },
    fill: { '#f70909' : '#eddc80' },
    duration: 1300
  }
});
const circle = new mojs.Shape({
  left: 0, top: 0,
  count: 10,
  stroke: { '#e2441d' : '#f99931' },
  strokeWidth: { 20 : 0 },
  fill: 'none',
  scale: { 0: 1.5, easing: 'elastic.out' },
  radius: { 0: 60 },
  duration: 1000,
  opacity:  { 1: 0.2 }
});
class Whirl extends mojs.CustomShape {
  getShape () {
    return '<path d="M50.9,17c0.5,0.1,1,0.2,1.5,0.3c0.1,0,0.2,0,0.3,0c0.7,0,1.3-0.5,1.5-1.2c0.2-0.8-0.3-1.6-1.1-1.8c-0.5-0.1-1-0.2-1.6-0.3    c-0.8-0.2-1.6,0.4-1.8,1.2C49.5,16,50,16.8,50.9,17z"></path><path d="M57.1,18.7c15.5,5.9,19.7,20.1,19.7,27.6c0,9.7-7.5,24.2-23.4,24.2c-7.1,0-13-3.7-15.8-9.9c-2.3-5.2-1.9-11,1.2-14.4    c0.5-0.6,0.5-1.6-0.1-2.1c-0.6-0.5-1.6-0.5-2.1,0.1c-3.9,4.4-4.5,11.3-1.7,17.6c3.3,7.3,10.2,11.6,18.5,11.6    c18,0,26.4-16.2,26.4-27.2c0-11.1-6.7-24.8-21.6-30.4c-0.8-0.3-1.6,0.1-1.9,0.9C55.9,17.5,56.3,18.4,57.1,18.7z"></path><path d="M84.8,49.7C84,49.5,83.2,50,83,50.9c-0.1,0.5-0.2,1-0.3,1.5c-0.2,0.8,0.3,1.6,1.1,1.8c0.1,0,0.2,0,0.3,0    c0.7,0,1.3-0.5,1.5-1.2c0.1-0.5,0.2-1,0.3-1.6C86.1,50.6,85.6,49.8,84.8,49.7z"></path><path d="M83.2,56.2c-0.8-0.3-1.6,0.1-1.9,0.9c-5.9,15.5-20.1,19.7-27.6,19.7c-9.7,0-24.2-7.5-24.2-23.4c0-7.1,3.7-13,9.9-15.8    c5.2-2.3,11-1.9,14.4,1.2c0.6,0.5,1.6,0.5,2.1-0.1c0.5-0.6,0.5-1.6-0.1-2.1c-4.4-3.9-11.3-4.5-17.6-1.7    C30.9,38.1,26.5,45,26.5,53.3c0,18,16.2,26.4,27.2,26.4c11.1,0,24.8-6.7,30.4-21.6C84.4,57.3,84,56.5,83.2,56.2z"></path><path d="M49.1,83c-0.5-0.1-1-0.2-1.5-0.3c-0.8-0.2-1.6,0.3-1.8,1.1c-0.2,0.8,0.3,1.6,1.1,1.8c0.5,0.1,1,0.2,1.6,0.3    c0.1,0,0.2,0,0.3,0c0.7,0,1.3-0.5,1.5-1.2C50.5,84,50,83.2,49.1,83z"></path><path d="M42.9,81.3c-15.5-5.9-19.7-20.1-19.7-27.6c0-9.7,7.5-24.2,23.4-24.2c7.1,0,13,3.7,15.8,9.9c2.3,5.2,1.9,11-1.2,14.4    c-0.5,0.6-0.5,1.6,0.1,2.1c0.6,0.5,1.6,0.5,2.1-0.1c3.9-4.4,4.5-11.3,1.7-17.6C61.9,30.9,55,26.5,46.7,26.5    c-18,0-26.4,16.2-26.4,27.2c0,11.1,6.7,24.8,21.6,30.4c0.2,0.1,0.4,0.1,0.5,0.1c0.6,0,1.2-0.4,1.4-1    C44.1,82.5,43.7,81.6,42.9,81.3z"></path><path d="M16.2,45.9c-0.8-0.2-1.6,0.3-1.8,1.1c-0.1,0.5-0.2,1-0.3,1.6c-0.2,0.8,0.4,1.6,1.2,1.8c0.1,0,0.2,0,0.3,0    c0.7,0,1.3-0.5,1.5-1.2c0.1-0.5,0.2-1,0.3-1.5C17.5,46.9,17,46.1,16.2,45.9z"></path><path d="M46.3,23.3c9.7,0,24.2,7.5,24.2,23.4c0,7.1-3.7,13-9.9,15.8c-5.2,2.3-11,1.9-14.4-1.2c-0.6-0.5-1.6-0.5-2.1,0.1    c-0.5,0.6-0.5,1.6,0.1,2.1c2.6,2.3,6,3.4,9.7,3.4c2.6,0,5.3-0.6,7.9-1.8c7.3-3.3,11.6-10.2,11.6-18.5c0-18-16.2-26.4-27.2-26.4    c-11.1,0-24.8,6.7-30.4,21.6c-0.3,0.8,0.1,1.6,0.9,1.9c0.8,0.3,1.6-0.1,1.9-0.9C24.6,27.4,38.8,23.3,46.3,23.3z"></path>';
  }
}
mojs.addShape( 'whirl', Whirl );

const whirlE = mojs.easing.path('M0,3.3S104.4,146.8,104.4,366.8c0,0,10.6-586.5,68.8-76.5,0,0,40.6-359.4,88.8-50,0,0,35.3-194.7,74.7-15.9,0,0,35.9-81.8,63.2,2.4');
const whirl = new mojs.Shape({
  left: 0, top: 0,
  shape: 'whirl',
  angle: { "-800" : 0 },
  fill: { '#e2441d' : 'yellow' },
  scale:  { 0 : 1 },
  easing: whirlE,
  duration: 1300,
  opacity:  { 0: 1 },
  radius: 60
});
const timeline = new mojs.Timeline();

timeline
.add( burst, circle, whirl );

var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");

document.addEventListener(clickHandler, function(e) {
  const coords = { x: e.pageX, y: e.pageY };
  
  burst.tune(coords);
  circle.tune(coords);
  whirl.tune(coords);
  
  timeline.replay();
}, false);


