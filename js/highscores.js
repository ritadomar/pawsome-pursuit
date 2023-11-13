let highScores = JSON.parse(localStorage.getItem('playerScore'));
highScores.sort(({ score: a }, { score: b }) => a - b);
highScores.reverse();

// get highscores names
if (highScores[0])
  document.getElementById('first-place-name').innerHTML = highScores[0].name;
if (highScores[1])
  document.getElementById('second-place-name').innerHTML = highScores[1].name;
if (highScores[2])
  document.getElementById('third-place-name').innerHTML = highScores[2].name;

// get highscores scores
if (highScores[0])
  document.getElementById('first-place-score').innerHTML = highScores[0].score;
if (highScores[1])
  document.getElementById('second-place-score').innerHTML = highScores[1].score;
if (highScores[2])
  document.getElementById('third-place-score').innerHTML = highScores[2].score;

// get highscores time
if (highScores[0])
  document.getElementById('first-place-time').innerHTML = highScores[0].time;
if (highScores[1])
  document.getElementById('second-place-time').innerHTML = highScores[1].time;
if (highScores[2])
  document.getElementById('third-place-time').innerHTML = highScores[2].time;
