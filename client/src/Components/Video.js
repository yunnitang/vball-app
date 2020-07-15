import React, {Component} from 'react';

class Video extends Component {
  constructor(props){
    super(props);

    this.loadVideo = this.loadVideo.bind(this);
    this.seekVideoTo = this.seekVideoTo.bind(this);
    this.loadAPI_and_video = this.loadAPI_and_video.bind(this);

    this.state = {
      player: null
    };

  }

  seekVideoTo(seconds){
    if(this.state.player){
      var player = this.state.player;
    }

    player.seekTo(seconds,true);
  }

  loadVideo(){
    if(this.props.video_id != ""){
      var video_id = this.props.video_id;
      var newPlayer = new window.YT.Player('video__player', {
        videoId: video_id,
        events: {
          'onReady': this.onPlayerReady,
        }
      });

      this.setState({player: newPlayer});
    }
  }

  onPlayerReady(event){
    event.target.seekTo(0,true);
    event.target.playVideo();
  }

  loadAPI_and_video(){
    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else { // If script is already there, load the video directly
      this.loadVideo();
    }
  }

  componentDidMount(){
    this.loadAPI_and_video();
  }

  componentDidUpdate(prev){
    if(prev.video_id != this.props.video_id){
      this.loadAPI_and_video();
    }
  }

  render() {
    // <h1>VIDEO {this.props.game}</h1>
    // <iframe className="video__iframe"
    //     src={this.props.videoURL}
    //     frameborder="0" allowfullscreen />
    return (
      <div className="video">
        <div id="video__player" class="video__player"></div>
      </div>
    );
  }
}

export default Video;
