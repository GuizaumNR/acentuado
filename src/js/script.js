const words = [
    { original: "acao", correct: "ação" },
    { original: "caotico", correct: "caótico" },
    { original: "eletronico", correct: "eletrônico" },
    { original: "futuro", correct: "futuro" }, // palavra sem acento
];

let currentWordIndex = 0;

function showWord() {
    document.getElementById("word").textContent = words[currentWordIndex].original;
}

function checkAnswer() {
    const answer = document.getElementById("answer").value.trim();
    const correctAnswer = words[currentWordIndex].correct;
    const resultElement = document.getElementById("result");

    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        resultElement.textContent = "Correto!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = `Incorreto. A resposta correta é: ${correctAnswer}`;
        resultElement.style.color = "red";
    }

    // Próxima palavra
    currentWordIndex = (currentWordIndex + 1) % words.length;
    document.getElementById("answer").value = '';
    showWord();
}

// Inicializa o jogo
showWord();