const express = require('express');
const { httpGetallPlanets } = require('./planets.controller');
const planetRouter = express.Router();
planetRouter.get('/',httpGetallPlanets);

module.exports = planetRouter;