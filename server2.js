const express = require('express');
const app = express();

// Middleware do parsowania body w formacie JSON
app.use(express.json());

// Middleware do parsowania danych z formularzy (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// GET /
app.get('/', (req, res) => {
  res.send(`
    <h1>Witaj w Express!</h1>
    <form action="/submit" method="POST">
      <label for="name">Imię:</label>
      <input type="text" id="name" name="name" />
      <button type="submit">Wyślij</button>
    </form>
  `);
});

// POST /submit
app.post('/submit', (req, res) => {
  const { name } = req.body; 
  res.send(`Otrzymano dane z formularza: ${name}`);
});

app.listen(3000, () => {
  console.log('Serwer Express działa na http://localhost:3000');
});
// app.use(express.urlencoded({ extended: true })) – dzięki temu Express potrafi zinterpretować dane 
// wysłane z formularza (metoda POST) i udostępnia je pod req.body.
// W widocznym kodzie w trasie app.post('/submit', ...) pobieramy dane z req.body i odsyłamy w odpowiedzi do klienta.

//Obsługa POST – w Express warto skorzystać z wbudowanego middleware, który parsuje dane w formacie JSON lub z formularzy.