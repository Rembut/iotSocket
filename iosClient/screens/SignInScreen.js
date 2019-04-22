import SignInContainer from './../containers/SignInContainer'
import React from 'react';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: "Sign in",
  };
  render() {
    return (
      <SignInContainer navigation={this.props.navigation}/>
    )
  }
}