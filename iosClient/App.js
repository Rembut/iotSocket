import React from 'react';

import { createStackNavigator } from 'react-navigation'; 

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

import ChartView from 'react-native-highcharts';

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

import SignInScreen from './screens/SignInScreen'
import HomeScreen from './screens/HomeScreen'
import SignUpScreen from './screens/SignUpScreen'
import WifiTransferScreen from './screens/WifiTransferScreen'

const RootStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    wifiTransfer: WifiTransferScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'SignIn',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}