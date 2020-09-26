import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, View, Title, Card, CardItem, Body,Text,Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import config from './../config';
import {Actions} from 'react-native-router-flux';


let status = 0;
let token = '';

export default class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentWillMount(){
    await this.getValue('token');
    fetch(config.baseurl+'auth/profile',{
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
        this.logout
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
        <Title style={{margin:10}}>Your Profile</Title>
          </Header>
        <View>
            {this.state.personalInfo?(<Card>
                <CardItem>
                  <Body>
                  <Text>Name :- {this.state.personalInfo.name}</Text>
                  <Text>Email :-{this.state.personalInfo.email}</Text>
                  </Body>
                </CardItem>
               <CardItem>
                  <Body>
                    <Image source={{uri: `data:image/jpeg;base64,${this.state.personalInfo.image}`}}  
                    style={{
                      width: 200,
                      height: 200,
                      resizeMode: 'contain'
                    }}
                          />
                          <Text>{`Father Name:- ${this.state.additionalInfo.fathername}`}</Text>
                          <Text>{`Mother Name:- ${this.state.additionalInfo.mothername}`}</Text>
                          <Text>{`DOB:- ${this.state.additionalInfo.dob}`}</Text>
                          <Text>{`Address:- ${this.state.additionalInfo.address1},
                            ${this.state.additionalInfo.address2}, ${this.state.additionalInfo.address3},
                            ${this.state.additionalInfo.city}, ${this.state.additionalInfo.state}
                            ${this.state.additionalInfo.zip}`}
                          </Text>
                          <Text>{`Mobile no :- ${this.state.additionalInfo.mobileno1}`}</Text>
                        </Body>
                </CardItem>
                <CardItem footer>
                  <Button full dark
                  onPress={this.logout}
                  >
                      <Text>Logout</Text>
                  </Button>
                </CardItem>
              </Card>):null}
        </View>
      </Container>
    );
  }
}