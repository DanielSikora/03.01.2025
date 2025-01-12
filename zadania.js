// server.js

const express = require('express');
const app = express();

// Middleware do obsługi formularzy (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
// (Opcjonalnie) Middleware do obsługi JSON (na wypadek, gdyby było potrzebne)
app.use(express.json());

/* 
  ZADANIE 1:
  Dodaj trasę z parametrem w ścieżce (GET /hello/:name).
  - Jeśli wchodzimy na /hello/Jan -> "Witaj, Jan!"
  - Jeśli brakuje parametru name (np. ktoś wejdzie na /hello/), zwróćmy komunikat o błędzie.
*/
app.get('/hello/:name', (req, res) => {
  // Odczytanie parametru ze ścieżki
  const { name } = req.params;
  
  // Prosta walidacja — sprawdzamy, czy `name` istnieje
  if (!name) {
    return res.status(400).send('Brak parametru "name" w ścieżce!');
  }
  // Jeśli wszystko jest OK, wysyłamy odpowiedź
  res.send(`Witaj, ${name}!`);
});

/* 
  ZADANIE 2:
  Obsługa query params (np. GET /products?page=2&limit=5&sort=name).
  - Wyświetl tekst: "Wyświetlam stronę 2, liczba rekordów: 5, sortowanie: name"
  - Jeśli użytkownik nie poda któregoś parametru, ustaw wartość domyślną.
*/
app.get('/products', (req, res) => {
  // Pobieramy parametry query: page, limit, sort
  // Ustawiamy wartości domyślne, jeśli brak w zapytaniu
  const { page = 1, limit = 10, sort = 'asc' } = req.query;
  
  res.send(`Wyświetlam stronę ${page}, liczba rekordów: ${limit}, sortowanie: ${sort}`);
});

/* 
  ZADANIE 3:
  Formularz kontaktowy (GET /contact -> formularz, POST /contact -> odbiór danych).
  - Strona /contact wyświetla prosty formularz z polami:
      * imię (name)
      * email
      * wiadomość (message)
  - Po wysłaniu formularza metodą POST /contact serwer ma wyświetlić potwierdzenie:
      "Dziękujemy za wiadomość, [imię]! Odpowiemy na adres [email]."
*/
app.get('/contact', (req, res) => {
  // Zwracamy prosty formularz HTML
  res.send(`
    <h1>Formularz kontaktowy</h1>
    <form action="/contact" method="POST">
      <label for="name">Imię:</label>
      <input type="text" id="name" name="name" required />

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label for="message">Wiadomość:</label>
      <textarea id="message" name="message" required></textarea>

      <button type="submit">Wyślij</button>
    </form>
  `);
});

app.post('/contact', (req, res) => {
  // Odczytujemy dane przesłane w formularzu
  const { name, email, message } = req.body;
  
  // Prosta walidacja — czy wypełniono wszystkie pola?
  if (!name || !email || !message) {
    return res.status(400).send('Wypełnij wszystkie pola formularza!');
  }

  // Odesłanie potwierdzenia
  res.send(
    `Dziękujemy za wiadomość, ${name}! ` +
    `Odpowiemy na adres ${email}. ` +
    `Oto Twoja wiadomość: "${message}"`
  );
});

// Uruchomienie serwera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serwer Express działa na http://localhost:${PORT}`);
});
