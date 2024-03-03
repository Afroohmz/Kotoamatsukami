const questions = [
        {
          question: "What does HTML stand for?",
          answers: ["Hyper Transfer Markup Language", "Hyper Text Markup Language", "Hyperlink and Text Markup Language"],
          correctAnswer: "Hyper Text Markup Language"
        },
        {
          question: "Which CSS property is used to change the text color of an element?",
          answers: ["font-color", "text-style", "color"],
          correctAnswer: "color"
        },
        {
          question: "What does CSS stand for?",
          answers: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets"],
          correctAnswer: "Cascading Style Sheets"
        },
        {
          question: "Which CSS property is used to control the spacing between elements?",
          answers: ["padding", "margin", "space"],
          correctAnswer: "padding"
        },
        {
          question: "Which JavaScript keyword is used to declare a variable?",
          answers: ["var", "let", "const"],
          correctAnswer: "var"
        },
        {
          question: "What does the 'href' attribute of an anchor tag (<a>) in HTML stand for?",
          answers: ["Hypertext Reference", "Hypertext Reach", "Hyperlink Reference"],
          correctAnswer: "Hypertext Reference"
        },
        {
          question: "Which CSS property is used to make text bold?",
          answers: ["font-weight", "text-weight", "bold"],
          correctAnswer: "font-weight"
        },
        {
          question: "Which JavaScript function is used to output data to the console?",
          answers: ["console.print()", "print()", "console.log()"],
          correctAnswer: "console.log()"
        },
        {
          question: "What is the default display property of an HTML <div> element?",
          answers: ["block", "inline", "inline-block"],
          correctAnswer: "block"
        },
        {
          question: "What is the purpose of the 'float' property in CSS?",
          answers: ["To move an element to the right or left and make it float", "To change the background color of an element", "To change the font size of an element"],
          correctAnswer: "To move an element to the right or left and make it float"
        },
        {
          question: "Which JavaScript operator is used to compare two values for equality?",
          answers: ["==", "=", "==="],
          correctAnswer: "==="
        },
        {
          question: "Which CSS property is used to set the background color of an element?",
          answers: ["background-color", "color", "bg-color"],
          correctAnswer: "background-color"
        },
        {
          question: "In JavaScript, which loop is used to iterate over the properties of an object?",
          answers: ["for loop", "while loop", "for...in loop"],
          correctAnswer: "for...in loop"
        },
        {
          question: "What is the purpose of the 'z-index' property in CSS?",
          answers: ["To control the order of elements in a stack", "To change the font style of an element", "To set the border width of an element"],
          correctAnswer: "To control the order of elements in a stack"
        }
      ];
      
      let currentQuestionIndex = 0;
      let correctAnswers = 0;
      let timeLeft = 180; // Reduced time for demonstration
      let timerInterval;
      
      const startBtn = document.getElementById("start-btn");
      const questionContainer = document.getElementById("question-container");
      const scoreContainer = document.getElementById("score-container");
      const timerDisplay = document.getElementById("timer");
      
      startBtn.addEventListener("click", startQuiz);
      
      function startQuiz() {
        startTimer();
        displayQuestion();
      }
      
      function startTimer() {
        timerInterval = setInterval(function () {
          timeLeft--;
          if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
            clearInterval(timerInterval);
            endQuiz();
          }
          displayTimer();
        }, 1000);
      }
      
      function displayTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      }
      
      function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
          <h2>${currentQuestion.question}</h2>
          ${currentQuestion.answers
            .map(
              (answer) =>
                `<button class="answer-btn">${answer}</button>`
            )
            .join("")}
        `;
      
        const answerButtons = document.querySelectorAll(".answer-btn");
        answerButtons.forEach((button) => {
          button.addEventListener("click", function (event) {
            checkAnswer(event.target.textContent);
          });
        });
      }
      
      function checkAnswer(selectedAnswer) {
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
      
        if (selectedAnswer === correctAnswer) {
          // Correct answer
          correctAnswers++;
        } else {
          // Incorrect answer
          timeLeft -= 10; // Subtract 10 seconds for wrong answer
          if (timeLeft < 0) {
            timeLeft = 0; // Ensure time doesn't go negative
          }
        }
      
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          displayQuestion();
        } else {
          endQuiz();
        }
      }
      function endQuiz() {
        clearInterval(timerInterval);
        questionContainer.innerHTML = "";
        scoreContainer.innerHTML = `
          <h2>Quiz Over!</h2>
          <p>Your final score: ${correctAnswers} out of ${questions.length}</p>
          <label for="name">Enter your name:</label>
          <input type="text" id="name">
          <button onclick="saveScore()">Save Score</button>
        `;
      }
      
      function saveScore() {
        const playerName = document.getElementById("name").value;
        const playerScore = correctAnswers;
      
        const playerData = {
          name: playerName,
          score: playerScore
        };
      
        const playerScores = JSON.parse(localStorage.getItem("playerScores")) || [];
        playerScores.push(playerData);
        localStorage.setItem("playerScores", JSON.stringify(playerScores));
      
        alert("Your score has been saved!");
      }
      