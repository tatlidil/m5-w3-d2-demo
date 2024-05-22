import React from "react";

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        alldata: [],
        singledata: {
          title: "",
          author: ""
        }
      };
    }
    render() {
      return (
        <div className="container">
          <span className="title-bar">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.getLists}
            >
              Get Lists
            </button>
          </span>
        </div>
      );
    }
    
  }

export default App;