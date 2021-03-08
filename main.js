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

app.listen(process.env.PORT);
