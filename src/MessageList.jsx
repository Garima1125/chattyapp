import React, {Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {

  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages;
    var rows = [];
    for (var i = 0; i < messages.length; i++) {
      rows.push(<Message key={messages[i].id} message={messages[i]} />)
    }
    return (
      <div>
        <div>{rows}</div>
          <div className="message system">
            {this.props.content}
          </div>
        </div>
    );
  }
}
export default MessageList;
