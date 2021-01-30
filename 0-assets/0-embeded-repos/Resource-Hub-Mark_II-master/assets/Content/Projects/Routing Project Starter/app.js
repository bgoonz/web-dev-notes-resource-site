const express = require('express');
const app = express();

app.set('view engine', 'pug');

const margot = express.Router();
const margeaux = express.Router();

app.use('/margot',margot);
app.use('/margeaux',margeaux);

margot.get('/bio', (req,res) => {
    res.send('Bio');
})

margot.get('/contact', (req,res) => {
    res.send('Contact');
})

margeaux.get('/bio', (req,res) => {
    res.send('Bio');
})

margeaux.get('/contact', (req,res) => {
    res.send('Contact');
})


app.get('/', (req,res) => {
    res.send('Hello from Express!');
});

app.get(/xyz$/, (req, res) => {
    res.send("That's all I wrote.")
})

app.all('/:id', (req,res) => {
    res.render('index', { method: req.method, path: req.path, randomNumber: Math.round(Math.random() * 10) })
});

app.get('/capital-letters/:letters', (req, res) => {
    res.send(req.params.letters.toUpperCase());
})

const port = 8081;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
