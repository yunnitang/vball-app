import React, {Component} from 'react';

class PlayerList extends Component {
  constructor(props){
    super(props);

    this.handlePlayerClick = this.handlePlayerClick.bind(this);
  }

  handlePlayerClick(player){
    var newSeek = {
        player_num: player.id,
        team: player.team,
        types: {
          Attack: 1,
          Defense: 1,
          Serve: 1,
          Reception: 1
        },
      };

    //trigger new Seek change;
    this.props.changeSeek(newSeek);
  }

  render() {
    const PlayerList = [];

    if(this.props.playerNameList.length !== 0){
      var that = this;
      this.props.playerNameList.forEach(function(player){
        PlayerList.push(<li onClick={that.handlePlayerClick.bind(that,player)} key={player.id}>{player.first_name} {player.last_name}</li>);
      });
    }

    return (
      <div className={"playerList playerList__" + this.props.name}>
      	<h2>{this.props.name}</h2>
      	<ul>
      		{PlayerList}
      	</ul>
      </div>
    );
  }
}

export default PlayerList;
