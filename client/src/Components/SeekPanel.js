import React, {Component} from 'react';
import SeekType from "./SeekType"

class SeekPanel extends Component {
  constructor(props){
    super(props);

    this.getCurrentActions = this.getCurrentActions.bind(this);
    this.seekVideoTo = this.seekVideoTo.bind(this);
  }

  getCurrentActions(){
    if(Object.keys(this.props.game_data).length !== 0){
      var newActionsList = [];
      var filter = this.props.seek_filter;
      var that = this;
      Object.keys(this.props.game_data.actions).forEach(function(action_id){
        var currAction = that.props.game_data.actions[action_id];
        var playerFiltered = 0;
        var teamFiltered = 0;
        var typeFiltered = 0;




        if(filter.player_num !== -1){
          if(filter.player_num != currAction.player_num || 
             filter.team !== currAction.team
            ){
            playerFiltered = 1;
          }
        }

        console.log(filter);
        console.log(currAction);
        console.log(playerFiltered);
        console.log("--------------------------");

        //if(filter.team !== ""){
        //    teamFiltered = 1;
        //}

        //Object.keys(filter.types).forEach(function(type){
        //  if(filter.types[type] !== 1){
        //      typeFiltered = 1;
        //  }
        //});

        if(!playerFiltered && !teamFiltered && !typeFiltered){
            newActionsList.push(action_id);
        }
      });

      return newActionsList;
    } else {
      return [];  
    }
  }

  seekVideoTo(seconds){
    console.log("SEEKING TO:", seconds);
    this.props.seekVideoTo(seconds);
  }

  render() {
    const SeekList = [];
    var actionsList = this.getCurrentActions();
    if(actionsList.length !== 0){
      var that = this;
      actionsList.forEach(function(action_id){
        var action = that.props.game_data.actions[action_id];
        SeekList.push(<SeekType key={action_id} clickFn={that.seekVideoTo.bind(that,action.time)} type={action.type} player={action.player_num} timestamp={action.time} />)
      });
    }

    return (
      <div className="seekPanel">
        <div className="seekPanel__horizontalScroll">
        	{SeekList}
         </div>
      </div>
    );
  }
}

export default SeekPanel;
