import React, {FC, useState, useEffect } from "react";
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import { View, Text } from "native-base";

interface IProps {
  name: string
  room: string
}

const ENDPOINT = 'https://atlantischat.herokuapp.com/';

let socket;

const Chat: FC<IProps & Chat.defaultProps> = ({ name, room }: IProps) => {
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    socket = io(ENDPOINT);
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });// eslint-disable-next-line
  }, [ENDPOINT, '?name='+name+'&room='+room]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <View className="outerContainer">
      <View className="container1">
          {/* <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
      </View>
    </View>
  );
}

Chat.defaultProps = {
  name: '',
  room: '',
}

export default Chat;
