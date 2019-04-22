import React from 'react';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Sae } from 'react-native-textinput-effects';

import { createStackNavigator } from 'react-navigation'; 

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  TouchableHighlight
} from 'react-native';


export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.getStartedText}>Create new account</Text>
         <View style={styles.inputs}>
           <Sae
            label={'Email'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'#fff'}
            
            autoCapitalize={'none'}
            inputStyle={{ color: '#000', fontWeight: '400', letterSpacing: 1.6}}
            labelStyle={{ color: '#D0D3D8', fontWeight: '400', letterSpacing: 1.6}}
            autoCorrect={false}
            iconSize={7}
            activeColor={'#000'}
            passiveColor={'#D0D3D8'}

            onChangeText={(value) => this.props.onChangeEmail({email: value})}

            value={this.props.data.email}
          />

          <Sae
            label={'Username'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'#fff'}
            
            autoCapitalize={'none'}
            inputStyle={{ color: '#000', fontWeight: '400', letterSpacing: 1.6}}
            labelStyle={{ color: '#D0D3D8', fontWeight: '400', letterSpacing: 1.6}}
            autoCorrect={false}
            iconSize={7}
            activeColor={'#000'}
            passiveColor={'#D0D3D8'}

            onChangeText={(value) => this.props.onChangeUsername({username: value})}

            value={this.props.data.username}

          />

          <Sae
            label={'Password'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'#fff'}
            
            autoCapitalize={'none'}
            inputStyle={{ color: '#000', fontWeight: '400', letterSpacing: 1.6, marginTop: 50}}
            labelStyle={{ color: '#D0D3D8', fontWeight: '400', letterSpacing: 1.6}}
            autoCorrect={false}
            iconSize={7}
            activeColor={'#000'}
            passiveColor={'#D0D3D8'}
            secureTextEntry={true}

            onChangeText={(value) => this.props.onChangePassword({password: value})}

            value={this.props.data.password}

          />

          <Sae
            label={'Confirm password'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'#fff'}
            
            autoCapitalize={'none'}
            inputStyle={{ color: '#000', fontWeight: '400', letterSpacing: 1.6}}
            labelStyle={{ color: '#D0D3D8', fontWeight: '400', letterSpacing: 1.6}}
            autoCorrect={false}
            iconSize={7}
            activeColor={'#000'}
            passiveColor={'#D0D3D8'}
            secureTextEntry={true}

            onChangeText={(value) => this.props.onChangeConfirmPassword({confirmPassword: value})}

            value={this.props.data.confirmPassword}

          />
        </View>

          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.signUp()}>
            <Text style={styles.buttonStyle}>Create</Text>
          </TouchableHighlight>

          <View style={styles.info}>
            <Text>Have an account? <Text style={styles.infoButton} onPress={() => this.props.navigation.navigate('SignIn')}>Sing In</Text></Text>
          </View>
        </ScrollView>

      
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedText: {
    fontSize: 18,
    marginTop: 10,
    color: '#000',
    lineHeight: 35,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  inputs: {
    marginLeft: 40,
    marginRight: 30,
    marginTop: 20,
  },
  buttonStyle: {
    color: '#fff',
    paddingLeft: 40,
    alignItems: 'center',
    paddingRight: 40,
    paddingTop: 12,
    fontSize: 16,
    paddingBottom: 10,
    alignSelf:'center',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  buttonContainer: {
    width: 250,
    height: 45,
    borderRadius: 5,
    marginTop: 50,
    alignSelf:'center',
    backgroundColor: "#2358FB",
    alignItems: 'center',
  },
  signInContentContainer: {
    paddingTop: 90,
  }, 
  info: {
    alignSelf:'center',
    alignItems: 'center',
    marginTop: 20,
  },
  infoButton: {
    color: '#2358FB'
  },
});
