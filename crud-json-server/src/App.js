import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

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

    getLists = () => {
        this.setState({ loading: true });
        fetch("http://localhost:5000/posts")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    loading: false,
                    alldata: result
                });
            })
            .catch(console.log);
    };

    handleChange = (e) => {
        this.setState({
            singledata: {
                ...this.state.singledata,
                [e.target.name]: e.target.value
            }
        });
    };

    handleCreate = () => {
        const { singledata } = this.state;
        fetch("http://localhost:5000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(singledata)
        })
            .then(() => {
                this.setState({ singledata: { title: "", author: "" } });
                this.getLists();
            })
            .catch(console.log);
    };

    render() {
        const listTable = this.state.loading ? (
            <span>Loading Data......Please be patient.</span>
        ) : (
            <Lists alldata={this.state.alldata} />
        );

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
                <CreateList
                    singledata={this.state.singledata}
                    handleChange={this.handleChange}
                    handleCreate={this.handleCreate}
                />
                {listTable}
            </div>
        );
    }
}

export default App;
