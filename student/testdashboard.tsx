import React, { Component } from 'react';
import {StyleSheet, Image} from 'react-native';
import { Container, Header, View,Title, DatePicker, Form, Button, Text, ListItem, Left, Right, Radio} from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class TestDashboard extends Component {

  constructor(props) {
    super(props);
  };


  render() {
    return (
      <Container>
        <Header>
        <Title style={{margin:10}}>Test Dashboard</Title>
          </Header>
          <View style={{flex: 1, flexDirection: 'column', justifyContent:'space-between'}}>
          <Button 
            style={{flex:1, flexDirection:'column' ,width: "100%", height: "98%", alignItems:'center', backgroundColor:'none'}}
            onPress={()=>Actions.Tests()}
            >
          <Image
            style={{width:"100%", height:"80%",resizeMode:"contain"}}
            source={require('./../images/taketest.png')}
          />
          <Text style={{textAlign: 'center', fontSize:14, color:'black'}}>Take Test</Text>
          </Button>
          <Button 
          style={{flex:1, flexDirection:'column' ,width: "100%", height: "98%", alignItems:'center', backgroundColor:'none'}}
          onPress={()=>Actions.ViewScore()}
          >   
          <Image
              style={{width:"90%", height:"90%", resizeMode:'contain'}}
              source={require('./../images/testresult.png')}
            />
          <Text style={{textAlign: 'center', fontSize:14, color:'black'}}>View Result</Text>
        </Button>
      </View>
      </Container>
    );
  }
}