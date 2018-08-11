import './Login.css';

import React, { Component } from 'react';

class Login extends Component{
    constructor(props){
        super(props);
        
        this.handleUsername=this.handleUsername.bind(this);
        this.login = this.login.bind(this);
        
        this.state={
          username:'',
        };
    }

    handleUsername(e) {
      this.setState({
        username: e.target.value,
      });
    }

    login = () => {
      if (!this.state.username) {
        return
      };
      const updated_state = {
        activate: true,
        username:this.state.username
        
      };
      this.props.changeState(updated_state);
      }
    

    render(){
      return(
        <form onSubmit={this.handleUsername}>
       
          <div className="row">
            <div className="col-sm-12">
              <input
                className=""
                placeholder="Kullanıcı Adı:"
                id="username-input"
                onChange={this.handleUsername}
              />
              <button className="submit" onClick={this.login}> Save </button>
            </div>
          </div>
        </form>

      )
            
        
    }








}
export default Login;