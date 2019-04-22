import Home from './../components/Home'
import React from 'react';
import { API_URL } from './../utils'

import { saveToken, getToken, dropToken } from './../utils'

import {
  AlertIOS,
  AsyncStorage
} from 'react-native';

export default class HomeContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isAuth: false,
      intervalId: null,
      socket: {
        id: null,
        name: null,
        state: null,
        data: []
      }
    }

    this.logOut = this.logOut.bind(this)
    this.changeState = this.changeState.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  componentDidMount() {
   this.setState({
      isLoading: true
   })
   getToken().then(token => {
      if (token == null) {
        this.props.navigation.navigate('SignIn')
      } else {
        this.setState({
          isAuth: true
        })
        fetch(`${API_URL}/api/sockets`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson.powerSockets.length !== 0) {

            let powerSocket = responseJson.powerSockets[responseJson.powerSockets.length - 1]

            this.setState({
              socket: {
                id: powerSocket._id,
                name: powerSocket.name,
                state: powerSocket.state,
                data: powerSocket.data[powerSocket.data.length - 1]
              }
            })
          }
           this.setState({
              isLoading: false
           })
          console.log(this.state)
        })
        .catch((error) =>{
          console.error(error)
        })
      }
    })

   this.loadData()
  }

  logOut() {
    dropToken()
    this.setState({
      isAuth: false
    })
    this.props.navigation.navigate('SignIn')
  }

  changeState() {
   getToken().then(token => {
      if (token == null) {
        this.props.navigation.navigate('SignIn')
      } else {
        this.setState({
          isAuth: true
        })
        fetch(`${API_URL}/api/updateState/${this.state.socket.id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          
        })
        .catch((error) =>{
          console.error(error)
        })
      }
    }) 
  }

  loadData() {
    let id = setInterval(() => {
      getToken().then(token => {
      if (token == null) {
        this.props.navigation.navigate('SignIn')
      } else {
        this.setState({
          isAuth: true,
          intervalId: id
        })
        fetch(`${API_URL}/api/sockets`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson.powerSockets.length !== 0) {

            let powerSocket = responseJson.powerSockets[responseJson.powerSockets.length - 1]

            this.setState({
              socket: {
                id: powerSocket._id,
                name: powerSocket.name,
                state: powerSocket.state,
                data: powerSocket.data[powerSocket.data.length - 1]
              }
            })
          }
        })
        .catch((error) =>{
          console.error(error)
        })
      }
    })
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.props.intervalId)
  }

  render() {
    return (
      <Home navigation={this.props.navigation} data={this.state} logOut={this.logOut} changeState={this.changeState}/>
    )
  }
}