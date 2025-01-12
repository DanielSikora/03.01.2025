// Zainicjuj nowy projekt Node.js (jeżeli jeszcze go nie masz): npm init -y
// Zainstaluj Express: npm install express

const express = require('express');  // Importujemy Express
const app = express();               // Tworzymy instancję aplikacji

// Obsługa trasy GET na ścieżce "/"
app.get('/', (req, res) => {
  res.send('Witaj w Express!');   // Wysyłamy tekst "Witaj w Express!"
});

// Nasłuchujemy na porcie 3000
app.listen(3000, () => {
  console.log('Serwer Express działa na http://localhost:3000');
});

// Uruchamiamy node server.js

// Od wersji 4.16 w górę Express posiada wbudowane express.json() do parsowania JSON.
// Dla zwykłych formularzy (format application/x-www-form-urlencoded) możemy użyć express.urlencoded().