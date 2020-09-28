import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { Container, Header, Icon, Title, Card, CardItem, Body,Text,Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import config from '../config';
import {Actions} from 'react-native-router-flux';
import TakeTest from './taketest';
import TestScoreView from './testscoreview';


let status = 0;
let token = '';

export default class ViewScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentWillMount(){
    await this.getValue('token');
    fetch(config.baseurl+'student/get/test/scores',{
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
    return (
      <Container>
        <Header>
        <Title style={{margin:10}}>View Tests Score</Title>
          </Header>
        <ScrollView style={{width:"100%" ,height:"95%"}}>
            {this.state.tests?this.state.tests.map((test,index)=>{
                return (<TestScoreView {...test} key={index}/>)
            }):null}
        </ScrollView>
      </Container>
    );
  }
}