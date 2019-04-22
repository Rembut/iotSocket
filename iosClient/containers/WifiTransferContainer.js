import WifiTransfer from './../components/WifiTransfer'
import React from 'react';

import { saveToken, getToken, dropToken, API_URL } from './../utils'

import {
  AlertIOS,
  AsyncStorage
} from 'react-native';

// ПОДКЛЮЧИТЬСЯ К ВАЙФАЮ РОЗЕТКИ

// ЗАПРОС К РОЗЕТКЕ http://192.168.4.1/setting?ssid=SkyNet_6F6B60&pass=jk11173211732

// ЗАПРОС К РОЗЕТКЕ http://192.168.4.1 В ОТВЕТ {"IP":"192.168.250.106"} И ID РОЗЕТКИ

// ПРИ ПОДКЛЮЧЕНИИ К ДОМАШНЕЙ ВАЙФАЙ СЕТИ ЗАПРОC НА ДОБАВЛЕНИЕ РОЗЕТКИ C ЕЕ ID

// РЕДИРЕКТ НА HOME

// сброс http://192.168.250.106/cleareeprom

export default class WifiTransferContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      isLoading: false,
      powerSocketId: '',
      goConnect: false
    }
    this.changeName = this.changeName.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.wifiAuth = this.wifiAuth.bind(this)
    this.dropState = this.dropState.bind(this)
    this.addSocket = this.addSocket.bind(this)
  }

componentDidMount() {
   getToken().then(token => {
      if (token == null) {
        this.props.navigation.navigate('Home')
      }
    })
  }

  dropState() {
     this.setState({
      name: '',
      password: ''
    })
  }

  changeName(value) {
    this.setState({
        name: value.name
    })
  }

  changePassword(value) {
    this.setState({
        password: value.password
    })
  }

  addSocket() {
      this.setState({
        isLoading: true
      })
      getToken().then(token => {
        if (token == null) {
          this.props.navigation.navigate('SignIn')
        } else {
          fetch(`${API_URL}/api/addPowerSocket`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
            },
            body: JSON.stringify({
              powerSocketId: this.state.powerSocketId
            }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
              this.dropState()
              this.setState({
                isLoading: false
              })
              this.props.navigation.navigate('Home')

          })
          .catch((error) =>{
            console.log(error)
          })
        }
      })
  }

  wifiAuth() {
    if ( this.state.name != '' && this.state.password != ''){
      this.setState({
        isLoading: true
      })
      fetch(`http://192.168.4.1/setting?ssid=${this.state.name}&pass=${this.state.password}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
            powerSocketId: responseJson.id
        })

        setTimeout(() => {
          this.setState({
            isLoading: false
          })
          this.setState({
            goConnect: true
          })
        }, 100000)

      })
      .catch((error) =>{
        console.error(error)
      })
    }
  }

  render() {
    return (
      <WifiTransfer navigation={this.props.navigation} wifiAuth={this.wifiAuth} 
      data={this.state} onChangeName={this.changeName} onChangePassword={this.changePassword} addSocket={this.addSocket}/>
    )
  }
}