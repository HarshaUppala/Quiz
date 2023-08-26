const userName = document.getElementById('userName');
const recentScore = document.getElementById('recentScore');
const saveScore = document.getElementById('saveScore');
const onSave = document.getElementById('onSave');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
recentScore.innerText = localStorage.getItem('mostRecentScore');

let recentScoreDisplay = recentScore.innerText;

userName.addEventListener('keyup', () => {
    saveScore.disabled = !userName.value;
});

saveScore.addEventListener('click', () => {
    localStorage.setItem(userName.value, recentScoreDisplay);
})

stopReload = (e) => {
    e.preventDefault(); 

    const score = {
        score: recentScoreDisplay,
        name: userName.value
    };

    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign('./index.html');
};