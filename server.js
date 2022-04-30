const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:3001/Social-Network-Api',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => {
    console.log(`The App is running on port: ${PORT}`)
});

