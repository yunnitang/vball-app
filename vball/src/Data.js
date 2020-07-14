import Game from './Game.js';
import fs from 'fs';

class Data{
	constructor(id){
		this.games = {};
		this.init();
	}

	init(){
		// Parse all the currently uploaded .dvw files
		var that = this;
		fs.readdirSync('./data').forEach(function(file){
			var temp = file.split(".");
			var id = temp[0];
			var extension = temp[1];
			console.log("Adding game "+id+" from file "+file);
			if(extension == "dvw"){
				that.games[id] = new Game(id);
			}
		});

	}

	addGame(id){
		// TODO: CHECK THAT id.dvw exists inside the data directory
		this.games[id] = new Game(id);
	}

	generate_unique_game_id(){
		while(true){
			var rand_id = Math.random().toString(36).substr(2,9);

			if(!(rand_id in this.games)){
				return rand_id;
			}
		}
	}
}

export default Data;