import React, {Component} from 'react';
import SeekType from "./SeekType"

class SeekPanel extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getCurrentActions = this.getCurrentActions.bind(this);
    this.seekVideoTo = this.seekVideoTo.bind(this);
    this.setCheckBoxes = this.setCheckBoxes.bind(this);

    this.attackCheckRef = React.createRef();
    this.defenseCheckRef = React.createRef();
    this.receptionCheckRef = React.createRef();
    this.serveCheckRef = React.createRef();
  }

  setCheckBoxes(){
    this.attackCheckRef.current.checked = this.props.seek_filter.types.Attack == 1 ? true : false;
    this.defenseCheckRef.current.checked = this.props.seek_filter.types.Defense == 1 ? true : false;
    this.receptionCheckRef.current.checked = this.props.seek_filter.types.Reception == 1 ? true : false;
    this.serveCheckRef.current.checked = this.props.seek_filter.types.Serve == 1 ? true : false;
  }

  componentDidMount(){
    this.setCheckBoxes();
  }

  componentDidUpdate(prevProps) {
    console.log("update")
      this.setCheckBoxes();
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
        if(currAction.type === "Attack"){
          if(filter.types.Attack === 0){
            typeFiltered = 1;
          }
        }
        if(currAction.type === "Defense"){
          if(filter.types.Defense === 0){
            typeFiltered = 1;
          }
        }
        if(currAction.type === "Serve"){
          if(filter.types.Serve === 0){
            typeFiltered = 1;
          }
        }
        if(currAction.type === "Reception"){
          if(filter.types.Reception === 0){
            typeFiltered = 1;
          }
        }
        // console.log(filter);
        // console.log(currAction);
        // console.log(playerFiltered);
        // console.log("--------------------------");

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
  handleClick(type,e){
    // e.preventDefault();
    var newSeek = {
        player_num: this.props.seek_filter.player_num,
        team: this.props.seek_filter.team,
        types: {
          Attack: type === "Attack" ? (this.props.seek_filter.types.Attack + 1 ) % 2 : this.props.seek_filter.types.Attack,
          Defense: type === "Defense" ?(this.props.seek_filter.types.Defense + 1 ) % 2  : this.props.seek_filter.types.Defense,
          Serve: type === "Serve" ? (this.props.seek_filter.types.Serve + 1 ) % 2  : this.props.seek_filter.types.Serve,
          Reception: type === "Reception" ? (this.props.seek_filter.types.Reception + 1 ) % 2  : this.props.seek_filter.types.Reception
        },
      };
    //trigger new Seek change;
    this.props.changeSeek(newSeek);
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
        <div class = "checkBox">
          
          <div>
            <input ref={this.attackCheckRef} type="checkbox" className="checkbox" name="Attack" onClick={this.handleClick.bind(this,"Attack")}></input>
            <label for="attack">Attack</label>
          </div>
          <div>
          <input ref={this.defenseCheckRef} type="checkbox" className="checkbox" name="Defense" onClick={this.handleClick.bind(this,"Defense")}></input>
          <label for="Defense">Defense</label>
          </div>
          <div>
          <input ref={this.receptionCheckRef} type="checkbox" className="checkbox" name="Reception" onClick={this.handleClick.bind(this,"Reception")}></input>
          <label for="Reception">Reception</label>
          </div>
          <div>
          <input ref={this.serveCheckRef} type="checkbox" className="checkbox" name="Serve" onClick={this.handleClick.bind(this,"Serve")}></input>
          <label for="Serve">Serve</label>
        </div>
        </div>
      </div>
    );
  }
}

export default SeekPanel;
