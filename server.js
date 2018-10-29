const express = require('express');
const mongoose = require('mongoose');

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/nyt-search-react-mongo',
    {
        useMongoClient: true
    }
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`starting server at PORT: ${PORT}`));