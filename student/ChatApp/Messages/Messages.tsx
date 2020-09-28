import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import Message from './Message/Message';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ...props
    };
  }

  render(){
    return(
      <ScrollView>
        {this.state.messages.map((message, i) => <div key={i}><Message message={message} name={this.state.name}/></div>)}
      </ScrollView>
    )
  }
}