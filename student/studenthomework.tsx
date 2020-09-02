import React, { Component } from 'react';
import { Image,ScrollView } from 'react-native';
import { Container, Header, Card, CardItem, Text, Body, Title } from 'native-base';
import { AsyncStorage } from 'react-native';
import config from './../config';

let status = 0;
let token = '';

export default class StudentHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };
  
  async componentDidMount(){
    await this.getValue('token');
    fetch(config.baseurl+'student/homework',{
      method:'get',
      headers:{
        'auth':token
      }
    }).then(res =>{
      status = res.status
      return res.json();
    }).then(data =>{
      if(status === 200 || status === 201){
        this.setState({homework: data})
      }
      else{
        console.log("Error"+ data.message);
      }
    }).catch(er=> console.log(er));
  }

  getValue = async (key) => {
    try {
      let value = await AsyncStorage.getItem(key);
      token =value;
      return value;
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    return (
      <Container>
        <Header>
        <Title style={{margin:10}}>Homework</Title>
          </Header>
        <ScrollView>
          {this.state.homework?this.state.homework.map((homework,index)=>{
            return(
              <Card>
                <CardItem header>
                  <Text>Date - {homework.homeworkdate}</Text>
                </CardItem>
                {homework.image?<CardItem>
                  <Body>
                    <Image source={{uri: `data:image/jpeg;base64,${homework.image}`}}  
                    style={{
                      width: "100%",
                      height: 300,
                      resizeMode: 'contain'
                    }}
                          />
                  </Body>
                </CardItem>:null}
               {homework.homework?
                <CardItem footer>
                  <Text>{homework.homework}</Text>
                </CardItem>
               :null} 
              </Card>
            )
          })
          :<Text>Home work not found</Text>}
              
        </ScrollView>
      </Container>
    );
  }
}