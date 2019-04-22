import React from 'react';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Sae } from 'react-native-textinput-effects';

import { createStackNavigator } from 'react-navigation'; 

import Spinner from 'react-native-loading-spinner-overlay';

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
  TouchableHighlight,
  Item
} from 'react-native';

import ChartView from 'react-native-highcharts';

// ПОДКЛЮЧИТЬСЯ К ВАЙФАЮ РОЗЕТКИ

// ЗАПРОС К РОЗЕТКЕ http://192.168.4.1/setting?ssid=SkyNet_6F6B60&pass=jk11173211732

// ЗАПРОС К РОЗЕТКЕ http://192.168.4.1 В ОТВЕТ {"IP":"192.168.250.106"} И ID РОЗЕТКИ

// ПРИ ПОДКЛЮЧЕНИИ К ДОМАШНЕЙ ВАЙФАЙ СЕТИ ЗАПРОC НА ДОБАВЛЕНИЕ РОЗЕТКИ C ЕЕ ID

// РЕДИРЕКТ НА HOME

// сброс http://192.168.250.106/cleareeprom

export default class WifiTransfer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Spinner visible={this.props.data.isLoading} color={'#fff'} animation={"fade"} normal/>

        <Text style={styles.getStartedText}>Enter the name and{"\n"}password of your WI-FI{"\n"}network to configure {"\n"}the device</Text>
         <View style={styles.inputs}>
           <Sae
            label={'Name'}
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

            onChangeText={(value) => this.props.onChangeName({name: value})}

            value={this.props.data.name}

          />

          <Sae
            label={'Password'}
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

            onChangeText={(value) => this.props.onChangePassword({password: value})}

            value={this.props.data.password}

          />

        </View>

        {this.props.data.goConnect 
          ? <TouchableHighlight style={styles.buttonContainerConnect} onPress={() => this.props.addSocket()}>
            <Text style={styles.buttonStyle}>Connect</Text>
          </TouchableHighlight>

          : <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.wifiAuth()}>
            <Text style={styles.buttonStyle}>Configure</Text>
          </TouchableHighlight>

        }
          


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
  homeInfoText: {
    fontSize: 18,
    marginTop: 40,
    color: '#000',
    lineHeight: 35,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  logOutButton: {
    fontSize: 18,
    color: '#000',
    letterSpacing: 1.5,
    marginLeft: 15,
    marginTop: 5,
    lineHeight: 20,
    fontWeight: '600',
  },
  buttonContainerConnect: {
    width: 250,
    height: 45,
    borderRadius: 5,
    marginTop: 50,
    alignSelf:'center',
    backgroundColor: '#4ed164',
    alignItems: 'center',
  },
});
