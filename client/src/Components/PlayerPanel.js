import React, {Component} from 'react';
import PlayerList from './PlayerList'

class PlayerPanel extends Component {
  constructor(props){
    super(props);

    this.getPlayerList = this.getPlayerList.bind(this);

  }

  getPlayerList(team){
    if(Object.keys(this.props.game_data).length !== 0){
      var playerList = [];
      if(team === "home"){
        var that = this;
        Object.keys(this.props.game_data.homeTeam.players).forEach(function(player_id){
          var currPlayer = that.props.game_data.homeTeam.players[player_id];
          playerList.push(currPlayer.first_name + " " + currPlayer.last_name);
        });
      } else if(team === "visiting"){
        var that = this;
        Object.keys(this.props.game_data.visitingTeam.players).forEach(function(player_id){
          var currPlayer = that.props.game_data.visitingTeam.players[player_id];
          playerList.push(currPlayer.first_name + " " + currPlayer.last_name);
        });
      }
      return playerList;
    } else {
      return [];
    }
  }

  render() {
    const homeList = this.getPlayerList("home");
    const visitingList = this.getPlayerList("visiting");
    return (
      <div className="playerPanel">
      	<PlayerList name="home" playerNameList={homeList}/>
      	<PlayerList name="visiting" playerNameList={visitingList}/>
      </div>
    );
  }
}

export default PlayerPanel;
