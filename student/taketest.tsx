import React, { Component } from 'react';
import { Container, Card, CardItem, Body,Text,Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import config from './../config';
import {Actions} from 'react-native-router-flux';
import SubmitQuestion from './submitquestion';


let status = 0;
let token = '';

export default class TakeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ...props
    };
  }

  async componentWillMount(){
    await this.getValue('token');
  }

  getQuestion=()=>{
    fetch(config.baseurl+'testapp/tests/question',{
      method:'put',
      headers:{
        'auth':token,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({testid:this.state.id})
    })
    .then(res =>{
      return res.json();
    }).then(data=>{
        this.setState({questions:data, taketest: true,index:0, lastIndex:data.length})
     
    }).catch(er=>(er));
  }

  submitTest=()=>{
      fetch(config.baseurl+'student/test/submit',{
          method:"post",
          headers:{
              'Content-Type':'application/json',
              'auth':token
          },
          body: JSON.stringify({testid:this.state.id})
      }).then(res=>res.json())
      .then(data=>{
          alert(data.message);
          this.setState({taketest:false})
      })
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
        {this.state.taketest?
        <>
        {this.state.questions.map((question,index)=><SubmitQuestion {...question} key={index}/>)}
            
            <Button full success style={{width:"100%"}} onPress={this.submitTest}>
                <Text>Submit Exam</Text>
            </Button>
        </> :
        <Card>
            <CardItem header bordered>
                <Text>Test Name :- {this.state.testname}</Text>
            </CardItem>
            <CardItem bordered>
                <Body>
                    <Text>
                        Duration {this.state.duration} Minutes
                    </Text>
                    <Text>
                        Expire on {this.state.expiredate}
                    </Text>
                </Body>
            </CardItem>
            <CardItem footer bordered>
            <Button full success style={{width:"100%"}} onPress={this.getQuestion}>
                <Text>Take Test</Text>
            </Button>
            </CardItem>
        </Card>}
      </Container>
    );
  }
}