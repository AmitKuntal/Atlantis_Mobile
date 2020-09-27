import React, { Component } from 'react';
import {StyleSheet, Image} from 'react-native';
import { Text, View, Header, Title, Button} from 'native-base';
import {Actions} from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';


let status = 0;
let token = '';
let name = '';

export default class StudentDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount(){
    await this.getValue('token');
    await this.getValue('name');

    fetch(config.baseurl+'auth/check/token',{
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


  removeVaue = async() =>{
    await AsyncStorage.multiRemove(["token","image","name","role"]);
  }

  logout = async ()=>{
    await this.removeVaue();
    Actions.Login()
  }

  getValue = async (key) => {
    try {
      let value = await AsyncStorage.getItem(key);
      if(key === 'token'){
        token = value
      }
      else{
        name = value
      }
      
      return value;
    } catch(e) {
      e
    }
  }
  
  render() {
    return (
      <>
      <Header>
        <Title style={{margin:10}}>{`Welcome ${name}`}</Title>
      </Header>
      <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
          <Button 
            style={{flex:1, flexDirection:'column' ,width: "48%", height: "98%", alignItems:'center', backgroundColor:'none'}}
            onPress={()=>Actions.StudentEducationPortal()}
            >
          <Image
            style={{width:"100%", height:"80%",resizeMode:"contain"}}
            source={require('./../images/educationportal.png')}
          />
          <Text style={{textAlign: 'center', fontSize:14, color:'black'}}>Education Portal</Text>
          </Button>
          <Button 
          style={{flex:1, flexDirection:'column' ,width: "48%", height: "98%", alignItems:'center', backgroundColor:'none'}}
          onPress={()=>Actions.StudentHomework()}
          >   
          <Image
              style={{width:"90%", height:"90%", resizeMode:'contain'}}
              source={require('./../images/homework.png')}
            />
          <Text style={{textAlign: 'center', fontSize:14, color:'black'}}>Home work</Text>
        </Button>
      </View>
      <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
      <Button 
      style={{flex:1, flexDirection:'column' ,width: "48%", height: "98%", alignItems:'center', backgroundColor:'none'}}
      onPress={()=>Actions.TestDashboard()}
      >
            <Image
              style={{width:"90%", height:"90%", resizeMode:'contain'}}
              source={require('./../images/test.png')}
            />
          <Text style={{textAlign: 'center', fontSize:14, color:'black'}}>Exam Portal</Text>
        </Button>
        <Button 
        style={{flex:1, flexDirection:'column' ,width: "48%", height: "98%", alignItems:'center', backgroundColor:'none'}}
        onPress={()=>Actions.LiveClass()}
        >
          <Image
              style={{width:"90%", height:"90%", resizeMode:'contain'}}
              source={require('./../images/liveclass.png')}
            />
          <Text style={{textAlign: 'center', fontSize:14, color:'black'}}>Live Class</Text>
        </Button>
      </View>
      <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
      <Button 
      style={{flex:1, flexDirection:'column' ,width: "48%", height: "98%", alignItems:'center', backgroundColor:'none'}}
      onPress={()=>Actions.StudentAttendance()}
      >
            <Image
              style={{width:"90%", height:"90%", resizeMode:'contain'}}
              source={require('./../images/attendance.jpg')}
            />
          <Text style={{textAlign: 'center', fontSize:14, color:'black'}}>Attendance</Text>
        </Button>
        <Button 
        style={{flex:1, flexDirection:'column' ,width: "48%", height: "98%", alignItems:'center', backgroundColor:'none'}}
        onPress={()=>Actions.StudentProfile()}
        >
          <Image
              style={{width:"90%", height:"90%", resizeMode:'contain'}}
              source={require('./../images/profile.png')}
            />
          <Text style={{textAlign: 'center', fontSize:14, color:'black'}}>Profile</Text>
        </Button>
      </View>
    </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  bakcgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  input: {
    margin: 15,
    height: 50,
    width: '100%',
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
  },
  submitButton: {
    padding: 10,
    margin: 15,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  heading: {
    color: 'white',
    fontSize: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});
