const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('dist',{maxAge:60*60*24*30}));
app.get('/', (req, res) => res.status(200).sendFile('/index.html',{root: __dirname + '/dist/'}))

app.listen(PORT, () => console.log('Example app listening on port 3000!'))