// Viswanathan Anand quiz data
const questions = [
  {
    question: "When was Viswanathan Anand born?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/AnandV2013.jpg/320px-AnandV2013.jpg",
    options: ["9th December 1969", "11th December 1969", "14th December 1970", "11th November 1969"],
    answer: 1,
  },
  {
    question: "Which country does Viswanathan Anand represent?",
    image: "",
    options: [
      "India",
      "Russia",
      "Spain",
      "United States"
    ],
    answer: 0,
  },
  {
    question: "What nickname is popularly associated with Anand?",
    image: "",
    options: [
      "Tiger of Madras",
      "Knight King",
      "Grandmaster Guru",
      "Checkmate Master"
    ],
    answer: 0,
  },
  {
    question: "In which year did Anand win his first World Chess Championship?",
    image: "",
    options: [
      "2000",
      "2007",
      "2008",
      "2010"
    ],
    answer: 0,
  },
  {
    question: "Who did Anand defeat in the 2010 World Chess Championship?",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Veselin_Topolov_2008_Most.jpg",
    options: [
      "Vladimir Kramnik",
      "Magnus Carlsen",
      "Veselin Topalov",
      "Boris Gelfand"
    ],
    answer: 2,
  },
  {
    question: "Which of these awards has Anand NOT won?",
    image: "",
    options: [
      "Padma Shri",
      "Padma Vibhushan",
      "Padma Bhushan",
      "Bharat Ratna"
    ],
    answer: 3,
  },
  {
    question: "Viswanathan Anand became India's first?",
    image: "",
    options: [
      "FIDE World Champion",
      "Chess Grandmaster",
      "Chess Olympiad Gold Medallist",
      "World Rapid Champion"
    ],
    answer: 1,
  },
  {
    question: "Which magazine named Anand as one of the world's most influential people in 2011?",
    image: "",
    options: [
      "Forbes",
      "Time",
      "Outlook",
      "Chess Life"
    ],
    answer: 1,
  },
  {
    question: "What is Anand's style of play often admired for?",
    image: "",
    options: [
      "Extreme aggression",
      "Speed and intuition",
      "Defensive openings",
      "Unconventional moves"
    ],
    answer: 1,
  },
  {
    question: "Which title did Anand earn in 1988?",
    image: "",
    options: [
      "International Master",
      "World Champion",
      "Grandmaster",
      "National Champion"
    ],
    answer: 2,
  },
];

const leaderboardKey = 'anand_quiz_leaderboard';

function getLeaderboard() {
  let data = [];
  try {
    data = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
  } catch (e) {
    data = [];
  }
  return data;
}

function setLeaderboard(data) {
  localStorage.setItem(leaderboardKey, JSON.stringify(data));
}

function showQuiz(name) {
  let questionIndex = 0;
  let score = 0;
  const container = document.getElementById('container');
  container.innerHTML = '';

  function renderQuestion() {
    const q = questions[questionIndex];
    let html = `
      <div class="progress">Question ${questionIndex + 1} of ${questions.length}</div>
      <div class="quiz-question">${q.question}</div>
      ${q.image ? `<div style="margin:10px 0;"><img src="${q.image}" alt="" style="max-width:200px; border-radius:8px;"></div>` : ''}
      <form class="options" id="options">
    `;
    for (let i = 0; i < q.options.length; i++) {
      html += `
        <label>
          <input type="radio" name="option" value="${i}"/>
          ${q.image && i === q.answer && q.image ? '<img src="'+q.image+'" alt="" />' : ''}
          ${q.options[i]}
        </label>
      `;
    }
    html += `<button type="submit">Submit</button></form>`;
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
      const val = document.querySelector('input[name="option"]:checked');
      if (!val) {
        alert('Please select an option.');
        return;
      }
      if (parseInt(val.value, 10) === q.answer) score++;
      questionIndex++;
      if (questionIndex < questions.length) renderQuestion();
      else showLeaderboard(name, score);
    };
  }
  renderQuestion();
}

function showLeaderboard(name, score) {
  // Get and update leaderboard
  const oldLeaderboard = getLeaderboard();
  const entry = { name, score, date: new Date().toISOString() };
  oldLeaderboard.push(entry);
  // Descending sort by score, then by date ascending
  oldLeaderboard.sort((a,b) => b.score === a.score ? new Date(a.date)-new Date(b.date) : b.score-a.score);
  // Only keep top 10
  const newLeaderboard = oldLeaderboard.slice(0,10);
  setLeaderboard(newLeaderboard);

  // Find user's position
  const userIndex = newLeaderboard.findIndex(e => e.name === name && e.score === score && e.date === entry.date);

  let html = `
    <div class="centered">
      <h2>🎉 Quiz Completed! 🎉</h2>
      <div class="your-score">Your Score: ${score} / 10</div>
      <h3>Leaderboard</h3>
      <div class="leaderboard">
        <ol>
  `;
  for (let i = 0; i < newLeaderboard.length; i++) {
    html +=
      `<li${i === userIndex ? ' class="your-score"' : ''}><strong>${newLeaderboard[i].name}</strong>: ${newLeaderboard[i].score} / 10</li>`;
  }
  html += `
        </ol>
      </div>
      <button onclick="location.reload()">Take Again</button>
    </div>
  `;
  const container = document.getElementById('container');
  container.innerHTML = html;
}

// Form interaction
document.getElementById('start-form').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('username').value.trim();
  if (!name) {
    alert("Please enter your name.");
    return;
  }
  showQuiz(name);
};