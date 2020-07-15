import Action from './Action.js';

class Player{
    constructor(first_name, last_name, number){
        this.first_name = first_name;
        this.last_name = last_name; 
        this.number = number;   
        this.actions = [];
    }
    addAction(id){
        this.actions.push(id);
    }
}

export default Player;