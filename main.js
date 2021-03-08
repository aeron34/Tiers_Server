const express = require('express');
const path = require('path');
const knex = require('knex');
const pg = require('pg');
const cors = require('cors');

app = express();

app.use(express.static('images'));
app.use(cors());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var knx = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

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

app.get('/data/:name', (req, res) => {
  knx('characters').where('name', req.params.name)
  .then(success => {
    const data = success[0];
    delete data.name;
    data.color = data.color.split(',');
    for(a = 0; a < 3; a++){
      data.color[a] = parseInt(data.color[a])
    }

    res.send(data);
  })
});

app.get('/data/', (req, res) => {
  knx('characters').select('*')
  .then(data => {
    const proper_data = {}

    for(let i = 0; i < data.length; i++) {

      let name = data[i].name;
      let add_this = {...data[i]};
      add_this.color = add_this.color.split(',');

      for(a = 0; a < 3; a++){
        add_this.color[a] = parseInt(add_this.color[a])
      }

      delete add_this.name
      proper_data[name] = {...add_this};
    };

    res.send(proper_data)
  })
});

app.listen(5000)//process.env.PORT);
