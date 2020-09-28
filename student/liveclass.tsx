import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import { Container, Header, View,Title, Picker, Form, Button, Text, Card, CardItem, Body} from 'native-base';
import { WebView } from 'react-native-webview';
import { AsyncStorage } from 'react-native';
import config from './../config';
import {Actions} from 'react-native-router-flux';
import Chat from './ChatApp/Chat/Chat'


let status = 0;
let status1 = 0;
let token = '';

export default class StudentEducationPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

      async componentWillMount(){
        await this.getValue('token');
        fetch(config.baseurl+'school/live/class',{
          method:'get',
          headers:{
            'auth':token
          }
        }).then(res =>{
          status = res.status
          return res.json();
        }).then(data =>{
          if(status === 200 || status === 201){
            this.setState({...data})
          }
          else{
              alert(data.message)
          }
        }).catch(er=> (er));
      }
    
      getValue = async (key) => {
        try {
          let value = await AsyncStorage.getItem(key);
          token =value;
          return value;
        } catch(e) {
          (e)
        }
      }
      

      removeVaue = async() =>{
        await AsyncStorage.multiRemove(["token","image","name","role"]);
      }
    
      logout = async ()=>{
        await this.removeVaue();
        Actions.Login()
      }
      
  render() {
      console.log(this.state)
    return (
        <Container>
            <Header>
                <Title style={{margin:10}}>Live Class</Title>
            </Header>
            <View style={{width:'100%', height:"80%"}}>
            {this.state.link?
            <>
                <WebView
                    javaScriptEnabled={true}
                    scrollEnabled={false}
                    allowsFullscreenVideo={true}
                    ignoreSslError={true}
                    source = {{uri:this.state.link}}
                    />   
                    <Chat name={this.state.email} room={this.state.roomid}/>
                    </>                    
                :null}
            </View>          
        </Container>
    );
  }
}