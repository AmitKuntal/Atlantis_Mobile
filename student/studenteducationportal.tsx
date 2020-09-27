import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import { Container, Header, View,Title, Picker, Form, Button, Text, Card, CardItem, Body} from 'native-base';
import { WebView } from 'react-native-webview';
import { AsyncStorage } from 'react-native';
import config from './../config';
import {Actions} from 'react-native-router-flux';


let status = 0;
let status1 = 0;
let token = '';

export default class StudentEducationPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

      async componentWillMount(){
        await this.getValue('token');
        fetch(config.baseurl+'student/subject',{
          method:'get',
          headers:{
            'auth':token
          }
        }).then(res =>{
          status = res.status
          return res.json();
        }).then(data =>{
          if(status === 200 || status === 201){
            this.setState({subjects: data})
          }
          
        }).catch(er=> (er));
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
      
      onValueChange(value) {
        this.setState({
          selected: value
        });
      }

      getVideos=()=>{
        fetch(config.baseurl+'school/get/subject/video',{
          method:'post',
          headers:{
            'auth':token,
            'Content-Type':'application/json'
          },
          body:JSON.stringify({subjectid:this.state.selected})
        })
        .then(res =>{
          status1 = res.status;
          return res.json();
        }).then(data=>{
          if(status1 ===200 || status1 === 201){
            this.setState({videos:data})
          }
          else{
            this.logout
          }
        }).catch(er=>(er));
      }

      removeVaue = async() =>{
        await AsyncStorage.multiRemove(["token","image","name","role"]);
      }
    
      logout = async ()=>{
        await this.removeVaue();
        Actions.Login()
      }
      
  render() {

    return (
        <Container>
            <Header>
                <Title style={{margin:10}}>Education Portal</Title>
            </Header>
            <View style={{width:'100%', height:80}}>
            {this.state.subjects?
            (
              <Form style={{flex:1, flexDirection:'row',justifyContent:'space-between', margin: 10}}>
            <Picker
              note
              mode="dropdown"
              style={{width:"40%"}}
              onValueChange={this.onValueChange.bind(this)}
              selectedValue={this.state.selected ? this.state.selected :""}
            >
               <Picker.Item label="Select Subject" value="Subject" />
              {this.state.subjects.map((subject,index)=>{
                return(
                        <Picker.Item label={subject.subjectname} value={subject.id} key={index} />
                )
              })}
            </Picker>
            {this.state.selected?(<Button
            style={{backgroundColor:'#42b6f5'}}
            onPress={this.getVideos}
            >
            <Text>View Videos</Text>
            </Button>):null}
            
            </Form>
            ):null}
            
            </View>
            <View style={{flex:1, flexDirection:'column', width:'100%'}}>
            {this.state.videos?
           <ScrollView style={{width:"100%" ,height:"95%"}}>
             {this.state.videos.map((video,index)=>{
               return(
                <Card style={{width:'94%', height:200, marginLeft:"2%",overflow:'hidden'}}>
                <WebView
                    javaScriptEnabled={true}
                    scrollEnabled={false}
                    allowsFullscreenVideo={true}
                    ignoreSslError={true}
                    source = {{uri:video.videolink}}
                    
                    />                        
                <Text>
                   {video.chaptername}
                </Text>
            </Card>
               )
             })}
                
           </ScrollView>
            :null} 
            </View>          
        </Container>
    );
  }
}