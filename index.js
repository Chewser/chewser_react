const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + "/dist"));

app.use(require('./resources.js'));

app.listen(process.env.PORT || 3000, () => console.log('Server is listening'));
