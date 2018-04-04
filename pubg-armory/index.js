const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const port = process.env.PORT || 3080;

// const uristring =
//   process.env.MONGODB_URI ||
//   'mongodb://stevenhalase:TIffany11..11..@themovingcompany-shard-00-00-d3ufd.mongodb.net:27017,themovingcompany-shard-00-01-d3ufd.mongodb.net:27017,themovingcompany-shard-00-02-d3ufd.mongodb.net:27017/test?ssl=true&replicaSet=TheMovingCompany-shard-0&authSource=admin'

// mongoose.connect(uristring, (error) => {
//   if (error) {
//       console.error(error);
//   } else {
//       console.log('Mongoose connected successfully')
//   }
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.header("Origin"));
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

const Pubgapi = require('pubg-api');
const apiInstance = new Pubgapi('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjZDBiYjk5MC0xOWRkLTAxMzYtY2ExYS0wOWIxZjFlY2ZhOGQiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTIyODA4OTE2LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1YmctYXJtb3J5Iiwic2NvcGUiOiJjb21tdW5pdHkiLCJsaW1pdCI6MTB9.VWWdJv1fkYfiF-PgTfB94twvKxzES0WdNkRLGzTatoY');

const PlayerDTO = require('./dto/PlayerDTO');
const MatchDTO = require('./dto/MatchDTO');

app.get('/api/v1/players/:playerName', (req, res) => {
    let playerName = req.params.playerName;
    if (playerName) {
        GetPlayerData(playerName)
            .then(player => {
                res.json(player);
            })
            .catch(error => {{
                res.json(error);
            }})
    } else {
        res.json('Player Name required.');
    }
})

function GetPlayerData(playerName) {
    return new Promise((resolve, reject) => {
        apiInstance.searchPlayers({ playerNames: playerName })
            .then(response => {
                let player = new PlayerDTO(response.data[0]);
                if (player.matches.length > 0) {
                    GetMatchData(player)
                        .then(player => {
                            resolve(player);
                        })
                        .catch(error => {
                            reject(error);
                        })
                }
            })
            .catch(error => {
                reject(error);
            })
    })
}

function GetMatchData(player) {
    return new Promise((resolve, reject) => {
        if (player.matches.length > 0) {
            apiInstance.loadMatchById(player.matches[0].id)
            .then(match => {
                console.log(match);
                player.matches[0] = new MatchDTO(match);
                resolve(player);
            })
            .catch(error => {
                reject(error);
            })           
        } else {
            resolve(error);
        }
    })
    
}

// let ContactUsLeadRoutes = require('./ContactUsLead/ContactUsLeadRoutes');
// app.use('/api/v1/contactuslead', ContactUsLeadRoutes);

app.use(express.static(__dirname + '/build'));

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})