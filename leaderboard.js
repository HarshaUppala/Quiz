const highScoresRender = document.getElementById('highScoresRender');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let count = 0;
console.log(highScores
    .map(
        highScore =>
            `<li class="highscoreslist">${highScore.name} - ${highScore.score}<li>`
    ));

highScoresRender.innerHTML = highScores
    .map(
        highScore =>
            `<li class="highscoreslist">${count+=1} - ${highScore.name} - ${highScore.score}<li>`
    )
    .join('');

    game = () => {
        window.location.assign('./game.html');
    }
    
    home = () => {
        window.location.assign('./index.html');
    }
    
    leaderboard = () => {
        window.location.assign('./leaderboard.html');
    }
