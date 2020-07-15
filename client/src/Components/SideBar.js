import React, {Component} from 'react';

class SideBar extends Component {
  constructor(props){
    super(props);

    this.handleGameChange = this.handleGameChange.bind(this);

    this.state = {
      game_list: []
    };
  }

  handleGameChange(game){
    this.props.changeGame(game);
  }

  componentDidMount(){
    var that = this;
    fetch("/api/games")
    .then(res => res.json())
    .then(function(data){
      that.setState({game_list: data});
    });

    window.addEventListener("mousemove",function(event){
      if(event.clientX < 10){
        document.getElementsByClassName("sideBar")[0].classList.add("sideBar--visible");
      } else if(event.clientX > 200){
        document.getElementsByClassName("sideBar")[0].classList.remove("sideBar--visible");
      }
    })
  }

  render() {
    const GameList = [];

    if(this.state.game_list !== undefined){
      var that = this;
      this.state.game_list.forEach(function(game){
        GameList.push(<li key={game} onClick={that.handleGameChange.bind(that,game)}>{game}</li>)
      });
    }

    return (
      <div className="sideBar">
      	<h1>Games</h1>
      	<ul>
      		{GameList}
      	</ul>

      	<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#uploadModal">
	  		Add Game
		    </button>
      </div>
    );
  }
}

export default SideBar;
