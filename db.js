const db = require('mongoose');

// db.connect('mongodb://127.0.0.1:27018/myshop', { useNewUrlParser: true });
db.connect('mongodb+srv://notes_culture:oTvF366YRVazjiJA@cluster0-k1v0e.mongodb.net/myshop?retryWrites=true&w=majority', { useNewUrlParser: true });

const connection = db.connection;

connection.on('open', () => {
    console.log('Database connection successfull');
});

module.exports = db;