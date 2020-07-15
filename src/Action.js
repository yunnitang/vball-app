class Action{
    constructor(id, type, team, player_num, time){
    	this.id = id;
    	this.team = team;
    	this.player_num = player_num;
        this.type = type;
        this.time = time;
    }
}

export default Action;