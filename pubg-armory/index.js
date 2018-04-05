const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const port = process.env.PORT || 3080;

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

app.get('/api/v1/players/:regionId/:playerName', (req, res) => {
    let playerName = req.params.playerName;
    let regionId = req.params.regionId;
    if (playerName && regionId) {
        GetPlayerData(playerName, regionId)
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

app.get('/api/v1/matches/:regionId/:matchId', (req, res) => {
    let matchId = req.params.matchId;
    let regionId = req.params.regionId;
    if (matchId && regionId) {
        apiInstance.loadMatchById(matchId, regionId)
            .then(matchData => {
                res.json(new MatchDTO(matchData));
            })
            .catch(error => {{
                res.json(error);
            }})
    } else {
        res.json('Match ID required.');
    }
})

function GetPlayerData(playerName, regionId) {
    return new Promise((resolve, reject) => {
        apiInstance.searchPlayers({ playerNames: playerName }, regionId)
            .then(response => {
                let player = new PlayerDTO(response.data[0]);
                if (player.matches.length > 0) {
                    GetMatchDataFromPlayer(player, regionId)
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

function GetMatchDataFromPlayer(player, regionId) {
    return new Promise((resolve, reject) => {
        let matchesToGet = player.matches.length >= 3 ? 3 : player.matches.length;
        if (matchesToGet) {
            let matchPromisesArr = [];
            for (let i = 0; i < matchesToGet; i++) {
                matchPromisesArr.push(apiInstance.loadMatchById(player.matches[i].id, regionId));
            }
            Promise.all(matchPromisesArr)
                .then(matchValues => {
                    for(let i = 0; i < matchValues.length; i++) {
                        player.matches[i] = new MatchDTO(matchValues[i]);
                    }
                    resolve(player);
                })
                .catch(error => {
                    reject(error);
                })
        } else {
            resolve();
        }
    })
    
}

app.use(express.static(__dirname + '/build'));

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})