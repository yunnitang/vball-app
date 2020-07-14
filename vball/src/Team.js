import Player from './Player.js';

class Team{
    constructor (teamName){
        this.players = {};
        this.teamName = teamName;   

    }
    addPlayer(first_name, last_name, number){
        this.players[number] = new Player(first_name, last_name, number);
    }
}

export default Team;