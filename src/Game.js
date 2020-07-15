import Team from './Team.js';
import Action from './Action.js';
import fs from 'fs';
import es from 'event-stream';


class Game{
    constructor(id){
        this.id = id;
        this.homeTeam = new Team("home");
        this.visitingTeam = new Team("visiting");
        this.actions = {};
        this.initGameData();
    }

    addAction(team,player_num,action,time){
        var id = this.generate_unique_action_id();
        this.actions[id] = new Action(id,action,team,player_num,time);

        if(team == "homeTeam"){
            this.homeTeam.players[player_num].addAction(id);
        } else if (team == "visitingTeam"){
            this.visitingTeam.players[player_num].addAction(id);
        } else {
            throw Error("Wrong team specified");
        }
    }

    initGameData(){
        var fileName = this.id + '.dvw';
        var curSection = 'IGNORE';
        var filePath = __dirname + '/../data/' + fileName;
        var that = this;

        fs.createReadStream(filePath)
        .pipe(es.split())
        .pipe(es.mapSync(function(line){

            //home players
            if(line === '[3PLAYERS-H]'){
                curSection = '[3PLAYERS-H]' 
            }
            else if(line === '[3PLAYERS-V]'){
                curSection = '[3PLAYERS-V]'
            }
            else if(line === '[3ATTACKCOMBINATION]'){
                curSection = '3ATTACKCOMBINATION'
            }
            else if(line === '[3SCOUT]'){
                curSection = '[3SCOUT]'

            }

            else{
                if(curSection == '[3PLAYERS-H]' ){
                    var a = line.split('-')[1];
                    var last_name_h = a.split(';')[1];
                    var first_name_h = a.split(';')[2];
                    var num = line.split(';')[1];
                    that.homeTeam.addPlayer(first_name_h,last_name_h,num); 
                }

                //visiting players
                else if(curSection == '[3PLAYERS-V]'){
                    var b = line.split('-')[1];
                    var last_name_v = b.split(';')[1];
                    var first_name_v = b.split(';')[2];
                    var num = line.split(';')[1];
                    that.visitingTeam.addPlayer(first_name_v,last_name_v,num); 
                }

                //parse information after skipping initial headers
                else if(curSection == '[3SCOUT]'){
                    //home or opponent
                    if(line[0] ==='a' || line[0] ==='*'){
                        var action = "";
                        var actionName = "";

                        if(line.indexOf('S') > -1){
                            action = "S";
                            actionName = "Serve";                     
                        }
                        else if(line.indexOf('R')> -1){
                            action = "R";
                            actionName = "Reception";
                        }
                        else if(line.indexOf('A')> -1){
                            action = "A";
                            actionName = "Attack";
                        }
                        else if(line.indexOf('D')> -1){
                            action = "D";
                            actionName = "Defense";
                        }  
                        else{
                            action = "";
                            actionName = "";
                        }
                        if (action != ""){
                            var actionSplit = line.split(action)[0]
                            var time = line.split(';')[12]
                            var team = actionSplit.slice(0,1)
                            var num = parseInt(actionSplit.slice(1,3))
                            //console.log(num,team)
                            if(team == '*'){
                                that.addAction("homeTeam",num,actionName,time);
                            }else{
                                that.addAction("visitingTeam",num,actionName,time);
                            }       
                        }   
                    }

                }
            }
            // resume the readstream, possibly from a callback
            //s.resume();
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('Read entire file.');
        })

        );
    }

    generate_unique_action_id(){
        while(true){
            var rand_id = Math.random().toString(36).substr(2,9);

            if(!(rand_id in this.actions)){
                return rand_id;
            }
        }
    }
}

export default Game;