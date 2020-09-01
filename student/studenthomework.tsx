import React, { Component } from 'react';
import { Image,ScrollView } from 'react-native';
import { Container, Header, Card, CardItem, Text, Body, Title } from 'native-base';
const cards = {
    text: 'Card One',
    name: 'One',
    image: require('./component/background.jpg'),
  };
export default class StudentHomework extends Component {
  render() {
    return (
      <Container>
        <Header>
        <Title style={{margin:10}}>Homework</Title>
          </Header>
        <ScrollView>
              <Card>
                <CardItem header>
                  <Text>Date - 12/12/2020</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Image source = {cards.image} 
                    style={{width:"100%"}}
                          />
                  </Body>
                </CardItem>
                <CardItem footer button onPress={() => alert("This is Card Footer")}>
                  <Text>Text Homework</Text>
                </CardItem>
              </Card>
              <Card>
                <CardItem header>
                  <Text>Date - 12/12/2020</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Image source = {cards.image} 
                    style={{width:"100%"}}
                          />
                  </Body>
                </CardItem>
                <CardItem footer button onPress={() => alert("This is Card Footer")}>
                  <Text>Text Homework</Text>
                </CardItem>
              </Card>
              <Card>
                <CardItem header>
                  <Text>Date - 12/12/2020</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Image source = {cards.image} 
                    style={{width:"100%"}}
                          />
                  </Body>
                </CardItem>
                <CardItem footer button onPress={() => alert("This is Card Footer")}>
                  <Text>Text Homework</Text>
                </CardItem>
              </Card>
          
        </ScrollView>
      </Container>
    );
  }
}