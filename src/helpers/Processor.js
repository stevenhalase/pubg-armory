export default class Processor {
    constructor() {

    }

    static processPlayer(player) {
        player.latestMatch = player.matches[0];
        for (let match of player.matches) {
            if (match.rosters) {
                match.team = match.rosters.filter((roster, i) => {
                    let playerIndex = roster.participants.findIndex(rosterPlayer => {
                        return rosterPlayer.attributes.stats.playerId === player.id;
                    });
                    let isInRoster = playerIndex >= 0;
                    console.log(isInRoster)
                    if (isInRoster) {
                        match.matchPlayer = roster.participants[playerIndex];
                    }
					return isInRoster;
                });
            }
        }
        return player;
    }

    static processMatch(player, match) {
        if (match.rosters) {
            match.team = match.rosters.filter((roster, i) => {
                let playerIndex = roster.participants.findIndex(rosterPlayer => {
                    return rosterPlayer.attributes.stats.playerId === player.id;
                });
                let isInRoster = playerIndex >= 0;
                console.log(isInRoster)
                if (isInRoster) {
                    match.matchPlayer = roster.participants[playerIndex];
                }
                return isInRoster;
            });
        }
        return match;
    }
}