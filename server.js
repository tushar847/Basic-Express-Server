const express = require('express');
const db = require('./db/db');
const routes = require('./routes/routes');
const app = express();

db.connectToDb();
app.use(express.json());
app.use('/entries', routes);
app.listen(3000 , () => { console.log('Server Started')});