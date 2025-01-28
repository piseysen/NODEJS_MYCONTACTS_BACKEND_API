const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const { default: dbConnect } = require('./config/dbConnect');
const dotenv = require('dotenv').config();

const app = express();
dbConnect();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});