import React, { Component } from 'react';
import './App.css';
import Login from '../Login';
import Chat from '../Chat';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username : '',
            activate : false,
        };
    }

    changeState = (state) => {
        this.setState(state);
    }
  
    render() {
			return (
				<div className = "box">
					<h3>Connexchat</h3>
					{!this.state.activate ? (
							<Login changeState={this.changeState} />
					) : (
							<Chat username={this.state.username} />
					)}
				</div>
			);
    }
}

export default App;