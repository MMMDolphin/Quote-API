const express = require('express');
const app = express();
const port = 8888;

app.use(express.json());

const quotes = require('./data.js');
const randomArray = require('./methods.js');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


//Route for root path
app.get('/', (req, res) => {
    res.send('Welcome to the Quotes API. Use /api/quotes to get a random quote.');
});

//route to get random quote
app.get('/api/quotes', (req, res) => {
    const getRandomQuote = randomArray(quotes); // Pass the full quotes array
    if (!getRandomQuote) {
        return res.status(500).send({ error: 'Unable to retrieve a quote.' });
    }
    res.json(getRandomQuote); // Send JSON response
});

//route to post new quote
app.post('/api/quotes/add-new-quote', (req, res) => {
    const { quote, author } = req.body;

    //Validate the data
    if (!quote || !author) {
        return res.status(500).send({ error: 'You need to enter both quote and author' });
    }

    //adding the new quote to the array
    const newQuote = { quote, author };
    quotes.push(newQuote);

    //Confirmation
    res.status(200).json({ message: 'Quote added successfully' });
})

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
