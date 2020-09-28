import React, { Component } from 'react';
import {TextInput } from 'react-native';
import { Text, View, Button} from 'native-base';


export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ...props,
    };
  }

  render(){
    return(
      <View>
      <TextInput
          underlineColorAndroid="transparent"
          placeholder="Type a message..."
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={(value) => this.state.setMessage(value)}
          value = {this.state.message}
        />
        <Button 
          style={{flex:1, flexDirection:'column' ,width: "48%", height: "98%", alignItems:'center', backgroundColor:'none'}}
          onPress={(e)=>this.state.sendMessage(e)}
          ><Text>Send Message</Text></Button>
    </View>
    )
  }
  
}

