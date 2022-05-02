const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

const PORT = process.env.PORT || 3001;

mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/Social-Network-Api',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => {
    console.log(`The App is running on port: ${PORT}`)
});

