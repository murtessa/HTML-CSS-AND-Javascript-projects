(function() {
  var questions = [{
    question: "What is 3*5?",
    choices: [2, 5, 10, 15, 20],
    correctAnswer: 3
  }, {
    question: "What is 2*6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 3
  }, {
    question: "What is 9*9?",
    choices: [72, 81, 108, 134, 156],
    correctAnswer: 1
  }, {
    question: "What is 1*8?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 4
  }, {
    question: "What is 10*5?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 3
  }, {
    question: "What is 67+89?",
    choices: [110, 126, 135, 145, 158],
    correctAnswer: 4
  }, {
    question: "What is 145+245?",
    choices: [346, 390, 412, 455, 488],
    correctAnswer: 1
  }, {
    question: "What is 49-12?",
    choices: [10, 24, 31, 37, 41],
    correctAnswer: 3
  }, {
    question: "What is 109-67?",
    choices: [25, 34, 39, 42, 56],
    correctAnswer: 3
  }, {
    question: "What is 342-259?",
    choices: [18, 32, 56, 69, 83],
    correctAnswer: 4
  }];
  
  var questionCounter = 0; 
  var selections = []; 
  var quiz = $('#quiz'); 
  
  
  displayNext();
  
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
   
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
   
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
 
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
 
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
 
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();