import React, {Component} from 'react';

class PlayerList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const PlayerList = [];

    if(this.props.playerNameList.length !== 0){
      this.props.playerNameList.forEach(function(player){
        PlayerList.push(<li key={player}>{player}</li>)
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
