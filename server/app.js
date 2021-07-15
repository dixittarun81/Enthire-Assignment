const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();
const port = 4000
const apiRouter = require('./routes');


//cors middleware
app.use(cors());

//path middleware
app.use(express.static(path.join(__dirname, 'uploads')));


//middleware for api routes
app.use('/api', apiRouter);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`)
})