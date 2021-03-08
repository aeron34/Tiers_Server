const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const redis = require('redis');
app = express();

app.use(express.static('images'));
app.use(cors());

redisClient = redis.createClient();

let characters = {
  "falco": {
    "Tier": "A",
    "Game": "StarFox",
    "Weight": "180lbs",
    "Height": "5'2 ft",
    "Color":  [230,246,254],
    "wins": 42
  },

  "luigi": {
    "Tier": "C",
    "Game": "Mario Brothers",
    "Weight": "150lbs",
    "Height": "6'0 ft",
    "Color":[4,199,56],
    "wins": 12
  },

  "fox": {
    "Tier": "A",
    "Game": "StarFox",
    "Weight": "182.5lbs",
    "Height": "5'1 ft",
    Color: [215,141,15],
    "wins": 58
  },

  "ness": {
    "Tier": "C",
    "Game": "Mother",
    "Weight": "125lbs",
    "Height": "4'7 ft",
    Color: [227,54,104],
    "wins": 20

  },

  "falcon": {
    "Tier": "A",
    "Game": "Mother",
    "Weight": "190lbs",
    "Height": "6'2 ft",
    Color: [151,25,182],
    "wins": 45

  },

  "mario": {
    "Tier": "B",
    "Game": "Mario Brothers",
    "Weight": "152lbs",
    "Height": "5'8 ft",
    "Color": [236,39,20],
    "wins": 32

  }
}

app.get('/redis', (req, res) => {
  redisClient.get('mes', (err, reply) => {
      if(err || !reply)
      {
        res.status(500).json(err);
      }
      else{
        res.json(reply);
      }
    })
})

app.get('/', (req, res) => {
  const token = jwt.sign({text: "TOEKN"}, 'JWT SCE');
  Promise.resolve(redisClient.set('me', token))
  .then(
    success => res.json({'success': true, token})
  );
})

app.get('/data/:name', (req, res) => {
  console.log(req.params.name);
  //setTimeout(bloop, 4000, req, res);
  res.send(characters[req.params.name])
});

app.get('/data/', (req, res) => {
  console.log(req.params.name);
  res.send(characters);
});

app.listen(process.env.PORT);
