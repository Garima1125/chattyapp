import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    return (
    <main className="messages">
     <div className="message">
      <span className="message-username">{this.props.message.username}</span>
      <span className="message-content">{this.props.message.content}</span>
     </div>
  </main>
    );
  }
}
export default Message;

