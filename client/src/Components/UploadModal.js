import React, {Component} from 'react';

class UploadModal extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="modal fade" id="uploadModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Game</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="/upload" enctype="multipart/form-data" method="POST"> 
              <div className="modal-body">
                  <input type="file" name="dvwFile" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <input type="submit" className="btn btn-primary" value="Save"></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadModal;
