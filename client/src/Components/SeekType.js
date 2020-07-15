import React, {Component} from 'react';

class SeekType extends Component {
  constructor(props){
    super(props);
  }


  render() {

    return (
      <div onClick={this.props.clickFn} className="seekPanel__seekType">
          <h5>{this.props.type}</h5>
          <h5>{this.props.player}</h5>
          <h5>{this.props.timestamp}</h5>
      </div>
    );
  }
}

export default SeekType;
