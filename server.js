const express = require('express');
const productApi = require('./controllers/product');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/images', express.static(path.join(__dirname, 'public/images')));

/* Call product api resources */
productApi(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});