const express = require("express");
const accountRouter = require('./accounts/accounts-router')
const server = express();

server.use(express.json());

server.use('/api/accounts', accountRouter)

server.get('/', (req, res) => {
    res.send(`<h2>LET'S GOOOOO!!!!</h2>`)
})

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` })
})

module.exports = server;
