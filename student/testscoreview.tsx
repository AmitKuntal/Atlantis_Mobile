import React, { Component } from 'react';
import { Container, Card, CardItem, Body,Text,Button } from 'native-base';
import config from './../config';
import {Actions} from 'react-native-router-flux';

export default class TestScoreView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ...props
    };
  }
  
  render() {
     return (
      <Container>
        
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
            <Text>Scored Marks : {this.state.result}</Text>
            </CardItem>
        </Card>
      </Container>
    );
  }
}