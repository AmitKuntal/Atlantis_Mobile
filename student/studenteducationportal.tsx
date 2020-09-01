import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import { Container, Header, View,Title, Picker, Form, Button, Text, Card, CardItem, Body} from 'native-base';
import { WebView } from 'react-native-webview';
import config from './../config';

export default class StudentEducationPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: "key1",
          showVideos:false
        };
      }
      
      onValueChange(value: string) {
        this.setState({
          selected: value
        });
      }
      
  render() {
    return (
        <Container>
            <Header>
                <Title style={{margin:10}}>Homework</Title>
            </Header>
            <View style={{width:'100%', height:80}}>
            <Form style={{flex:1, flexDirection:'row',justifyContent:'space-between', margin: 10}}>
            <Picker
              note
              mode="dropdown"
              style={{width:"40%"}}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Subject Name" value="key0" />
              <Picker.Item label="Subject 1" value="key1" />
              <Picker.Item label="Subject 2" value="key2" />
              <Picker.Item label="Subject 3" value="key3" />
              <Picker.Item label="Subject 4" value="key4" />
            </Picker>
            <Button
            style={{backgroundColor:'#42b6f5'}}
            onPress={()=>this.setState({showVideos:!this.state.showVideos})}
            >
            <Text>View Videos</Text>
            </Button>
            </Form>
            </View>
            <View style={{flex:1, flexDirection:'column', width:'100%'}}>
            {this.state.showVideos?
           <ScrollView style={{width:"100%" ,height:"95%"}}>
                <Card style={{width:'94%', height:200, marginLeft:"2%",overflow:'hidden'}}>
                    <WebView
                        javaScriptEnabled={true}
                        scrollEnabled={false}
                        allowsFullscreenVideo={true}
                        ignoreSslError={true}
                        source = {{uri:"https://www.youtube.com/embed/cqyziA30whE"}}
                        // source={{html: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}}
                        />                        
                    <Text>
                       Capther 1
                    </Text>
                </Card>
                <Card style={{width:'94%', height:200, marginLeft:"2%",overflow:'hidden'}}>
                    <WebView
                        javaScriptEnabled={true}
                        scrollEnabled={false}
                        allowsFullscreenVideo={true}
                        ignoreSslError={true}
                        source = {{uri:"https://www.youtube.com/embed/cqyziA30whE"}}
                        // source={{html: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}}
                        />                        
                    <Text>
                       Capther 2
                    </Text>
                </Card>
                <Card style={{width:'94%', height:200, marginLeft:"2%",overflow:'hidden'}}>
                    <WebView
                        javaScriptEnabled={true}
                        scrollEnabled={false}
                        allowsFullscreenVideo={true}
                        ignoreSslError={true}
                        source = {{uri:"https://www.youtube.com/embed/cqyziA30whE"}}
                        // source={{html: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}}
                        />                        
                    <Text>
                       Capther 3
                    </Text>
                </Card>
                <Card style={{width:'94%', height:200, marginLeft:"2%",overflow:'hidden'}}>
                    <WebView
                        javaScriptEnabled={true}
                        scrollEnabled={false}
                        allowsFullscreenVideo={true}
                        ignoreSslError={true}
                        source = {{uri:"https://www.youtube.com/embed/cqyziA30whE"}}
                        // source={{html: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}}
                        />                        
                    <Text>
                       Capther 4
                    </Text>
                </Card>
                
           </ScrollView>
            :null} 
            </View>          
        </Container>
    );
  }
}