/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import config from './config';
import { AsyncStorage } from 'react-native';
import {Actions} from 'react-native-router-flux';

let status = 0;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password:""
    };
  };

  async componentDidMount(){
    await this.getValue('token');
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
        Actions.StudentDashboard()
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

  login=()=>{
    fetch(config.baseurl+"auth/login/",{
      headers:{'Content-Type':'application/json'},
      method:'post',
      body:JSON.stringify({email:this.state.email,password:this.state.password})
    })
    .then((res)=>{
      status = res.status;
      console.log(res);
      return res.json();
    })
    .then((data)=>{
      if((status === 200 || status === 201)&& data.role === "Student"){
        this.setStringValue('token',data.accessToken);
        this.setStringValue('image',data.image);
        this.setStringValue('name',data.name);
        this.setStringValue('role', data.role);
        Actions.StudentDashboard();
      }
      else{
        alert(data.message || data.email[0]|| "Something went wrong");
      }
     
    }).catch(err=>console.log("Error"+err))
  }

  setStringValue = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch(e) {
      console.log(e)
    }
  
    console.log('Done.')
  }

  setEmail= (e)=>{
    this.setState({email: e.target.value});
  }
    render(){
        return (
        
              <View style={styles.container}>
                <View style={styles.backgroundContainer}>
                  <Image
                    style={styles.bakcgroundImage}
                    source={require('./images/background.jpg')}
                  />
                </View>
                <View style={styles.formContainer}>
                  <Text style={styles.heading}>Welcome to Atlantis</Text>
                  <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    onChangeText={(value) => this.setState({email: value})}
                    value = {this.state.email}
                  />
                  <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    onChangeText={(value) => this.setState({password: value})}
                    value = {this.state.password}
                  />
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.login}>
                    <Text style={styles.submitButtonText}> Login </Text>
                  </TouchableOpacity>
                </View>
              </View>
          );
    }
  
};

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
