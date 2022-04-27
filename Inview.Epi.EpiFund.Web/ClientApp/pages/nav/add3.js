import React, { Component } from "react";

class Add3 extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            documents: [{ 'Offering Memorandum': 'File Upload' }]
        }
  
        this.back = this.back.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.skipStep = this.skipStep.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }
  
    back() {
        this.props.goback();
    }
  
    nextStep() {
        this.props.gonext(this.state, "add3");
    }
  
    skipStep() {
        this.props.skipstep();
    }
  
    handleFileUpload(files, index, key) {
        let copyState = Object.assign({}, this.state);
        copyState.documents[index][key] = files[0].name;
        this.setState(copyState);
  
        api.uploadFile(files, event.target.getAttribute('data-type'));
    }
    handleDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
    }
  
    handleDrop(event, index, key) {
        event.stopPropagation();
        event.preventDefault();
  
        let copyState = Object.assign({}, this.state);
        copyState.documents[index][key] = event.dataTransfer.files[0].name;
        this.setState(copyState);
  
        api.uploadFile(event.dataTransfer.files, event.target.getAttribute('data-type'));
    }
  
    render() {
        return (
            <div className="modalwrap modal_big animated slideInRight faster">
                <div className="topbar topbar_orange">
                    Add Asset <a>- Step 3</a>
                    <div className="closebutton" onClick={() => this.props.close()}>×</div>
                </div>
                <div className="modal_contentwrap bigpad">
                    <h1 className="h1smallfont">
                        Let us do the work for you! Upload your Asset's Offering Memorandum and we will populate your new Asset File at no charge. We will notify you when it’s ready.
              </h1>
                    <h2 className="h1bigfont">Maximum upload size 25MB per Document</h2>
                    <div className="pad40"></div>
                    <div className="flexwrap_center">
                        {
                            this.state.documents.map((item, index) => {
                                let key = Object.keys(item)[0];
                                return <div key={key} style={{justifySelf: "center"}}>
                                    <h3>{key}</h3>
                                    <div
                                        className="uploadwrap"
                                        draggable="true"
                                        data-type={key}
                                        onDragOver={this.handleDragOver}
                                        onDrop={() => this.handleDrop(index, key)}>
                                        <div>Drag & Drop Files Here</div>
                                        <input className="addclaim_fileinput" type="file" name={key} data-type={key} onChange={(e) => this.handleFileUpload(e.target.files, index, key)} />
                                        <div className="addclaim_filebutton">{this.state.documents[index][key]}</div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="modalfooter">
                        <div>
                        </div>
                        <div className="buttonwrap">
                            <div className="submitbtn submitorange top20 hvr-float-shadow" onClick={this.back}>Back</div>
                            <div className="submitbtn submitgrey top20 hvr-float-shadow" onClick={this.skipStep}>Skip</div>
                            <div className="submitbtn top20 hvr-float-shadow" onClick={this.nextStep}>Next</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  }

export default Add3;