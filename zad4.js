const express = require('express');
const app = express();
const port = 3000;

// Middleware do parsowania danych JSON
app.use(express.json());

// Prosta lista zadań jako przykładowe dane
let tasks = [
  { title: 'Zakupy', description: 'Kup mleko i chleb' },
  { title: 'Praca', description: 'Skończyć raport' }
];

// Trasa GET /tasks - wyświetla listę zadań
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Trasa POST /tasks - dodaje nowe zadanie do listy
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.send('Zadanie dodane pomyślnie!');
});

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
