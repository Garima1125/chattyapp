import React, {Component} from 'react';
import ChatBar  from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
// import WebSocket from 'ws';

class App extends Component {
  constructor(props){
    super(props);
    this.setMessages=this.setMessages.bind(this);
    this.state = {
      lastusername: undefined,
      activeUserCount: 0,
      //currentUser: {username: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
}

    setMessages(username, new_content) {
      const data = {type: 'postMessage', username: username, content: new_content};
      this.webSocket.send(JSON.stringify(data));
      
      if(username !== this.state.lastusername && this.state.lastusername !== undefined){
       const content = `${this.state.lastusername} changed their name to ${username}.`;
       const data = {type: 'postNotification', username: username, content: content};
       this.webSocket.send(JSON.stringify(data)); 
      }
      this.setState({lastusername : username});
    }

    componentDidMount() {
      this.webSocket = new WebSocket("ws://localhost:3001");
      
      console.log("componentDidMount <App />");
      this.webSocket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);

        if(newMessage['type']=== 'incomingMessage'){
        const messages = this.state.messages.concat(newMessage);
        this.setState({messages: messages});
        } else if(newMessage['type']=== 'incomingNotification'){
          const content = newMessage.content;
          this.setState({content: content});
        } else if(newMessage['type'] === 'userConnection') {
          const activeUsers = newMessage.activeUsers;
          this.setState({activeUserCount: activeUsers});
        } else if(newMessage['type'] === 'userDisConnection') {
          const activeUsers = this.state.activeUserCount - 1;
          this.setState({activeUserCount: activeUsers});
        } else {
           throw new Error("Unknown event type " + data.type);
        }
      };
     }

  render() {
  console.log("Rendering <App/>");
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty App</a>
        <div id="user-count">{this.state.activeUserCount} users online</div>
      </nav>
      <ChatBar onNewMessage={this.setMessages}/>
      <MessageList messages={this.state.messages} content={this.state.content} />
      </div>
    );
  }
}
export default App;
