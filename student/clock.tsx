import React, { Component } from 'react';
import { Container } from 'native-base';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ...props
    };
  }



    componentDidMount(){
        this.interval = setInterval(
          () => this.setState((prevState)=> ({ seconds: prevState.seconds - 1 })),
          1000
        );
      }
      
      componentDidUpdate(){
        if(this.state.minutes === 0 && this.state.seconds ===0){ 
          clearInterval(this.interval);
        }
      }
      
      componentWillUnmount(){
       clearInterval(this.interval);
      }

      submitTest(){
        alert("Time Up")
        this.state.submitTest()
        Actions.TestDashboard()
      }

 
  render() {
    (this.state.seconds===0 && this.state.minutes ===0)?this.submitTest(): (this.state.seconds ===0 ? this.setState({minutes: this.state.minutes-1, seconds: 60}):null)

    return (
       <View>
        <Text>Time Remaining {this.state.minutes} : {this.state.seconds}</Text>
        </View>
    );
  }
}   