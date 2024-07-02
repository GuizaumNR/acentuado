 // Configuração do Firebase
 const firebaseConfig = {
    apiKey: "AIzaSyCC6Q9Mn-cVB0TfEttxGMJWmruRKvjosAw",
    authDomain: "acentuado-f39f0.firebaseapp.com",
    projectId: "acentuado-f39f0",
    storageBucket: "acentuado-f39f0.appspot.com",
    messagingSenderId: "1096964057757",
    appId: "1:1096964057757:web:8fd653158cf72aabfd4274",
    measurementId: "G-YP8HZECKE8"
  };

  // Inicialize o Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(app);

  // Array para armazenar as palavras
  let words = [];
  let currentWordIndex = 0;

  // Função para ler dados do Firestore
  function fetchWords() {
    db.collection("words").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const wordData = doc.data();
        words.push({
          original: wordData.incorrect,
          correct: wordData.correct
        });
      });
      console.log("Palavras carregadas:", words); // Adicionado para depuração
      if (words.length > 0) {
        showWord();
      } else {
        document.getElementById("word").textContent = "Nenhuma palavra encontrada.";
      }
    }).catch((error) => {
      console.error("Erro ao buscar documentos: ", error);
    });
  }

  // Função para mostrar a palavra atual
  function showWord() {
    if (words.length > 0) {
      document.getElementById("word").textContent = words[currentWordIndex].original;
    } else {
      document.getElementById("word").textContent = "Nenhuma palavra encontrada.";
    }
  }

  // Função para verificar a resposta
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

  // Carregar as palavras do Firestore
  fetchWords();