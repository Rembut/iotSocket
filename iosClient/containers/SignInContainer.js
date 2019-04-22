import SignIn from './../components/SignIn'
import React from 'react';
import { API_URL } from './../utils'

import { saveToken, getToken, dropToken } from './../utils'

import {
  AlertIOS,
  AsyncStorage
} from 'react-native';

export default class SignInContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  componentDidMount() {
   getToken().then(token => {
      if (token !== null) {
        this.props.navigation.navigate('Home')
      }
    })
  }

  dropState() {
     this.setState({
      username: '',
      password: ''
    })
  }

  changeUsername(value) {
    this.setState({
        username: value.username
    })
  }

  changePassword(value) {
    this.setState({
        password: value.password
    })
  }

  signIn() {
    if ( this.state.username != '' && this.state.password != ''){
      fetch(`${API_URL}/api/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.dropState()
        saveToken(responseJson.token)
        this.props.navigation.navigate('Home')
      })
      .catch((error) =>{
        console.error(error)
      })
    }
  }

  render() {
    return (
      <SignIn navigation={this.props.navigation} data={this.state} 
      onChangeUsername={this.changeUsername} onChangePassword={this.changePassword} signIn={this.signIn}/>
    )
  }
}