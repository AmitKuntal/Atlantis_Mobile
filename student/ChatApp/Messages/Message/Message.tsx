import React, { Component } from 'react';
import { View, Text } from 'react-native';

var isSentByCurrentUser = false;

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ...props
    };
  }



  render(){
    var trimmedName = this.state.name.trim().toLowerCase();

    if(this.state.message.user === trimmedName) {
      isSentByCurrentUser = true;
    }
    
  return (
    isSentByCurrentUser
      ? (
        <View>
          <Text>{trimmedName}</Text>
          <View>
            <Text>{this.state.message.text}</Text>
          </View>
        </View>
        )
        : (
          <View>
            <View>
              <Text>{this.state.message.text}</Text>
            </View>
            <Text>{this.state.message.user}</Text>
          </View>
        )
  );
}
}

