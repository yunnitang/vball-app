import React, {Component} from 'react';
import SideBar from "./Components/SideBar"
import Video from "./Components/Video"
import PlayerPanel from "./Components/PlayerPanel"
import SeekPanel from "./Components/SeekPanel"
import UploadModal from "./Components/UploadModal"

class App extends Component {
  constructor(props){
    super(props);

    this.changeGame = this.changeGame.bind(this);
    this.triggerSeekFilterChange = this.triggerSeekFilterChange.bind(this);
    this.seekVideoTo = this.seekVideoTo.bind(this);

    this.video_ref = React.createRef();

    this.state = {
      game_id: "",
      game_data: {},
      video_id: "",
      seek_filter: {
        player_num: -1,
        team: "",
        types: {
          Attack: 1,
          Defense: 1,
          Serve: 1,
          Reception: 1
        },
      },
    };
  }

  componentWillUpdate(nextProps,nextState) {
    if(this.state.game_id !== nextState.game_id){
      var that = this;
      fetch("/api/game/" + nextState.game_id)
      .then(res => res.json())
      .then(function(data){
        that.setState({game_data: data,
                       video_id: data.video_id
                      });
      });
    }
  }

  changeGame(newGame){
    this.setState({game_id: newGame});
  }

  triggerSeekFilterChange(newSeekFilter){
    this.setState({seek_filter: newSeekFilter},function(){
      console.log(this.state);
    });
  }

  seekVideoTo(seconds){
    this.video_ref.current.seekVideoTo(seconds);
  }

  render() {
    return (
      <div id="vballMain">
        <SideBar changeGame={this.changeGame}/>
        <div className="videoPlayerWrapper">
          <Video ref={this.video_ref} game={this.state.game_id} 
                 video_id={this.state.video_id}
                 />
          <PlayerPanel changeSeek={this.triggerSeekFilterChange}
                       game_data={this.state.game_data}
                       />
        </div>
        <SeekPanel changeSeek={this.triggerSeekFilterChange}
                   seekVideoTo={this.seekVideoTo}
                   seek_filter={this.state.seek_filter}
                   game_data={this.state.game_data}
                   />
        <UploadModal />
      </div>
    );
  }
}

export default App;
