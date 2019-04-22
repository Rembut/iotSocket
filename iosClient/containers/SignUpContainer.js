import SignUp from './../components/SignUp'
import React from 'react';

import { saveToken, getToken, dropToken, API_URL } from './../utils'

import {
  AlertIOS,
  AsyncStorage
} from 'react-native';

export default class SignUpContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    this.changeUsername = this.changeUsername.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this)
    this.signUp = this.signUp.bind(this)
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
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  changeUsername(value) {
    this.setState({
        username: value.username
    })
  }

  changeEmail(value) {
    this.setState({
        email: value.email
    })
  }

  changePassword(value) {
    this.setState({
        password: value.password
    })
  }

  changeConfirmPassword(value) {
    this.setState({
        confirmPassword: value.confirmPassword
    })
  }

  signUp() {
    if ( this.state.username != '' && this.state.password != '' && this.state.email != '' & this.state.confirmPassword != ''){
      fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
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
      <SignUp navigation={this.props.navigation} data={this.state} 
      onChangeUsername={this.changeUsername} onChangePassword={this.changePassword} 
      onChangeEmail={this.changeEmail} onChangeConfirmPassword={this.changeConfirmPassword}
      signUp={this.signUp}/>
    )
  }
}