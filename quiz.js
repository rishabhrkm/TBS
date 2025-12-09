// Viswanathan Anand quiz data with explanations
const questions = [
  {
    question: "When was Viswanathan Anand born?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/AnandV2013.jpg/320px-AnandV2013.jpg",
    options: ["9th December 1969", "11th December 1969", "14th December 1970", "11th November 1969"],
    answer: 1,
    explanation: "Viswanathan Anand was born on 11th December 1969 in Chennai, Tamil Nadu, India."
  },
  {
    question: "Which country does Viswanathan Anand represent?",
    image: "",
    options: ["India", "Russia", "Spain", "United States"],
    answer: 0,
    explanation: "Anand represents India and is one of the country's most celebrated sports personalities."
  },
  {
    question: "What nickname is popularly associated with Anand?",
    image: "",
    options: ["Tiger of Madras", "Knight King", "Grandmaster Guru", "Checkmate Master"],
    answer: 0,
    explanation: "Anand is often referred to as the 'Tiger of Madras' for his aggressive playing style and Chennai roots."
  },
  {
    question: "In which year did Anand win his first World Chess Championship?",
    image: "",
    options: ["2000", "2007", "2008", "2010"],
    answer: 0,
    explanation: "Anand won his first World Chess Championship in 2000, becoming the FIDE World Chess Champion."
  },
  {
    question: "Who did Anand defeat in the 2010 World Chess Championship?",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Veselin_Topolov_2008_Most.jpg",
    options: ["Vladimir Kramnik", "Magnus Carlsen", "Veselin Topalov", "Boris Gelfand"],
    answer: 2,
    explanation: "In 2010, Anand successfully defended his title against Bulgarian grandmaster Veselin Topalov."
  },
  {
    question: "Which of these awards has Anand NOT won?",
    image: "",
    options: ["Padma Shri", "Padma Vibhushan", "Padma Bhushan", "Bharat Ratna"],
    answer: 3,
    explanation: "Anand has received Padma Shri (1991), Padma Bhushan (2000), and Padma Vibhushan (2007), but not Bharat Ratna."
  },
  {
    question: "Viswanathan Anand became India's first?",
    image: "",
    options: ["FIDE World Champion", "Chess Grandmaster", "Chess Olympiad Gold Medallist", "World Rapid Champion"],
    answer: 1,
    explanation: "Anand became India's first chess grandmaster in 1988 at the age of 18."
  },
  {
    question: "Which magazine named Anand as one of the world's most influential people in 2011?",
    image: "",
    options: ["Forbes", "Time", "Outlook", "Chess Life"],
    answer: 1,
    explanation: "Time magazine listed Anand among the 'World's 100 Most Influential People' in 2011."
  },
  {
    question: "What is Anand's style of play often admired for?",
    image: "",
    options: ["Extreme aggression", "Speed and intuition", "Defensive openings", "Unconventional moves"],
    answer: 1,
    explanation: "Anand is renowned for his rapid thinking, intuitive moves, and speed of play, earning him the nickname 'Lightning Kid' early in his career."
  },
  {
    question: "Which title did Anand earn in 1988?",
    image: "",
    options: ["International Master", "World Champion", "Grandmaster", "National Champion"],
    answer: 2,
    explanation: "In 1988, at age 18, Anand became India's first grandmaster by achieving his final GM norm."
  },
];

let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

function showQuiz(name) {
  const container = document.getElementById('container');
  container.innerHTML = '';
  
  function renderQuestion() {
    const q = questions[currentQuestionIndex];
    let html = `
      <div class="progress">Question ${currentQuestionIndex + 1} of ${questions.length}</div>
      <div class="quiz-question">${q.question}</div>
    `;
    
    if (q.image) {
      html += `<div class="question-image"><img src="${q.image}" alt=""></div>`;
    }
    
    html += `<form class="options" id="options">`;
    
    for (let i = 0; i < q.options.length; i++) {
      html += `
        <label>
          <input type="radio" name="option" value="${i}"/>
          ${q.options[i]}
        </label>
      `;
    }
    
    html += `<button type="submit">${currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</button></form>`;
    container.innerHTML = html;
    
    const radios = document.querySelectorAll('input[type="radio"]');
    const labels = document.querySelectorAll('.options label');
    
    radios.forEach((r, i) => {
      r.addEventListener('change', () => {
        labels.forEach(l => l.classList.remove('selected'));
        labels[i].classList.add('selected');
      });
    });
    
    document.getElementById('options').onsubmit = function(e) {
      e.preventDefault();
      const selected = document.querySelector('input[name="option"]:checked');
      
      if (!selected) {
        alert('Please select an option.');
        return;
      }
      
      const answerIndex = parseInt(selected.value, 10);
      const isCorrect = answerIndex === q.answer;
      
      // Store user answer
      userAnswers.push({
        question: q.question,
        userAnswer: q.options[answerIndex],
        correctAnswer: q.options[q.answer],
        isCorrect: isCorrect,
        explanation: q.explanation
      });
      
      if (isCorrect) score++;
      
      currentQuestionIndex++;
      
      if (currentQuestionIndex < questions.length) {
        renderQuestion();
      } else {
        showFinalScore(name);
      }
    };
  }
  
  renderQuestion();
}

function showFinalScore(name) {
  const container = document.getElementById('container');
  let html = `
    <div class="centered">
      <div class="score-display">
        <h2>🎉 Quiz Completed! 🎉</h2>
        <p>Great job, <strong>${name}</strong>!</p>
        <div class="final-score">${score}/${questions.length}</div>
        <p>${score >= 8 ? 'Excellent! You really know your Anand facts!' : 
             score >= 5 ? 'Good job! You know quite a bit about Anand!' : 
             'Keep learning! You now know more about Anand!'}</p>
      </div>
      
      <div class="answer-explanation">
        <h4>📋 Quiz Summary</h4>
        <p>Your score: <span class="user-answer">${score} correct out of ${questions.length}</span></p>
        <p>Percentage: <strong>${Math.round((score / questions.length) * 100)}%</strong></p>
      </div>
      
      <div class="quiz-summary">
        <h3>Detailed Results</h3>
  `;
  
  userAnswers.forEach((item, index) => {
    html += `
      <div class="summary-item ${item.isCorrect ? 'correct' : 'incorrect'}">
        <strong>Question ${index + 1}:</strong> ${item.question}<br>
        <span class="user-answer">Your answer: ${item.userAnswer} ${item.isCorrect ? '✓' : '✗'}</span><br>
        ${!item.isCorrect ? `<span class="correct-answer">Correct answer: ${item.correctAnswer}</span><br>` : ''}
        <em>${item.explanation}</em>
      </div>
    `;
  });
  
  html += `
      </div>
      
      <div style="margin-top: 30px;">
        <button onclick="location.reload()" style="margin-right: 15px;">Take Quiz Again</button>
        <button onclick="shareResults()" style="background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);">Share Results</button>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}

function shareResults() {
  const shareText = `I scored ${score}/${questions.length} (${Math.round((score / questions.length) * 100)}%) on the Viswanathan Anand Birthday Quiz!`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Viswanathan Anand Quiz Results',
      text: shareText,
      url: window.location.href
    });
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(shareText + '\n' + window.location.href)
      .then(() => alert('Results copied to clipboard!'));
  }
}

// Form interaction
document.getElementById('start-form').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('username').value.trim();
  if (!name) {
    alert("Please enter your name.");
    return;
  }
  
  // Reset quiz state
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
  
  showQuiz(name);
};
