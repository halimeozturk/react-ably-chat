import React, { Component } from 'react';

class Chat extends Component{
    constructor(props) {
        super(props);

        this.state={
            items: [],
            body:'',
        };
    
        const realtime = new window.Ably.Realtime({
            key: '', //Ably key
            clientId: props.username
        });

        this.channel = realtime.channels.get("chat");
        
        this.channel.presence.enter();

        this.channel.subscribe((msg) => {
            console.log(msg)
            this.setState({
                items: this.state.items.concat(msg.data),
          });
        });

        this.channel.presence.subscribe('enter', (member) => {
            this.setState({
                items: this.state.items.concat({
                    'username': member.clientId, 'body': 'Logged in', created_at: new Date() })
            });
        });

        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
    }

    handleMessageChange(e) {
        this.setState({
            body: e.target.value 
        });
    }

    handleMessageSubmit(e) {
        e.preventDefault();
        if (!this.state.body.length) {
          return;
        }
        const newItem = {
            username: this.props.username,
            body: this.state.body,
            created_at: new Date(),
        };    
        this.channel.publish('message', newItem);
        
        this.setState({
          body: ''
        });
      }

    render(){
        return (
         <div>
        <form onSubmit={this.handleMessageSubmit}>
            <div className="row">
                <div className="col-sm-8">
              <input
                id="new-message"
                className="form-control"
                onChange={this.handleMessageChange}
                value={this.state.body}
                placeholder= 'Mesajınız'
              />
            <div className="col-sm-4">
            </div>
                <button className="btn btn-primary">Gönder</button>
            </div>
            </div>
        </form>
       
        <div className='col-sm-12'>
        {this.state.items.map(item => (
          <div key={item.created_at + item.username} className="row message-item">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-10 text-left">
                  <b>{item.username}:</b>
                </div>
                <div className="col-sm-2 text-right">
                  <small>{ item.created_at.toString() }</small>
                </div>
              </div>
            </div>
            <div className="col-sm-12 text-left">
            { item.body }
            </div>
          </div>
        ))}
      </div>
      </div>
       );
    }
    
}
export default Chat;