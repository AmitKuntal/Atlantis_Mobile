/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
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
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="white"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.login(this.state.email, this.state.password)}>
            <Text style={styles.submitButtonText}> Login </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
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
    color:'white',
  },
  submitButton: {
    padding: 10,
    margin: 15,
    height: 40,
    borderColor:'white',
    borderWidth:1,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'70%',
  },
  heading: {
    color:'white',
    fontSize:40
  },
  submitButtonText:{
    color:'white',
  },

});
export default App;
