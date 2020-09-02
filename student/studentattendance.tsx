import React, { Component } from 'react';
import { Container, Header, View,Title, DatePicker, Form, Button, Text, ListItem, Left, Right, Radio} from 'native-base';
import { AsyncStorage } from 'react-native';
import {ScrollView} from 'react-native';

import config from './../config';

let status = 0;

export default class StudentAttendance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fromDate: "",
      toDate:""
    };
  };

  componentDidMount(){
    this.getValue('token').then(value=>this.setState({token:value}))
    
  }
 
  setFromDate= (date)=>{
    let d  = new Date(date);
    let month = d.getMonth() + 1;
    this.setState({fromDate: d.getFullYear()+"-"+month+"-"+d.getDate()})
  }

  setToDate =(date)=>{
    let d  = new Date(date);
    let month = d.getMonth() + 1;
    this.setState({toDate: d.getFullYear()+"-"+month+"-"+d.getDate()})
  }

  showAttendance=()=>{
    let options = {
      method:'post',
      headers:{
        'auth':this.state.token,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({fromDate:this.state.fromDate, toDate: this.state.toDate})
    }
    console.log(options)
    fetch(config.baseurl+"attendance/student/self",options).then(res=>{
      status = res.status;
      return res.json();
    }).then(data=>{
      if(status ===200|| status === 201){
        this.setState({data:data.attendancedata});
      }
      else{
        console.log("Error ->" + JSON.stringify(data))
      }
    }).catch(err=> console.log("Error occur =>"+ err));
  }

  getValue = async (key) => {
    try {
      let value = await AsyncStorage.getItem(key);
      console.log(key+"-"+value)
      return value;
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    console.log(this.state);
    return (
      <Container>
        <Header>
        <Title style={{margin:10}}>Attendance</Title>
          </Header>
        <View style={{width:'100%', height:80}}>
        <Form style={{flex:1, flexDirection:'row',justifyContent:'space-between', margin: 10}}>
        <DatePicker
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"spinner"}
            placeHolderText="From"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setFromDate}
            disabled={false}
            />
            <DatePicker
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"slide"}
            androidMode={"spinner"}
            placeHolderText="To"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setToDate}
            disabled={false}
            />
            <Button
            style={{backgroundColor:'#42b6f5'}}
            onPress={this.showAttendance}
            >
            <Text>Show</Text>
            </Button>
            </Form>
        </View>
        {this.state.data?
        <View style={{flex:1, flexDirection:'column', width:'100%'}}>
          <ScrollView style={{width:"100%" ,height:"95%"}}>
          <ListItem style={{flex:1, flexDirection:'row', width:'100%', marginRight:"20%"}} >
                <Left>
                    <Text style={{color:"black"}}>Date</Text>
                </Left>
                <Right>
                  <Text>Status</Text>
                </Right>
            </ListItem>
            {this.state.data.map((attendance, index)=>{
             return (<ListItem style={{flex:1, flexDirection:'row', width:'100%', marginRight:"20%"}} key={index}>
                <Left>
                    <Text style={{color:"black"}}>{attendance.attendancedate}</Text>
                </Left>
                <Right>
                  <Text>{attendance.status}</Text>
                </Right>
            </ListItem>)
            })}
          </ScrollView>
        </View>
        :null}
      </Container>
    );
  }
}