import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { Container, Header, Icon, Title, Card, CardItem, Body,Text,Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import config from './../config';
import {Actions} from 'react-native-router-flux';
import TakeTest from './taketest';


let status = 0;
let token = '';

export default class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentWillMount(){
    await this.getValue('token');
    fetch(config.baseurl+'student/test/',{
      method:'get',
      headers:{
        'auth':token
      }
    }).then(res =>{
      status = res.status
      return res.json();
    }).then(data =>{
      if(status === 200 || status === 201){
        this.setState({tests:data})
      }
      else{
        alert(data)
      }
    }).catch(er=> (er));
  }

  removeTest=(testId)=>{
   this.setState({tests:this.state.tests.filter(function( obj ) {
      return obj.id !== testId;
    })})
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
    return (
      <Container>
        <Header>
        <Title style={{margin:10}}>Tests</Title>
          </Header>
           {this.state.tests?this.state.tests.map((test,index)=>{
                return (<TakeTest {...test} key={index} removeTest = {this.removeTest}/>)
            }):null}
      </Container>
    );
  }
}