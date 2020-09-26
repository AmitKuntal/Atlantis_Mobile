import React, { Component } from 'react';
import {TextInput } from 'react-native';
import { Container, ListItem, CheckBox, Card, CardItem, Body,Text,Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import config from './../config';
import {Actions} from 'react-native-router-flux';


let status = 0;
let token = '';

export default class SubmitQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ...props,
        submission:""
    };
  }

  async componentWillMount(){
    await this.getValue('token');
  }

  submitQuestion=(submissionUser)=>{
      console.log(submissionUser)
    fetch(config.baseurl+'student/question',{
      method:'post',
      headers:{
        'auth':token,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:this.state.id, answer:submissionUser})
    })
    .then(res =>{
      status = res.status;
      return res.json();
    }).then(data=>{
      if(status ===200 || status === 201){
        this.setState({submission:submissionUser})
      }
      else{
        alert(data.message)
      }
    }).catch(er=>(er));
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
        <Card>
            <CardItem header bordered>
                <Text>Q. {this.state.question}</Text>
            </CardItem>
            <CardItem bordered>
            {this.state.questiontype === "Objective" ?
            <Body>
             <ListItem>
            <CheckBox checked={this.state.submission===this.state.option1} color="green" onPress={()=>this.submitQuestion(this.state.option1)} />
              <Text>{this.state.option1}</Text>
          </ListItem>
          <ListItem>
            <CheckBox checked={this.state.submission===this.state.option2} color="green"  onPress={()=>this.submitQuestion(this.state.option2)} />
              <Text>{this.state.option2}</Text>
          </ListItem>
          <ListItem>
            <CheckBox checked={this.state.submission===this.state.option3} color="green"  onPress={()=>this.submitQuestion(this.state.option3)} />
            <Text>{this.state.option3}</Text>
          </ListItem>
          <ListItem>
            <CheckBox checked={this.state.submission===this.state.option4} color="green"  onPress={()=>this.submitQuestion(this.state.option4)} />
             <Text>{this.state.option4}}</Text>
          </ListItem>
                </Body>:<Body>
                    <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Answer"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    onChangeText={(value) => this.setState({submission: value})}
                    value = {this.state.submission}
                    numberOfLines={4}
                    multiline={true}
                    />
                    <Button full success style={{width:"100%"}} onPress={()=>this.submitQuestion(this.state.submission)}>
                        <Text>Save Answer</Text>
                    </Button>
                    </Body>}
            </CardItem>
        </Card>
      </Container>
    );
  }
}