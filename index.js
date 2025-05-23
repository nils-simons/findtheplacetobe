require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, './app'), {
    extensions: ['html'],
}));


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})