import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(){
    super();
    this.state = {
      content:'',
      error:'',
      visible: {
        compose:true
      }
    }

    this.changeContent = this.changeContent.bind(this); 
    this.Submit = this.Submit.bind(this);
    this.changeusername = this.changeusername.bind(this);
  }
  
  changeContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  changeusername(event) {
    this.setState({
      username: event.target.value
    })
  }

  Submit(event){
    if(event.key === 'Enter'){
      console.log("submitting...");
      const content = this.state.content;
      let username = null;
      if(this.state.username === undefined || this.state.username === null || this.state.username === ""){
         username = 'Anonymous';
      }
      else {
         username = this.state.username;
      }

      this.props.onNewMessage(username, content);
      this.setState({content: ""});
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
          <input 
            className="chatbar-username" 
            placeholder="Your Name (Optional)" 
            value={this.state.username} 
            onKeyPress={this.Submit}
            onChange={this.changeusername}
            />
          
          <input 
            value={this.state.content}
            onChange={this.changeContent}
            onKeyPress={this.Submit}
            className="chatbar-message" 
            placeholder="Type a message and hit ENTER" 
          />
      </footer>
      
    );
  };
}
export default ChatBar;
